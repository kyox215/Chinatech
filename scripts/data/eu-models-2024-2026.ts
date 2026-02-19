export type EuModelRef = {
  brand: string;
  model: string;
  codes: string[];
  series?: string;
  year: 2024 | 2025 | 2026;
};

export const EU_MODELS_2024_2026: EuModelRef[] = [
  { brand: 'APPLE', model: 'iPhone 16 Pro Max', codes: ['A3296', 'A3297', 'A3298'], series: 'iPhone 系列', year: 2024 },
  { brand: 'APPLE', model: 'iPhone 16 Pro', codes: ['A3293', 'A3294', 'A3295'], series: 'iPhone 系列', year: 2024 },
  { brand: 'APPLE', model: 'iPhone 16 Plus', codes: ['A3290', 'A3291', 'A3292'], series: 'iPhone 系列', year: 2024 },
  { brand: 'APPLE', model: 'iPhone 16', codes: ['A3287', 'A3288', 'A3289'], series: 'iPhone 系列', year: 2024 },
  { brand: 'APPLE', model: 'iPhone 17 Pro Max', codes: ['A3496', 'A3497'], series: 'iPhone 系列', year: 2025 },
  { brand: 'APPLE', model: 'iPhone 17 Pro', codes: ['A3493', 'A3494'], series: 'iPhone 系列', year: 2025 },
  { brand: 'APPLE', model: 'iPhone 17 Plus', codes: ['A3490', 'A3491'], series: 'iPhone 系列', year: 2025 },
  { brand: 'APPLE', model: 'iPhone 17', codes: ['A3487', 'A3488'], series: 'iPhone 系列', year: 2025 },

  { brand: 'SAMSUNG', model: 'Galaxy S24 Ultra', codes: ['SM-S928B'], series: 'Galaxy S 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy S24+', codes: ['SM-S926B'], series: 'Galaxy S 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy S24', codes: ['SM-S921B'], series: 'Galaxy S 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy S24 FE', codes: ['SM-S721B'], series: 'Galaxy S 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy Z Fold 6', codes: ['SM-F956B'], series: 'Galaxy Z 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy Z Flip 6', codes: ['SM-F741B'], series: 'Galaxy Z 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy A55', codes: ['SM-A556B'], series: 'Galaxy A 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy A35', codes: ['SM-A356B'], series: 'Galaxy A 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy A25', codes: ['SM-A256B'], series: 'Galaxy A 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy A15 5G', codes: ['SM-A156B'], series: 'Galaxy A 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy A05s', codes: ['SM-A057F'], series: 'Galaxy A 系列', year: 2024 },
  { brand: 'SAMSUNG', model: 'Galaxy S25 Ultra', codes: ['SM-S938B'], series: 'Galaxy S 系列', year: 2025 },
  { brand: 'SAMSUNG', model: 'Galaxy S25+', codes: ['SM-S936B'], series: 'Galaxy S 系列', year: 2025 },
  { brand: 'SAMSUNG', model: 'Galaxy S25', codes: ['SM-S931B'], series: 'Galaxy S 系列', year: 2025 },
  { brand: 'SAMSUNG', model: 'Galaxy A56 5G', codes: ['SM-A566B'], series: 'Galaxy A 系列', year: 2025 },
  { brand: 'SAMSUNG', model: 'Galaxy A36 5G', codes: ['SM-A366B'], series: 'Galaxy A 系列', year: 2025 },
  { brand: 'SAMSUNG', model: 'Galaxy S26 Ultra', codes: ['SM-S948B'], series: 'Galaxy S 系列', year: 2026 },
  { brand: 'SAMSUNG', model: 'Galaxy S26+', codes: ['SM-S946B'], series: 'Galaxy S 系列', year: 2026 },
  { brand: 'SAMSUNG', model: 'Galaxy S26', codes: ['SM-S941B'], series: 'Galaxy S 系列', year: 2026 },

  { brand: 'GOOGLE', model: 'Pixel 9 Pro', codes: ['G4YQ8'], series: 'Pixel 系列', year: 2024 },
  { brand: 'GOOGLE', model: 'Pixel 9', codes: ['G1B60'], series: 'Pixel 系列', year: 2024 },
  { brand: 'GOOGLE', model: 'Pixel 9a', codes: [], series: 'Pixel 系列', year: 2025 },
  { brand: 'GOOGLE', model: 'Pixel 10 Pro', codes: [], series: 'Pixel 系列', year: 2025 },
  { brand: 'GOOGLE', model: 'Pixel 10', codes: [], series: 'Pixel 系列', year: 2025 },
  { brand: 'GOOGLE', model: 'Pixel 11', codes: [], series: 'Pixel 系列', year: 2026 },

  { brand: 'ONEPLUS', model: 'OnePlus 12', codes: ['CPH2581'], series: 'OnePlus 系列', year: 2024 },
  { brand: 'ONEPLUS', model: 'OnePlus 12R', codes: ['CPH2611'], series: 'OnePlus 系列', year: 2024 },
  { brand: 'ONEPLUS', model: 'OnePlus 13', codes: ['CPH2681'], series: 'OnePlus 系列', year: 2025 },
  { brand: 'ONEPLUS', model: 'OnePlus Nord 4', codes: ['CPH2693'], series: 'Nord 系列', year: 2024 },

  { brand: 'XIAOMI', model: 'Xiaomi 14 Ultra', codes: ['24030PN60G'], series: 'Xiaomi 系列', year: 2024 },
  { brand: 'XIAOMI', model: 'Xiaomi 14', codes: ['23127PN0CG'], series: 'Xiaomi 系列', year: 2024 },
  { brand: 'XIAOMI', model: 'Xiaomi 14T Pro', codes: ['2407FPN8EG'], series: 'Xiaomi 系列', year: 2024 },
  { brand: 'XIAOMI', model: 'Xiaomi 14T', codes: ['2406APNFAG'], series: 'Xiaomi 系列', year: 2024 },
  { brand: 'XIAOMI', model: 'Xiaomi 15 Ultra', codes: ['25030PN60G'], series: 'Xiaomi 系列', year: 2025 },
  { brand: 'XIAOMI', model: 'Xiaomi 15 Pro', codes: ['2410DPN6CC'], series: 'Xiaomi 系列', year: 2025 },
  { brand: 'XIAOMI', model: 'Xiaomi 15', codes: ['24129PN74G'], series: 'Xiaomi 系列', year: 2025 },
  { brand: 'XIAOMI', model: 'Xiaomi 16 Ultra', codes: ['26030PN60G'], series: 'Xiaomi 系列', year: 2026 },
  { brand: 'XIAOMI', model: 'Xiaomi 16 Pro', codes: ['26010PN60G'], series: 'Xiaomi 系列', year: 2026 },
  { brand: 'XIAOMI', model: 'Xiaomi 16', codes: ['26010PN61G'], series: 'Xiaomi 系列', year: 2026 },

  { brand: 'REDMI', model: 'Redmi Note 13 Pro+', codes: ['23090RA98G'], series: 'Redmi Note 系列', year: 2024 },
  { brand: 'REDMI', model: 'Redmi Note 13 Pro', codes: ['2312DRA50G'], series: 'Redmi Note 系列', year: 2024 },
  { brand: 'REDMI', model: 'Redmi Note 13 5G', codes: ['2312DRAABG'], series: 'Redmi Note 系列', year: 2024 },
  { brand: 'REDMI', model: 'Redmi Note 14 Pro+', codes: ['24090RA29G'], series: 'Redmi Note 系列', year: 2025 },
  { brand: 'REDMI', model: 'Redmi Note 14 5G', codes: ['24094RAD1G'], series: 'Redmi Note 系列', year: 2025 },
  { brand: 'REDMI', model: 'Redmi Note 15 Pro+', codes: ['25090RA98G'], series: 'Redmi Note 系列', year: 2026 },
  { brand: 'REDMI', model: 'Redmi Note 15 5G', codes: ['2512DRAABG'], series: 'Redmi Note 系列', year: 2026 },
  { brand: 'REDMI', model: 'Redmi 14C', codes: ['2409BRN2CA', '2409BRN2CG', '2409BRN2CY', '2409BRN2CL'], series: 'Redmi 数字系列', year: 2024 },
  { brand: 'REDMI', model: 'Redmi 13C', codes: ['23100RN82L'], series: 'Redmi 数字系列', year: 2024 },
  { brand: 'REDMI', model: 'Redmi 13', codes: ['24049RN28L'], series: 'Redmi 数字系列', year: 2024 },

  { brand: 'OPPO', model: 'Reno 12 Pro', codes: ['CPH2629'], series: 'Reno 系列', year: 2024 },
  { brand: 'OPPO', model: 'Reno 12', codes: ['CPH2625'], series: 'Reno 系列', year: 2024 },
  { brand: 'OPPO', model: 'Reno 13 Pro', codes: ['CPH2689'], series: 'Reno 系列', year: 2025 },
  { brand: 'OPPO', model: 'Reno 14 Pro', codes: ['CPH2729'], series: 'Reno 系列', year: 2026 },
  { brand: 'OPPO', model: 'Find X8 Pro', codes: ['CPH2651'], series: 'Find 系列', year: 2024 },

  { brand: 'HONOR', model: 'Honor Magic 6 Pro', codes: ['BVL-N49'], series: 'Magic 系列', year: 2024 },
  { brand: 'HONOR', model: 'Honor Magic 7 Pro', codes: ['PTP-AN10'], series: 'Magic 系列', year: 2025 },
  { brand: 'HONOR', model: 'Honor Magic 8 Pro', codes: ['BVL-N59'], series: 'Magic 系列', year: 2026 },

  { brand: 'VIVO', model: 'X100 Pro', codes: ['V2308'], series: 'X 系列', year: 2024 },
  { brand: 'VIVO', model: 'X200 Pro', codes: ['V2413'], series: 'X 系列', year: 2025 },
  { brand: 'VIVO', model: 'X300 Pro', codes: [], series: 'X 系列', year: 2026 },

  { brand: 'SONY', model: 'Xperia 1 VI', codes: ['XQ-EC54'], series: 'Xperia 1', year: 2024 },
  { brand: 'SONY', model: 'Xperia 10 VI', codes: ['XQ-ES54'], series: 'Xperia 10', year: 2024 },
  { brand: 'SONY', model: 'Xperia 1 VII', codes: [], series: 'Xperia 1', year: 2025 },
];
