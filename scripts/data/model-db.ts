
import { HONOR_HONOR_GENERATED_MODELS } from './brands/honor.generated';
import { MOTOROLA_MODELS } from './brands/motorola';
import { REALME_REALME_GENERATED_MODELS } from './brands/realme.generated';
import { VIVO_VIVO_GENERATED_MODELS } from './brands/vivo.generated';

export interface ModelInfo {
  brand: string;
  model: string;
  codes: string[]; // e.g. ["SM-A135F", "SM-A135M"]
  series?: string;
}

function normalizeText(value: string) {
  return (value || '').trim();
}

function normalizeBrand(value: string) {
  return normalizeText(value).toUpperCase();
}

function normalizeCodes(codes: string[]) {
  return Array.from(
    new Set(
      (codes || [])
        .map((c) => normalizeText(c))
        .filter((c) => c.length > 0)
    )
  ).sort((a, b) => a.localeCompare(b));
}

function makeModelKey(brand: string, model: string) {
  return `${normalizeBrand(brand)}|${normalizeText(model)}`;
}

function canonicalizeModels(items: ModelInfo[]): ModelInfo[] {
  const merged = new Map<string, ModelInfo>();

  for (const item of items) {
    const brand = normalizeBrand(item.brand);
    const model = normalizeText(item.model);
    const key = makeModelKey(brand, model);
    const codes = normalizeCodes(item.codes);
    const series = item.series ? normalizeText(item.series) : undefined;

    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { brand, model, codes, series });
      continue;
    }

    const mergedCodes = normalizeCodes([...(existing.codes || []), ...codes]);
    merged.set(key, {
      brand,
      model,
      codes: mergedCodes,
      series: existing.series || series,
    });
  }

  return Array.from(merged.values()).sort((a, b) => {
    const bc = a.brand.localeCompare(b.brand);
    if (bc !== 0) return bc;
    const sc = (a.series || '').localeCompare(b.series || '');
    if (sc !== 0) return sc;
    return a.model.localeCompare(b.model);
  });
}

function asModelInfoArray(
  items: ReadonlyArray<{
    brand: string;
    model: string;
    codes: ReadonlyArray<string>;
    series?: string;
  }>
): ModelInfo[] {
  return items.map((i) => ({
    brand: i.brand,
    model: i.model,
    codes: Array.from(i.codes || []),
    series: i.series,
  }));
}

const RAW_SMARTPHONE_DB: ModelInfo[] = [
  // --- APPLE ---
  // iPhone 17 (2025/2026 Prediction)
  { brand: 'APPLE', model: 'iPhone 17 Pro Max', codes: ['A3496', 'A3497'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 17 Pro', codes: ['A3493', 'A3494'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 17 Plus', codes: ['A3490', 'A3491'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 17', codes: ['A3487', 'A3488'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone SE (4th Gen)', codes: ['A3500', 'A3501'], series: 'iPhone 系列' },

  // iPhone 16 (2024)
  { brand: 'APPLE', model: 'iPhone 16 Pro Max', codes: ['A3296', 'A3297', 'A3298'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 16 Pro', codes: ['A3293', 'A3294', 'A3295'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 16 Plus', codes: ['A3290', 'A3291', 'A3292'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 16', codes: ['A3287', 'A3288', 'A3289'], series: 'iPhone 系列' },

  // iPhone 15 (2023)
  { brand: 'APPLE', model: 'iPhone 15 Pro Max', codes: ['A3106', 'A3105', 'A3108', 'A2849'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 15 Pro', codes: ['A3102', 'A3101', 'A3104', 'A2848'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 15 Plus', codes: ['A3094', 'A3093', 'A3096', 'A2847'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 15', codes: ['A3090', 'A3089', 'A3092', 'A2846'], series: 'iPhone 系列' },

  // iPhone 14 (2022)
  { brand: 'APPLE', model: 'iPhone 14 Pro Max', codes: ['A2894', 'A2893', 'A2895', 'A2651'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 14 Pro', codes: ['A2890', 'A2889', 'A2891', 'A2650'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 14 Plus', codes: ['A2886', 'A2885', 'A2887', 'A2632'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 14', codes: ['A2882', 'A2881', 'A2883', 'A2649'], series: 'iPhone 系列' },

  // iPhone 13 (2021)
  { brand: 'APPLE', model: 'iPhone 13 Pro Max', codes: ['A2643', 'A2484', 'A2641', 'A2644', 'A2645'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 13 Pro', codes: ['A2638', 'A2483', 'A2636', 'A2639', 'A2640'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 13', codes: ['A2633', 'A2482', 'A2631', 'A2634', 'A2635'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 13 mini', codes: ['A2628', 'A2481', 'A2626', 'A2629', 'A2630'], series: 'iPhone 系列' },

  // iPhone 12 (2020)
  { brand: 'APPLE', model: 'iPhone 12 Pro Max', codes: ['A2411', 'A2342', 'A2410', 'A2412'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 12 Pro', codes: ['A2407', 'A2341', 'A2406', 'A2408'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 12', codes: ['A2403', 'A2172', 'A2402', 'A2404'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 12 mini', codes: ['A2399', 'A2176', 'A2398', 'A2400', 'A2401'], series: 'iPhone 系列' },

  // iPhone SE
  { brand: 'APPLE', model: 'iPhone SE (2022)', codes: ['A2783', 'A2595', 'A2782', 'A2784', 'A2785'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone SE (2020)', codes: ['A2296', 'A2275', 'A2298'], series: 'iPhone 系列' },

  // iPhone 11 (2019)
  { brand: 'APPLE', model: 'iPhone 11 Pro Max', codes: ['A2218', 'A2161', 'A2220'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 11 Pro', codes: ['A2215', 'A2160', 'A2217'], series: 'iPhone 系列' },
  { brand: 'APPLE', model: 'iPhone 11', codes: ['A2221', 'A2111', 'A2223'], series: 'iPhone 系列' },

  // --- IPAD (Consolidated Series) ---
  { brand: 'APPLE', model: 'iPad Pro 13 (M4)', codes: ['A2925', 'A2926', 'A3007'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Pro 11 (M4)', codes: ['A2836', 'A2837', 'A3006'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Pro 12.9 (6th Gen)', codes: ['A2436', 'A2764', 'A2437'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Pro 11 (4th Gen)', codes: ['A2759', 'A2435', 'A2761'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Pro 12.9 (5th Gen)', codes: ['A2378', 'A2461', 'A2379'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Pro 11 (3rd Gen)', codes: ['A2377', 'A2459', 'A2301'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Air 13 (M2)', codes: ['A2898', 'A2899', 'A2900'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Air 11 (M2)', codes: ['A2902', 'A2903', 'A2904'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad Air (5th Gen)', codes: ['A2588', 'A2589', 'A2591'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad mini (A17 Pro)', codes: ['A2993', 'A2995', 'A2996'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad mini (6th Gen)', codes: ['A2567', 'A2568', 'A2569'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad (10th Gen)', codes: ['A2696', 'A2757', 'A2777'], series: 'iPad 系列' },
  { brand: 'APPLE', model: 'iPad (9th Gen)', codes: ['A2602', 'A2604', 'A2603'], series: 'iPad 系列' },

  // --- APPLE WATCH (Consolidated Series) ---
  { brand: 'APPLE', model: 'Apple Watch Ultra 2', codes: ['A2986', 'A2987'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Ultra', codes: ['A2622', 'A2684', 'A2859'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 10 (46mm)', codes: ['A3333', 'A3451'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 10 (42mm)', codes: ['A3331', 'A3450'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 9 (45mm)', codes: ['A2984', 'A2985'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 9 (41mm)', codes: ['A2982', 'A2983'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 8 (45mm)', codes: ['A2771', 'A2774', 'A2775'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 8 (41mm)', codes: ['A2770', 'A2772', 'A2773'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 7 (45mm)', codes: ['A2474', 'A2477', 'A2478'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch Series 7 (41mm)', codes: ['A2473', 'A2475', 'A2476'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch SE 2 (44mm)', codes: ['A2723', 'A2724', 'A2856'], series: 'Apple Watch 系列' },
  { brand: 'APPLE', model: 'Apple Watch SE 2 (40mm)', codes: ['A2722', 'A2725', 'A2855'], series: 'Apple Watch 系列' },

  // --- SAMSUNG ---
  // S Series
  { brand: 'SAMSUNG', model: 'Galaxy S26 Ultra', codes: ['SM-S948B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S26+', codes: ['SM-S946B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S26', codes: ['SM-S941B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S25 Ultra', codes: ['SM-S938B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S25+', codes: ['SM-S936B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S25', codes: ['SM-S931B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S24 Ultra', codes: ['SM-S928B', 'SM-S928U'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S24+', codes: ['SM-S926B', 'SM-S926U'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S24', codes: ['SM-S921B', 'SM-S921U'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S24 FE', codes: ['SM-S721B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S23 Ultra', codes: ['SM-S918B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S23+', codes: ['SM-S916B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S23', codes: ['SM-S911B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S22 Ultra', codes: ['SM-S908B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S22+', codes: ['SM-S906B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S22', codes: ['SM-S901B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S21 Ultra', codes: ['SM-G998B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S21+', codes: ['SM-G996B'], series: 'Galaxy S 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy S21', codes: ['SM-G991B'], series: 'Galaxy S 系列' },

  // Z Series (Fold/Flip)
  { brand: 'SAMSUNG', model: 'Galaxy Z Fold 6', codes: ['SM-F956B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Flip 6', codes: ['SM-F741B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Fold 5', codes: ['SM-F946B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Flip 5', codes: ['SM-F731B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Fold 4', codes: ['SM-F936B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Flip 4', codes: ['SM-F721B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Fold 3', codes: ['SM-F926B'], series: 'Galaxy Z 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Z Flip 3', codes: ['SM-F711B'], series: 'Galaxy Z 系列' },

  // Note Series
  { brand: 'SAMSUNG', model: 'Galaxy Note 20 Ultra 5G', codes: ['SM-N986B'], series: 'Galaxy Note 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Note 20 5G', codes: ['SM-N981B'], series: 'Galaxy Note 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Note 10+', codes: ['SM-N975F'], series: 'Galaxy Note 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy Note 10', codes: ['SM-N970F'], series: 'Galaxy Note 系列' },

  // A Series
  { brand: 'SAMSUNG', model: 'Galaxy A56 5G', codes: ['SM-A566B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A36 5G', codes: ['SM-A366B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A55', codes: ['SM-A556B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A35', codes: ['SM-A356B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A25', codes: ['SM-A256B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A16 5G', codes: ['SM-A166B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A16 4G', codes: ['SM-A165F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A15 5G', codes: ['SM-A156B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A15 4G', codes: ['SM-A155F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A05s', codes: ['SM-A057F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A05', codes: ['SM-A055F'], series: 'Galaxy A 系列' },

  { brand: 'SAMSUNG', model: 'Galaxy A54 5G', codes: ['SM-A546B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A34 5G', codes: ['SM-A346B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A24 4G', codes: ['SM-A245F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A14 5G', codes: ['SM-A146B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A14 4G', codes: ['SM-A145F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A04s', codes: ['SM-A047F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A04', codes: ['SM-A045F'], series: 'Galaxy A 系列' },

  { brand: 'SAMSUNG', model: 'Galaxy A73 5G', codes: ['SM-A736B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A53 5G', codes: ['SM-A536B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A33 5G', codes: ['SM-A336B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A23 5G', codes: ['SM-A236B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A23 4G', codes: ['SM-A235F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A13 5G', codes: ['SM-A136B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A13 4G', codes: ['SM-A135F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A03s', codes: ['SM-A037F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A03', codes: ['SM-A035F'], series: 'Galaxy A 系列' },

  { brand: 'SAMSUNG', model: 'Galaxy A72', codes: ['SM-A725F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A52s 5G', codes: ['SM-A528B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A52 5G', codes: ['SM-A526B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A52 4G', codes: ['SM-A525F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A42 5G', codes: ['SM-A426B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A32 5G', codes: ['SM-A326B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A32 4G', codes: ['SM-A325F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A22 5G', codes: ['SM-A226B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A22 4G', codes: ['SM-A225F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A12', codes: ['SM-A125F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A02s', codes: ['SM-A025F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A02', codes: ['SM-A022F'], series: 'Galaxy A 系列' },

  { brand: 'SAMSUNG', model: 'Galaxy A71', codes: ['SM-A715F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A51 5G', codes: ['SM-A516B'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A51', codes: ['SM-A515F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A41', codes: ['SM-A415F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A31', codes: ['SM-A315F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A21s', codes: ['SM-A217F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A21', codes: ['SM-A215U'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A11', codes: ['SM-A115F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A01', codes: ['SM-A015F'], series: 'Galaxy A 系列' },

  { brand: 'SAMSUNG', model: 'Galaxy A70', codes: ['SM-A705F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A50', codes: ['SM-A505F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A40', codes: ['SM-A405F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A30s', codes: ['SM-A307F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A30', codes: ['SM-A305F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A20e', codes: ['SM-A202F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A20s', codes: ['SM-A207F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A20', codes: ['SM-A205F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A10s', codes: ['SM-A107F'], series: 'Galaxy A 系列' },
  { brand: 'SAMSUNG', model: 'Galaxy A10', codes: ['SM-A105F'], series: 'Galaxy A 系列' },

  // --- XIAOMI / REDMI ---
  // Xiaomi
  { brand: 'XIAOMI', model: 'Xiaomi 16 Ultra', codes: ['26030PN60G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 16 Pro', codes: ['26010PN60G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 16', codes: ['26010PN61G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 15 Ultra', codes: ['25030PN60G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 15 Pro', codes: ['2410DPN6CC'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 15', codes: ['24129PN74G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 14 Ultra', codes: ['24030PN60G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 14', codes: ['23127PN0CG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 14T Pro', codes: ['2407FPN8EG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 14T', codes: ['2406APNFAG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 13T Pro', codes: ['23078PND5G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 13T', codes: ['2306EP901G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 13 Pro', codes: ['2210132G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 13', codes: ['2211133G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 13 Lite', codes: ['2210129SG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12T Pro', codes: ['22081212UG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12T', codes: ['22071212AG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12 Pro', codes: ['2201122G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12', codes: ['2201123G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12 Lite', codes: ['2203129G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 12X', codes: ['2112123AG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 11T Pro', codes: ['2107113SG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 11T', codes: ['21081111RG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Xiaomi 11 Lite 5G NE', codes: ['2109119DG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 11 Lite 5G', codes: ['M2101K9G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 11', codes: ['M2011K2G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 11 Ultra', codes: ['M2102K1G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 11i', codes: ['M2012K11G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 11 Lite', codes: ['M2101K9AG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10T Pro', codes: ['M2007J3SG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10T', codes: ['M2007J3SY'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10T Lite', codes: ['M2007J17G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10 Lite 5G', codes: ['M2002J9G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10 Pro', codes: ['M2001J1G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 10', codes: ['M2001J2G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 9T Pro', codes: ['M1903F11G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 9T', codes: ['M1903F10G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 9 Lite', codes: ['M1904F3BG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 9 SE', codes: ['M1903F2G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 9', codes: ['M1902F1G'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 8 Lite', codes: ['M1808D2TG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 8', codes: ['M1803E1A'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi 8 Pro', codes: ['M1807E8A'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi A3', codes: ['M1906F9SH'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi A2', codes: ['M1804D2SG'], series: 'Xiaomi 系列' },
  { brand: 'XIAOMI', model: 'Mi A2 Lite', codes: ['M1805D1SG'], series: 'Xiaomi 系列' },

  // Redmi Note
  { brand: 'REDMI', model: 'Redmi Note 15 Pro+', codes: ['25090RA98G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 15 Pro', codes: ['2512DRA50G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 15 5G', codes: ['2512DRAABG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 14 Pro+', codes: ['24090RA29G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 14 Pro', codes: ['24094RAD4G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 14 5G', codes: ['24094RAD1G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 14 4G', codes: ['23129RAA4G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 13 Pro+', codes: ['23090RA98G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 13 Pro', codes: ['2312DRA50G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 13 5G', codes: ['2312DRAABG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 13 4G', codes: ['23129RAA4G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 12 Pro+ 5G', codes: ['22101316UG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 12 Pro 5G', codes: ['22101316G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 12 5G', codes: ['22111317G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 12 4G', codes: ['23021RAAEG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 12S', codes: ['23030RAC7G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 11 Pro 5G', codes: ['2201116SG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 11S', codes: ['2201117SG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 11', codes: ['2201117TG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 10 Pro', codes: ['M2101K6G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 10S', codes: ['M2101K7BNY'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 10 5G', codes: ['M2103K19G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 10', codes: ['M2101K7AG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 9T 5G', codes: ['M2007J22G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 9S', codes: ['M2003J6A1G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 9 Pro', codes: ['M2003J6B2G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 9', codes: ['M2003J15SG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 8 Pro', codes: ['M1906G7G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 8', codes: ['M1908C3JG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 8T', codes: ['M1908C3XG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 7', codes: ['M1901F7G'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 6 Pro', codes: ['M1806E7TG'], series: 'Redmi Note 系列' },
  { brand: 'REDMI', model: 'Redmi Note 5', codes: ['M1803E7SG'], series: 'Redmi Note 系列' },

  // Redmi A Series
  { brand: 'REDMI', model: 'Redmi A5', codes: ['25129RN51X'], series: 'Redmi A 系列' },
  { brand: 'REDMI', model: 'Redmi A3', codes: ['23129RN51X'], series: 'Redmi A 系列' },
  { brand: 'REDMI', model: 'Redmi A2', codes: ['23028RN4DG'], series: 'Redmi A 系列' },
  { brand: 'REDMI', model: 'Redmi A1', codes: ['220733SL'], series: 'Redmi A 系列' },

  // Redmi C Series (Number Series)
  { brand: 'REDMI', model: 'Redmi 15C', codes: ['25100RN82L'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 14C', codes: ['2409BRN2CA', '2409BRN2CG', '2409BRN2CY', '2409BRN2CL'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 13', codes: ['24049RN28L'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 13C', codes: ['23100RN82L'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 13C 5G', codes: ['23124RN87G'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 12 5G', codes: ['23076RN8DY'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 12C', codes: ['22120RN86G'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 10C', codes: ['220333QAG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 12', codes: ['23053RN02A'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 10 2022', codes: ['21121119SG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 10', codes: ['M2101K7DN'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 9', codes: ['M2004J19G'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 9A', codes: ['M2006C3LG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 9C', codes: ['M2006C3MG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 8', codes: ['M1908C3IG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 8A', codes: ['M1908C3KG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 7', codes: ['M1810F6LG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 7A', codes: ['M1903C3EG'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 6', codes: ['M1804C3DG', 'M1804C3DH', 'M1804C3DI'], series: 'Redmi 数字系列' },
  { brand: 'REDMI', model: 'Redmi 6A', codes: ['M1804C3CG', 'M1804C3CH', 'M1804C3CI'], series: 'Redmi 数字系列' },

  // --- HONOR ---
  { brand: 'HONOR', model: 'Honor Magic 8 Pro', codes: ['BVL-N59'], series: 'Magic 系列' },
  { brand: 'HONOR', model: 'Honor Magic 7 Pro', codes: ['PTP-AN10'], series: 'Magic 系列' },
  { brand: 'HONOR', model: 'Honor Magic 6 Pro', codes: ['BVL-N49'], series: 'Magic 系列' },
  { brand: 'HONOR', model: 'Honor 90', codes: ['REA-NX9'], series: '数字系列' },
  { brand: 'HONOR', model: 'Honor 70', codes: ['FNE-NX9'], series: '数字系列' },
  { brand: 'HONOR', model: 'Honor X8b', codes: ['LLY-LX1'], series: 'X 系列' },
  { brand: 'HONOR', model: 'Honor X7b', codes: ['CLK-LX1'], series: 'X 系列' },

  // --- OPPO ---
  { brand: 'OPPO', model: 'Reno 14 Pro', codes: ['CPH2729'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 13 Pro', codes: ['CPH2689'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 12 Pro', codes: ['CPH2629'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 12', codes: ['CPH2625'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 11 Pro', codes: ['CPH2599'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 11 F 5G', codes: ['CPH2603'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 10 Pro', codes: ['CPH2525'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 10 5G', codes: ['CPH2531'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 8 Pro', codes: ['CPH2357'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 8 5G', codes: ['CPH2359'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 7 Pro', codes: ['CPH2293'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno6 Pro 5G', codes: ['CPH2249'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno6 Pro 5G (Snapdragon)', codes: ['CPH2247'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno6 5G', codes: ['CPH2251'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno6 4G', codes: ['CPH2235'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 5 5G', codes: ['CPH2145'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Reno 5 4G', codes: ['CPH2159'], series: 'Reno 系列' },
  { brand: 'OPPO', model: 'Find X8 Pro', codes: ['CPH2651'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X7 Ultra', codes: ['PHY110'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X6 Pro', codes: ['PGEM10'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X5 Pro', codes: ['CPH2305'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X5', codes: ['CPH2307'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X3 Pro', codes: ['CPH2173'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X2 Pro', codes: ['CPH2025'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X2', codes: ['CPH2023'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X2 Neo', codes: ['CPH2009'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'Find X2 Lite', codes: ['CPH2005'], series: 'Find 系列' },
  { brand: 'OPPO', model: 'A80 5G', codes: ['CPH2639'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A79 5G', codes: ['CPH2557'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A98 5G', codes: ['CPH2529'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A78 5G', codes: ['CPH2483'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A58', codes: ['CPH2577'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A38', codes: ['CPH2579'], series: 'A 系列' },
  { brand: 'OPPO', model: 'A17', codes: ['CPH2477'], series: 'A 系列' },

  // --- VIVO ---
  { brand: 'VIVO', model: 'X200 Pro', codes: ['V2413'], series: 'X 系列' },
  { brand: 'VIVO', model: 'X100 Pro', codes: ['V2308'], series: 'X 系列' },
  { brand: 'VIVO', model: 'V40 5G', codes: ['V2348'], series: 'V 系列' },
  { brand: 'VIVO', model: 'Y76 5G', codes: ['V2124'], series: 'Y 系列' },

  // --- GOOGLE ---
  { brand: 'GOOGLE', model: 'Pixel 9 Pro', codes: ['G4YQ8'], series: 'Pixel 系列' },
  { brand: 'GOOGLE', model: 'Pixel 9', codes: ['G1B60'], series: 'Pixel 系列' },
  { brand: 'GOOGLE', model: 'Pixel 8 Pro', codes: ['GC3VE'], series: 'Pixel 系列' },
  { brand: 'GOOGLE', model: 'Pixel 8', codes: ['GKWS6'], series: 'Pixel 系列' },
  { brand: 'GOOGLE', model: 'Pixel 7a', codes: ['GHL1X'], series: 'Pixel 系列' },

  // --- ONEPLUS ---
  { brand: 'ONEPLUS', model: 'OnePlus 13', codes: ['CPH2681'], series: 'OnePlus 系列' },
  { brand: 'ONEPLUS', model: 'OnePlus 12', codes: ['CPH2581'], series: 'OnePlus 系列' },
  { brand: 'ONEPLUS', model: 'OnePlus 12R', codes: ['CPH2611'], series: 'OnePlus 系列' },
  { brand: 'ONEPLUS', model: 'OnePlus 11', codes: ['CPH2449'], series: 'OnePlus 系列' },
  { brand: 'ONEPLUS', model: 'OnePlus Nord 4', codes: ['CPH2693'], series: 'Nord 系列' },
  { brand: 'ONEPLUS', model: 'OnePlus Nord 3', codes: ['CPH2493'], series: 'Nord 系列' },

  // --- REALME ---
  { brand: 'REALME', model: 'Realme GT 6', codes: ['RMX3851'], series: 'GT 系列' },
  { brand: 'REALME', model: 'Realme 12 Pro+', codes: ['RMX3840'], series: '数字系列' },
  { brand: 'REALME', model: 'Realme 11 Pro+', codes: ['RMX3741'], series: '数字系列' },
  { brand: 'REALME', model: 'Realme C67', codes: ['RMX3890'], series: 'C 系列' },
  { brand: 'REALME', model: 'Realme C55', codes: ['RMX3710'], series: 'C 系列' },

  // --- MOTOROLA ---
  { brand: 'MOTOROLA', model: 'Edge 50 Pro', codes: ['XT2403'], series: 'Edge 系列' },
  { brand: 'MOTOROLA', model: 'Edge 40 Pro', codes: ['XT2301'], series: 'Edge 系列' },
  { brand: 'MOTOROLA', model: 'Moto G85', codes: ['XT2447'], series: 'Moto G 系列' },
  { brand: 'MOTOROLA', model: 'Moto G84', codes: ['XT2347'], series: 'Moto G 系列' },

  // --- SONY ---
  { brand: 'SONY', model: 'Xperia 1 VI', codes: ['XQ-EC54'], series: 'Xperia 1' },
  { brand: 'SONY', model: 'Xperia 1 V', codes: ['XQ-DQ54'], series: 'Xperia 1' },
  { brand: 'SONY', model: 'Xperia 10 VI', codes: ['XQ-ES54'], series: 'Xperia 10' }
];

RAW_SMARTPHONE_DB.push(
  ...asModelInfoArray(HONOR_HONOR_GENERATED_MODELS),
  ...asModelInfoArray(REALME_REALME_GENERATED_MODELS),
  ...asModelInfoArray(VIVO_VIVO_GENERATED_MODELS),
  ...asModelInfoArray(MOTOROLA_MODELS)
);

export const SMARTPHONE_DB: ModelInfo[] = canonicalizeModels(RAW_SMARTPHONE_DB);
