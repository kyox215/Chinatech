
import { PhoneModel } from './types';

export const currentYear = 2026;

export const initialCsvData = `Model,ScreenPrice,BatteryPrice,BaseRecyclePrice,ReleaseYear
iPhone 17 Pro Max,499,139,800,2025
iPhone 17 Pro,419,139,700,2025
iPhone 17 Plus,419,109,580,2025
iPhone 17,419,109,520,2025
iPhone 16 Pro Max,499,139,680,2024
iPhone 16 Pro,419,139,580,2024
iPhone 16 Plus,419,109,480,2024
iPhone 16,349,109,400,2024
iPhone 15 Pro Max,499,109,580,2023
iPhone 15 Pro,419,109,480,2023
iPhone 15 Plus,419,109,380,2023
iPhone 15,349,109,320,2023
iPhone 14 Pro Max,499,109,480,2022
iPhone 14 Pro,419,109,400,2022
iPhone 14 Plus,419,109,280,2022
iPhone 14,349,109,250,2022
iPhone 13 Pro Max,419,99,350,2021
iPhone 13 Pro,349,99,300,2021
iPhone 13,349,99,200,2021
iPhone 13 mini,289,99,150,2021
iPhone 12 Pro Max,419,99,250,2020
iPhone 12 Pro,349,99,200,2020
iPhone 12,349,99,150,2020
iPhone 12 mini,289,99,100,2020
iPhone 11 Pro Max,419,99,160,2019
iPhone 11 Pro,349,99,130,2019
iPhone 11,249,99,90,2019`;

export const storageTiers = [
  { label: "64G", value: 0 },
  { label: "128G", value: 10 },
  { label: "256G", value: 25 },
  { label: "512G", value: 40 },
  { label: "1TB", value: 60 }
];

export const parseCSV = (csvText: string): PhoneModel[] => {
  const lines = csvText.trim().split('\n');
  return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
          model: values[0],
          screenPrice: parseFloat(values[1]),
          batteryPrice: parseFloat(values[2]),
          baseRecyclePrice: parseFloat(values[3]),
          releaseYear: parseInt(values[4])
      };
  });
};
