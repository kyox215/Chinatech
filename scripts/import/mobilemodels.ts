import fs from 'fs';
import path from 'path';
import https from 'https';

type BrandKey = 'honor' | 'realme' | 'vivo';

type ModelRow = {
  brand: string;
  model: string;
  codes: string[];
  series?: string;
};

const SOURCES: Record<BrandKey, { brand: string; url: string }> = {
  honor: {
    brand: 'HONOR',
    url: 'https://raw.githubusercontent.com/luckyzyx/MobileModels_Fork/master/brands/honor_global_en.md',
  },
  realme: {
    brand: 'REALME',
    url: 'https://raw.githubusercontent.com/luckyzyx/MobileModels_Fork/master/brands/realme_global_en.md',
  },
  vivo: {
    brand: 'VIVO',
    url: 'https://raw.githubusercontent.com/luckyzyx/MobileModels_Fork/master/brands/vivo_global_en.md',
  },
};

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (d) => chunks.push(Buffer.isBuffer(d) ? d : Buffer.from(d)));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      })
      .on('error', reject);
  });
}

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function sanitizeLine(value: string) {
  return normalizeSpaces(
    (value || '')
      .trim()
      .replace(/^[-*]\s+/g, '')
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
  );
}

function stripTrailingParentheses(value: string) {
  return value.replace(/\s*\([^)]*\)\s*$/g, '').trim();
}

function normalizeModelName(brand: string, rawName: string) {
  let name = normalizeSpaces(rawName);
  name = stripTrailingParentheses(name);
  name = name.replace(/\s*\/\s*/g, ' / ');

  if (brand === 'HONOR') {
    if (name.startsWith('HONOR ')) name = `Honor ${name.slice('HONOR '.length)}`;
    if (name.startsWith('Honor Magic') && /Magic\d/.test(name)) name = name.replace(/Magic(\d)/g, 'Magic $1');
    return normalizeSpaces(name);
  }

  if (brand === 'VIVO') {
    if (name.toLowerCase().startsWith('vivo ')) name = name.slice(5);
    return normalizeSpaces(name);
  }

  return normalizeSpaces(name);
}

function splitCodes(raw: string) {
  const cleanToken = (token: string) => token.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
  const isAllowedToken = (token: string) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(token);
  const hasDigit = (token: string) => /\d/.test(token);

  const rawTokens = sanitizeLine(raw)
    .split(' ')
    .map((s) => cleanToken(s.trim()))
    .filter((s) => s.length > 0);

  const tokens = rawTokens.filter((t) => t.length >= 4 && isAllowedToken(t) && hasDigit(t));
  return Array.from(new Set(tokens)).sort((a, b) => a.localeCompare(b));
}

function inferSeriesFromHeading(brand: string, heading: string): string | undefined {
  const h = heading.trim();

  if (brand === 'REALME') {
    if (/^Number series/i.test(h)) return 'Number 系列';
    if (/^GT series/i.test(h)) return 'GT 系列';
    if (/^C series/i.test(h)) return 'C 系列';
    if (/^NARZO/i.test(h)) return 'NARZO 系列';
    if (/^X series/i.test(h)) return 'X 系列';
    if (/^P series/i.test(h)) return 'P 系列';
    return undefined;
  }

  if (brand === 'VIVO') {
    if (/^vivo X series/i.test(h)) return 'X 系列';
    if (/^vivo V series/i.test(h)) return 'V 系列';
    if (/^vivo Y series/i.test(h)) return 'Y 系列';
    if (/^vivo T series/i.test(h)) return 'T 系列';
    if (/^vivo S series/i.test(h)) return 'S 系列';
    return undefined;
  }

  return undefined;
}

function inferSeriesFromModel(brand: string, model: string): string | undefined {
  if (brand === 'HONOR') {
    if (/Honor\s+Magic/i.test(model)) return 'Magic 系列';
    if (/Honor\s+X/i.test(model)) return 'X 系列';
    return '数字系列';
  }
  return undefined;
}

function parseMarkdown(brand: string, content: string): ModelRow[] {
  const lines = content.split(/\r?\n/);
  const rows: ModelRow[] = [];
  let currentSeries: string | undefined;

  for (const line of lines) {
    const trimmed = sanitizeLine(line);
    if (!trimmed) continue;

    const headingSeries = inferSeriesFromHeading(brand, trimmed);
    if (headingSeries) {
      currentSeries = headingSeries;
      continue;
    }

    const match = trimmed.match(/^(.+?):\s*(.+)$/);
    if (!match) continue;

    const left = match[1];
    const right = match[2];

    const leftCodes = splitCodes(left);
    const rightCodes = splitCodes(right);

    let codes: string[] = [];
    let modelRaw = '';

    if (leftCodes.length > 0 && rightCodes.length === 0) {
      codes = leftCodes;
      modelRaw = right;
    } else if (rightCodes.length > 0 && leftCodes.length === 0) {
      codes = rightCodes;
      modelRaw = left;
    } else if (leftCodes.length > 0 && rightCodes.length > 0) {
      if (leftCodes.length >= rightCodes.length) {
        codes = leftCodes;
        modelRaw = right;
      } else {
        codes = rightCodes;
        modelRaw = left;
      }
    } else {
      continue;
    }

    const model = normalizeModelName(brand, modelRaw);
    if (!model || codes.length === 0) continue;

    const series = currentSeries || inferSeriesFromModel(brand, model);
    rows.push({ brand, model, codes, series });
  }

  return rows;
}

function toTsFile(exportName: string, rows: ModelRow[]) {
  const normalized = rows
    .map((r) => ({
      brand: r.brand,
      model: r.model,
      codes: r.codes,
      series: r.series,
    }))
    .sort((a, b) => a.brand.localeCompare(b.brand) || (a.series || '').localeCompare(b.series || '') || a.model.localeCompare(b.model));

  const lines: string[] = [];
  lines.push(`export const ${exportName} = ${JSON.stringify(normalized, null, 2)} as const;`);
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const brandArg = args.find((a) => a.startsWith('--brand='));
  const brands: BrandKey[] = brandArg
    ? (brandArg
        .slice('--brand='.length)
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean) as BrandKey[])
    : (['honor', 'realme', 'vivo'] as BrandKey[]);

  const outDir = path.join(process.cwd(), 'scripts/data/brands');
  fs.mkdirSync(outDir, { recursive: true });

  for (const b of brands) {
    const source = SOURCES[b];
    if (!source) throw new Error(`Unknown brand key: ${b}`);
    const md = await fetchText(source.url);
    const rows = parseMarkdown(source.brand, md);
    const exportName = `${source.brand}_${b.toUpperCase()}_GENERATED_MODELS`.replace(/[^A-Z0-9_]/g, '_');
    const outPath = path.join(outDir, `${b}.generated.ts`);
    fs.writeFileSync(outPath, toTsFile(exportName, rows));
    console.log(`Wrote ${outPath} (${rows.length} models)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
