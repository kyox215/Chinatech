import fs from 'fs';
import path from 'path';
import { EU_MODELS_2024_2026, type EuModelRef } from '../data/eu-models-2024-2026';

type DbModel = {
  brand: string;
  model: string;
  model_code?: string;
  category?: string;
  rows: number;
  missingModelCodeRows: number;
};

function keyOf(brand: string, model: string) {
  return `${(brand || '').trim().toUpperCase()}|${(model || '').trim()}`;
}

function parseCodes(value?: string) {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function mdEscape(value: string) {
  return value.replaceAll('|', '\\|');
}

function groupByBrand<T extends { brand: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const b = (it.brand || '').trim().toUpperCase();
    const prev = map.get(b);
    if (prev) prev.push(it);
    else map.set(b, [it]);
  }
  return map;
}

function buildReport(params: {
  expected: EuModelRef[];
  missingInDb: EuModelRef[];
  missingModelCode: DbModel[];
  codeMismatch: Array<{ expected: EuModelRef; db: DbModel; expectedCodes: string[]; dbCodes: string[] }>;
  dbExtraCountByBrand: Array<{ brand: string; count: number }>;
}) {
  const { expected, missingInDb, missingModelCode, codeMismatch, dbExtraCountByBrand } = params;

  const expectedByBrand = Array.from(groupByBrand(expected).entries())
    .map(([brand, items]) => ({ brand, count: items.length }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));

  const missingByBrand = Array.from(groupByBrand(missingInDb).entries())
    .map(([brand, items]) => ({ brand, count: items.length }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));

  const lines: string[] = [];
  lines.push(`# 2024–2026 型号覆盖差异报告`);
  lines.push(`生成时间: ${new Date().toISOString()}`);
  lines.push('');
  lines.push(`## 概览`);
  lines.push(`- 参考清单（2024–2026）型号数: ${expected.length}`);
  lines.push(`- 数据库缺失型号数: ${missingInDb.length}`);
  lines.push(`- 数据库缺代号型号数（在 DB 中存在但 model_code 为空）: ${missingModelCode.length}`);
  lines.push(`- 代号不匹配/不完整型号数（参考清单有 codes，DB codes 未覆盖）: ${codeMismatch.length}`);
  lines.push('');

  lines.push(`## 参考清单按品牌数量`);
  for (const b of expectedByBrand) {
    lines.push(`- ${b.brand}: ${b.count}`);
  }
  lines.push('');

  lines.push(`## 缺失型号（DB 不存在）按品牌数量`);
  if (missingByBrand.length === 0) {
    lines.push(`- 无`);
  } else {
    for (const b of missingByBrand) {
      lines.push(`- ${b.brand}: ${b.count}`);
    }
  }
  lines.push('');

  lines.push(`## 缺失型号明细（DB 不存在）`);
  if (missingInDb.length === 0) {
    lines.push(`- 无`);
  } else {
    lines.push(`| 品牌 | 型号 | 年份 | 参考代号 | 系列 |`);
    lines.push(`|---|---|---:|---|---|`);
    for (const m of missingInDb.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model))) {
      lines.push(
        `| ${mdEscape(m.brand)} | ${mdEscape(m.model)} | ${m.year} | ${mdEscape(m.codes.join(', '))} | ${mdEscape(m.series || '')} |`
      );
    }
  }
  lines.push('');

  lines.push(`## 缺代号型号（DB 存在但 model_code 为空）`);
  if (missingModelCode.length === 0) {
    lines.push(`- 无`);
  } else {
    lines.push(`| 品牌 | 型号 | DB行数 | |`);
    lines.push(`|---|---|---:|---|`);
    for (const m of missingModelCode.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model))) {
      lines.push(`| ${mdEscape(m.brand)} | ${mdEscape(m.model)} | ${m.rows} | |`);
    }
  }
  lines.push('');

  lines.push(`## 代号不匹配/不完整（参考有 codes，但 DB codes 未覆盖）`);
  if (codeMismatch.length === 0) {
    lines.push(`- 无`);
  } else {
    lines.push(`| 品牌 | 型号 | 参考代号 | DB代号 |`);
    lines.push(`|---|---|---|---|`);
    for (const r of codeMismatch.sort((a, b) => a.expected.brand.localeCompare(b.expected.brand) || a.expected.model.localeCompare(b.expected.model))) {
      lines.push(
        `| ${mdEscape(r.expected.brand)} | ${mdEscape(r.expected.model)} | ${mdEscape(r.expectedCodes.join(', '))} | ${mdEscape(r.dbCodes.join(', '))} |`
      );
    }
  }
  lines.push('');

  lines.push(`## DB 额外型号（不在 2024–2026 参考清单）按品牌数量`);
  if (dbExtraCountByBrand.length === 0) {
    lines.push(`- 无`);
  } else {
    for (const b of dbExtraCountByBrand) {
      lines.push(`- ${b.brand}: ${b.count}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const reportsDir = path.join(process.cwd(), 'reports');
  const dbModelsPath = path.join(reportsDir, 'db-models.json');
  if (!fs.existsSync(dbModelsPath)) {
    throw new Error(`Missing ${dbModelsPath}. Run scripts/audit/db-models.ts first.`);
  }

  const dbModelsJson = JSON.parse(fs.readFileSync(dbModelsPath, 'utf-8')) as { models: DbModel[] };
  const dbModels = dbModelsJson.models || [];

  const expected = EU_MODELS_2024_2026.filter((m) => m.year >= 2024 && m.year <= 2026).map((m) => ({
    ...m,
    brand: (m.brand || '').trim().toUpperCase(),
    model: (m.model || '').trim(),
    codes: uniq(m.codes.map((c) => c.trim()).filter(Boolean)),
  }));

  const dbByKey = new Map<string, DbModel>();
  for (const m of dbModels) {
    dbByKey.set(keyOf(m.brand, m.model), { ...m, brand: (m.brand || '').trim().toUpperCase(), model: (m.model || '').trim() });
  }

  const expectedKeys = new Set(expected.map((m) => keyOf(m.brand, m.model)));
  const missingInDb: EuModelRef[] = [];
  const codeMismatch: Array<{ expected: EuModelRef; db: DbModel; expectedCodes: string[]; dbCodes: string[] }> = [];
  const missingModelCode: DbModel[] = [];

  for (const exp of expected) {
    const k = keyOf(exp.brand, exp.model);
    const db = dbByKey.get(k);
    if (!db) {
      missingInDb.push(exp);
      continue;
    }

    const dbCodes = uniq(parseCodes(db.model_code));
    const expectedCodes = uniq(exp.codes);
    if (!dbCodes.length) missingModelCode.push(db);

    if (expectedCodes.length > 0) {
      const missing = expectedCodes.filter((c) => !dbCodes.includes(c));
      if (missing.length === expectedCodes.length) {
        codeMismatch.push({ expected: exp, db, expectedCodes, dbCodes });
      } else if (missing.length > 0) {
        codeMismatch.push({ expected: exp, db, expectedCodes, dbCodes });
      }
    }
  }

  const dbExtraCountByBrand = Array.from(groupByBrand(dbModels.filter((m) => !expectedKeys.has(keyOf(m.brand, m.model)))).entries())
    .map(([brand, items]) => ({ brand, count: items.length }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));

  fs.mkdirSync(reportsDir, { recursive: true });
  const report = buildReport({ expected, missingInDb, missingModelCode, codeMismatch, dbExtraCountByBrand });
  const outPath = path.join(reportsDir, 'model-gap-2024-2026.md');
  fs.writeFileSync(outPath, report);
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

