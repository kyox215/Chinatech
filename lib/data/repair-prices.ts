export interface RepairItem {
  id: string;
  brand: string;
  model: string;
  repair_item: string;
  quality: string;
  price: number;
  warranty: string;
}

export const REPAIR_PRICES: RepairItem[] = [
  {
    "id": "repair-1",
    "brand": "ACER",
    "model": "ACER",
    "repair_item": "刷机换ssd 256",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2",
    "brand": "ACER",
    "model": "N15P2",
    "repair_item": "不开机检查",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-3",
    "brand": "ACER",
    "model": "TABLET",
    "repair_item": "主板",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-4",
    "brand": "ALCATEL",
    "model": "1B 2022",
    "repair_item": "CONTROLLO NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-5",
    "brand": "ALCATEL",
    "model": "1S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-6",
    "brand": "ALCATEL",
    "model": "1SE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-7",
    "brand": "ALCATEL",
    "model": "5002H",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-8",
    "brand": "ALCATEL",
    "model": "5024 1 SE 2019",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-9",
    "brand": "ALCATEL",
    "model": "5030D",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-10",
    "brand": "ALCATEL",
    "model": "5030F 1SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-11",
    "brand": "ALCATEL",
    "model": "ALCATEL 1 SE",
    "repair_item": "不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-12",
    "brand": "ALCATEL",
    "model": "ALCATEL 3X",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-14",
    "brand": "ALTRO",
    "model": "BL-C4",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-15",
    "brand": "ALTRO",
    "model": "CLEAM PAD V69741",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-16",
    "brand": "ALTRO",
    "model": "CLEMPAD V69741",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-17",
    "brand": "ALTRO",
    "model": "DBP-800B",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-18",
    "brand": "ALTRO",
    "model": "GARMIN",
    "repair_item": "手表不冲电",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-19",
    "brand": "ALTRO",
    "model": "HANDY 10",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-20",
    "brand": "ALTRO",
    "model": "HOTWAV T7",
    "repair_item": "电池",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-21",
    "brand": "ALTRO",
    "model": "NOTHING PHONE",
    "repair_item": "不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-22",
    "brand": "ALTRO",
    "model": "NUBIA FOCUS 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-23",
    "brand": "ALTRO",
    "model": "OLIVATTI",
    "repair_item": "usb没有用留下来检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-24",
    "brand": "ALTRO",
    "model": "PEUGEOT 307",
    "repair_item": "钥匙匹配 ,自己过来",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-25",
    "brand": "ALTRO",
    "model": "ROHS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-26",
    "brand": "ALTRO",
    "model": "SONY XPERIA XZ  SO 04J",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-27",
    "brand": "ALTRO",
    "model": "TAB",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-28",
    "brand": "ALTRO",
    "model": "TAB QILIVE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-29",
    "brand": "ALTRO",
    "model": "TABLET",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-30",
    "brand": "ALTRO",
    "model": "TABLET",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-31",
    "brand": "ALTRO",
    "model": "TECNO POUVOIR 4/4PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-32",
    "brand": "ALTRO",
    "model": "UMIDIGI G1",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-33",
    "brand": "ALTRO",
    "model": "WINGS W7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-34",
    "brand": "ALTRO",
    "model": "YESTEL",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-35",
    "brand": "ALTRO",
    "model": "ZENFONE 5",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-36",
    "brand": "APPLE",
    "model": "Apple Watch",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-37",
    "brand": "APPLE",
    "model": "Apple Watch 1 38 MM",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-38",
    "brand": "APPLE",
    "model": "Apple Watch 3 38MM",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-39",
    "brand": "APPLE",
    "model": "Apple Watch 7 45MM",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-40",
    "brand": "APPLE",
    "model": "Apple Watch SE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-41",
    "brand": "APPLE",
    "model": "Apple Watch SE 1 44MM",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-42",
    "brand": "APPLE",
    "model": "Apple Watch SERIE 4 44MM",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-43",
    "brand": "APPLE",
    "model": "IPAD",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-44",
    "brand": "APPLE",
    "model": "IPAD",
    "repair_item": "IPAD 3 把 电池换",
    "quality": "standard",
    "price": 135,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-45",
    "brand": "APPLE",
    "model": "IPAD A1460",
    "repair_item": "NON ACCENDE NON CARICA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-46",
    "brand": "APPLE",
    "model": "IPAD A1475",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-47",
    "brand": "APPLE",
    "model": "IPAD A1701",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 220,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-48",
    "brand": "APPLE",
    "model": "IPAD A1823",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-49",
    "brand": "APPLE",
    "model": "IPAD A1823",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-50",
    "brand": "APPLE",
    "model": "IPAD A1954",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-51",
    "brand": "APPLE",
    "model": "IPAD A1980",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 250,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-52",
    "brand": "APPLE",
    "model": "IPAD A2072",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-53",
    "brand": "APPLE",
    "model": "IPAD A2270",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-54",
    "brand": "APPLE",
    "model": "IPAD A2270",
    "repair_item": "touch nero",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-55",
    "brand": "APPLE",
    "model": "IPAD A2602",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-56",
    "brand": "APPLE",
    "model": "IPAD AIR 1475",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-57",
    "brand": "APPLE",
    "model": "IPAD AIR 2",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-58",
    "brand": "APPLE",
    "model": "IPAD AIR 2",
    "repair_item": "connttore",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-59",
    "brand": "APPLE",
    "model": "IPAD AIR 4 A2316",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-60",
    "brand": "APPLE",
    "model": "IPAD 2",
    "repair_item": "不开机检查报价",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-61",
    "brand": "APPLE",
    "model": "IPAD 3",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-62",
    "brand": "APPLE",
    "model": "IPAD 1475",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-63",
    "brand": "APPLE",
    "model": "IPAD 1893",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-64",
    "brand": "APPLE",
    "model": "iPhone IPHNE 13",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-65",
    "brand": "APPLE",
    "model": "iPhone SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-66",
    "brand": "APPLE",
    "model": "iPhone SE",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-67",
    "brand": "APPLE",
    "model": "iPhone SE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-68",
    "brand": "APPLE",
    "model": "iPhone SE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-69",
    "brand": "APPLE",
    "model": "iPhone SE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-70",
    "brand": "APPLE",
    "model": "iPhone SE 1",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-71",
    "brand": "APPLE",
    "model": "iPhone SE 1 SERIE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-72",
    "brand": "APPLE",
    "model": "iPhone SE 2",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-73",
    "brand": "APPLE",
    "model": "iPhone SE 2",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-74",
    "brand": "APPLE",
    "model": "iPhone SE 2016",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-75",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-76",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-77",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-78",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-79",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "3分钟重启 报价80",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-80",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "64gb",
    "quality": "standard",
    "price": 165,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-81",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-82",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "买二手手机",
    "quality": "standard",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-83",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "买IPHONE se 2020 128",
    "quality": "standard",
    "price": 220,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-84",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-85",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-86",
    "brand": "APPLE",
    "model": "iPhone SE 2020",
    "repair_item": "主板",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-87",
    "brand": "APPLE",
    "model": "iPhone SE 2022",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-88",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-89",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-90",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-91",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-92",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-93",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-94",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "电池 组",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-95",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-96",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "清理",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-97",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-98",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-99",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "无信号",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-100",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-101",
    "brand": "APPLE",
    "model": "iPhone X",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-102",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-103",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-104",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-105",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-106",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-107",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-108",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "检查卡LOGO 换了电池还是一样",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-109",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-110",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "检查不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-111",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-112",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-113",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-114",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-115",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "无信号",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-116",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-117",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "主板",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-118",
    "brand": "APPLE",
    "model": "iPhone XR",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-119",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-120",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-121",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-122",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-123",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-124",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "原装电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-125",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-126",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-127",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-128",
    "brand": "APPLE",
    "model": "iPhone XS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-129",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-130",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-131",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-132",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-133",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-134",
    "brand": "APPLE",
    "model": "iPhone XS MAX",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-135",
    "brand": "APPLE",
    "model": "iPhone 5",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-136",
    "brand": "APPLE",
    "model": "iPhone 5",
    "repair_item": "ICLOUD",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-137",
    "brand": "APPLE",
    "model": "iPhone 5S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-138",
    "brand": "APPLE",
    "model": "iPhone 6",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-139",
    "brand": "APPLE",
    "model": "iPhone 6",
    "repair_item": "电池",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-140",
    "brand": "APPLE",
    "model": "iPhone 6",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-141",
    "brand": "APPLE",
    "model": "iPhone 6P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-142",
    "brand": "APPLE",
    "model": "iPhone 6 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-143",
    "brand": "APPLE",
    "model": "iPhone 6 PLUS",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-144",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-145",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-146",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-147",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-148",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "按键 震动键",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-149",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-150",
    "brand": "APPLE",
    "model": "iPhone 6S",
    "repair_item": "ICLOUD",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-151",
    "brand": "APPLE",
    "model": "iPhone 6S PLUS",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-152",
    "brand": "APPLE",
    "model": "iPhone 6S PLUS",
    "repair_item": "对方听不到说话",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-153",
    "brand": "APPLE",
    "model": "iPhone 6SP",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-154",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-155",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-156",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-157",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "换电池30+刷机20",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-158",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-159",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "检查报价",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-160",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-161",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "无信号",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-162",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "CONNEWTTORE",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-163",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "IC AUDIO",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-164",
    "brand": "APPLE",
    "model": "iPhone 7",
    "repair_item": "ICLOUD",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-165",
    "brand": "APPLE",
    "model": "iPhone 7P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-166",
    "brand": "APPLE",
    "model": "iPhone 7P",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-167",
    "brand": "APPLE",
    "model": "iPhone 7P",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-168",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-169",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-170",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-171",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-172",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "音频 IC",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-173",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "IC AUDIO",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-174",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "IC AUDIO 1407",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-175",
    "brand": "APPLE",
    "model": "iPhone 7 PLUS",
    "repair_item": "icloud",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-176",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-177",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-178",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-179",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-180",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-181",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-182",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-183",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-184",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "解锁icloud",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-185",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-186",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-187",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-188",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-189",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-190",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "TELEFONO 64GB",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-191",
    "brand": "APPLE",
    "model": "iPhone 8",
    "repair_item": "VETRO DIETRO",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-192",
    "brand": "APPLE",
    "model": "iPhone 8/SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-193",
    "brand": "APPLE",
    "model": "iPhone 8G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-194",
    "brand": "APPLE",
    "model": "iPhone 8P",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-195",
    "brand": "APPLE",
    "model": "iPhone 8 PLUS",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-196",
    "brand": "APPLE",
    "model": "iPhone 8 PLUS",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-197",
    "brand": "APPLE",
    "model": "iPhone 8 PLUS",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-198",
    "brand": "APPLE",
    "model": "iPhone 8 PLUS",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-199",
    "brand": "APPLE",
    "model": "iPhone 8 PLUS",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-200",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-201",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-202",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-203",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-204",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-205",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-206",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-207",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "检查 更新后APP不见",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-208",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "马达/振动器",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-209",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "清理前摄",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-210",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-211",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-212",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-213",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "无WiFi 无蓝牙，无闪光灯",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-214",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-215",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "整机检查报价 紫色的",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-216",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-217",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "CHIAMA DOPO 17.00",
    "quality": "standard",
    "price": 350,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-218",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "DATI",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-219",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "DISPLLAY",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-220",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-221",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "NON ACCENTE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-222",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "PULIZIONE PIJN: 357890",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-223",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-224",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-225",
    "brand": "APPLE",
    "model": "iPhone 11",
    "repair_item": "WIFI ,+ SEGNAL NO FUNZIONA,PIN, 210809",
    "quality": "standard",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-226",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-227",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-228",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-229",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-230",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-231",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-232",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-233",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-234",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-235",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "DATI + PIN:2319423",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-236",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "dispaly",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-237",
    "brand": "APPLE",
    "model": "iPhone 11 PRO",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-238",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-239",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-240",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-241",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-242",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-243",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "拆机费",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-244",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-245",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-246",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "无信号",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-247",
    "brand": "APPLE",
    "model": "iPhone 11 PRO MAX",
    "repair_item": "SENSORE",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-248",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-249",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-250",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-251",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-252",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-253",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-254",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "留下来检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-255",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "录音有杂音 PIN:",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-256",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-257",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-258",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-259",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-260",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-261",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-262",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "ICLOUD",
    "quality": "standard",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-263",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "NO CARICA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-264",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "NON CARICA",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-265",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-266",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "SISTEMA",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-267",
    "brand": "APPLE",
    "model": "iPhone 12",
    "repair_item": "VETRO DIETRO BIANCO",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-268",
    "brand": "APPLE",
    "model": "iPhone 12MINI",
    "repair_item": "电池",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-269",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-270",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-271",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-272",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-273",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "返修 还没来 清理灰尘",
    "quality": "standard",
    "price": 190,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-274",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "黑屏但开机 检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-275",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-276",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "检查不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-277",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-278",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-279",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-280",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 0,
    "warranty": "USATO GARANZIA"
  },
  {
    "id": "repair-281",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-282",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "SBLOCCAZIOME",
    "quality": "standard",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-283",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-284",
    "brand": "APPLE",
    "model": "iPhone 12 PRO",
    "repair_item": "VETRO ORO",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-285",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-286",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-287",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-288",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-289",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-290",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-291",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-292",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-293",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-294",
    "brand": "APPLE",
    "model": "iPhone 12 PRO MAX",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-295",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-296",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-297",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-298",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-299",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-300",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-301",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-302",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-303",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-304",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-305",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-306",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "COVER + CORDA NERO",
    "quality": "standard",
    "price": 8,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-307",
    "brand": "APPLE",
    "model": "iPhone 13",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 95,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-308",
    "brand": "APPLE",
    "model": "iPhone 13 MINI",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-309",
    "brand": "APPLE",
    "model": "iPhone 13 MINI",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-310",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 150,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-311",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-312",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-313",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-314",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "不开机 不充电",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-315",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-316",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "后摄+前摄",
    "quality": "standard",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-317",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "检查不充电",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-318",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-319",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-320",
    "brand": "APPLE",
    "model": "iPhone 13 PRO",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-321",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-322",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-323",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-324",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "电池",
    "quality": "standard",
    "price": 300,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-325",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "订手机 送手机壳BLUE+ vetro",
    "quality": "standard",
    "price": 830,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-326",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-327",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-328",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-329",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-330",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "BIANCO",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-331",
    "brand": "APPLE",
    "model": "iPhone 13 PRO MAX",
    "repair_item": "vetro blu 80 euro + power button 50",
    "quality": "standard",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-332",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-333",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-334",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-335",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-336",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "不读卡",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-337",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-338",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-339",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-340",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "自己卖的 返修，会3分钟重启",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-341",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-342",
    "brand": "APPLE",
    "model": "iPhone 14",
    "repair_item": "VETRO BIANCO",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-343",
    "brand": "APPLE",
    "model": "iPhone 14 PLUS",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-344",
    "brand": "APPLE",
    "model": "iPhone 14 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-345",
    "brand": "APPLE",
    "model": "iPhone 14 PLUS",
    "repair_item": "PIN : 2580 DATI",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-346",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 400,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-347",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-348",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-349",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-350",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "不触摸",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-351",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-352",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "马达/振动器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-353",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "前摄 返修",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-354",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-355",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-356",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "BATTRIA ALTACAPACITA",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-357",
    "brand": "APPLE",
    "model": "iPhone 14 PRO",
    "repair_item": "POWER BUTTON NO FUNZONA 这边买的",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-358",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-359",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-360",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-361",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-362",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "进水不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-363",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-364",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-365",
    "brand": "APPLE",
    "model": "iPhone 14 PRO MAX",
    "repair_item": "主板",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-366",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-367",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-368",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 330,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-369",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-370",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-371",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-372",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "主板",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-373",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "BATEERIA ALT CAP",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-374",
    "brand": "APPLE",
    "model": "iPhone 15",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-375",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-376",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-377",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-378",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-379",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-380",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "256 GB",
    "quality": "standard",
    "price": 1.37,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-381",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-382",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-383",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-384",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-385",
    "brand": "APPLE",
    "model": "iPhone 15 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-386",
    "brand": "APPLE",
    "model": "iPhone 15 PRO MAX",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-387",
    "brand": "APPLE",
    "model": "iPhone 15 PRO MAX",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 135,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-388",
    "brand": "APPLE",
    "model": "iPhone 15 PRO MAX",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-389",
    "brand": "APPLE",
    "model": "iPhone 17 PRO",
    "repair_item": "DATI",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-390",
    "brand": "APPLE",
    "model": "iPhone 17 PRO",
    "repair_item": "VETRO OPACO PRIVACY + TRASPPARENTE COVER",
    "quality": "standard",
    "price": 10,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-391",
    "brand": "APPLE",
    "model": "iPhone 17 pro max",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-392",
    "brand": "APPLE",
    "model": "iPhone 17 pro max",
    "repair_item": "屏幕",
    "quality": "orig",
    "price": 500,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-393",
    "brand": "APPLE",
    "model": "iPhone 17 pro max",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-394",
    "brand": "APPLE",
    "model": "iPhone 17 pro max",
    "repair_item": "电池 (扩容)",
    "quality": "altcap",
    "price": 140,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-395",
    "brand": "ASUS",
    "model": "游戏本",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 115,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-396",
    "brand": "ASUS",
    "model": "K01A",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-397",
    "brand": "ASUS",
    "model": "N522V",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-398",
    "brand": "ASUS",
    "model": "TAB P01T",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-399",
    "brand": "ASUS",
    "model": "X00AD",
    "repair_item": "电池",
    "quality": "standard",
    "price": 16,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-400",
    "brand": "ASUS",
    "model": "X00AD",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-401",
    "brand": "ASUS",
    "model": "X00HD",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-402",
    "brand": "ASUS",
    "model": "X00TD",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-403",
    "brand": "ASUS",
    "model": "X018D",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-404",
    "brand": "ASUS",
    "model": "ZENFONE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-405",
    "brand": "ASUS",
    "model": "ZENFONE MAX PRO M1",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-406",
    "brand": "ASUS",
    "model": "ZENFONE MAX PRO M1 X00TD",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-407",
    "brand": "ASUS",
    "model": "ZENPAD",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-408",
    "brand": "BLACKVIEW",
    "model": "4900 PRO",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-409",
    "brand": "BLACKVIEW",
    "model": "A80 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-410",
    "brand": "BLACKVIEW",
    "model": "BL8800 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-411",
    "brand": "BLACKVIEW",
    "model": "BV4900",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-412",
    "brand": "BLACKVIEW",
    "model": "BV6200",
    "repair_item": "订手机",
    "quality": "standard",
    "price": 150,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-413",
    "brand": "BLACKVIEW",
    "model": "BV6800 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 220,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-414",
    "brand": "BLACKVIEW",
    "model": "BV8800",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-415",
    "brand": "BLACKVIEW",
    "model": "TAB 7 PRO",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-416",
    "brand": "BRONDI",
    "model": "AMICO FLIP 4G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-417",
    "brand": "BRONDI",
    "model": "BATTERIA",
    "repair_item": "BL 5C",
    "quality": "standard",
    "price": 12,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-418",
    "brand": "BRONDI",
    "model": "BIGFP2000AA",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-419",
    "brand": "BRONDI",
    "model": "BL 4C",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-420",
    "brand": "BRONDI",
    "model": "BRONDI 老人机",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-421",
    "brand": "BRONDI",
    "model": "MAGNUM 3",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-422",
    "brand": "CLEMPAD",
    "model": "V48674",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-423",
    "brand": "CLEMPAD",
    "model": "V48677",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-424",
    "brand": "CUBOT",
    "model": "P80",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-425",
    "brand": "CUBOT",
    "model": "P80",
    "repair_item": "POWR BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-426",
    "brand": "CUBOT",
    "model": "P80",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-427",
    "brand": "DOOGEE",
    "model": "DK 10",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 43,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-428",
    "brand": "DOOGEE",
    "model": "S59 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-429",
    "brand": "DOOGEE",
    "model": "S88 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-430",
    "brand": "DOOGEE",
    "model": "V10",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-431",
    "brand": "DOOGEE",
    "model": "V20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-432",
    "brand": "DOOGEE",
    "model": "V30T",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-433",
    "brand": "GOOGLE",
    "model": "PIXEL 7A",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-434",
    "brand": "GOOGLE",
    "model": "PIXEL 8A",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-435",
    "brand": "HONOR",
    "model": "20 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-436",
    "brand": "HONOR",
    "model": "200",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-437",
    "brand": "HONOR",
    "model": "200 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-438",
    "brand": "HONOR",
    "model": "200 SMART 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 75,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-439",
    "brand": "HONOR",
    "model": "50 HTN NX9",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-440",
    "brand": "HONOR",
    "model": "50 LITE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-441",
    "brand": "HONOR",
    "model": "50 LITE",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-442",
    "brand": "HONOR",
    "model": "50 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-443",
    "brand": "HONOR",
    "model": "70 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-444",
    "brand": "HONOR",
    "model": "7A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-445",
    "brand": "HONOR",
    "model": "7X",
    "repair_item": "不开机应该是电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-446",
    "brand": "HONOR",
    "model": "8A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-447",
    "brand": "HONOR",
    "model": "9 LITE LLD L31",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-448",
    "brand": "HONOR",
    "model": "90",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-449",
    "brand": "HONOR",
    "model": "90 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-450",
    "brand": "HONOR",
    "model": "90 ITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-451",
    "brand": "HONOR",
    "model": "90 LITE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-452",
    "brand": "HONOR",
    "model": "90 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-453",
    "brand": "HONOR",
    "model": "90 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-454",
    "brand": "HONOR",
    "model": "90 LITE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-455",
    "brand": "HONOR",
    "model": "JSN L21",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-456",
    "brand": "HONOR",
    "model": "MAGIC 4 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-457",
    "brand": "HONOR",
    "model": "MAGIC 5 LITE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-458",
    "brand": "HONOR",
    "model": "MAGIC 5 LITE 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-459",
    "brand": "HONOR",
    "model": "MAGIC 5 LITE 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-460",
    "brand": "HONOR",
    "model": "MAGIC 5 LITE 5G",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-461",
    "brand": "HONOR",
    "model": "MAGIC 6 LITE",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 10,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-462",
    "brand": "HONOR",
    "model": "NOVA 5T",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-463",
    "brand": "HONOR",
    "model": "PAD X8A",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-464",
    "brand": "HONOR",
    "model": "VIEW 10 LITE",
    "repair_item": "COVCER TRASPARENTE",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-465",
    "brand": "HONOR",
    "model": "VIEW 20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "USATO GARANZIA"
  },
  {
    "id": "repair-466",
    "brand": "HONOR",
    "model": "X6A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-467",
    "brand": "HONOR",
    "model": "X6A",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-468",
    "brand": "HONOR",
    "model": "X6B",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-469",
    "brand": "HONOR",
    "model": "X6B",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-470",
    "brand": "HONOR",
    "model": "X7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-471",
    "brand": "HONOR",
    "model": "X7",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-472",
    "brand": "HONOR",
    "model": "X7A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-473",
    "brand": "HONOR",
    "model": "X7A",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-474",
    "brand": "HONOR",
    "model": "X7B",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-475",
    "brand": "HONOR",
    "model": "X7B",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-476",
    "brand": "HONOR",
    "model": "X7B",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-477",
    "brand": "HONOR",
    "model": "X8",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-478",
    "brand": "HONOR",
    "model": "X8 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-479",
    "brand": "HONOR",
    "model": "X8 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-480",
    "brand": "HONOR",
    "model": "X8 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-481",
    "brand": "HONOR",
    "model": "X8 5G",
    "repair_item": "DIAPLY",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-482",
    "brand": "HONOR",
    "model": "X8A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-483",
    "brand": "HONOR",
    "model": "X8A",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-484",
    "brand": "HONOR",
    "model": "X8B",
    "repair_item": "FORMATTAZIONE",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-485",
    "brand": "HONOR",
    "model": "X9 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-486",
    "brand": "HP",
    "model": "15-CS1012NL TPN-Q208",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-487",
    "brand": "HUAWEI",
    "model": "Unknown",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-488",
    "brand": "HUAWEI",
    "model": "Unknown",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-489",
    "brand": "HUAWEI",
    "model": "Unknown",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-490",
    "brand": "HUAWEI",
    "model": "AGS L09",
    "repair_item": "NON CARICA",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-491",
    "brand": "HUAWEI",
    "model": "AGS2-W09",
    "repair_item": "power bubtton",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-492",
    "brand": "HUAWEI",
    "model": "ATU L11",
    "repair_item": "ATU L11 换电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-493",
    "brand": "HUAWEI",
    "model": "BATTERIA",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-494",
    "brand": "HUAWEI",
    "model": "GT2 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-495",
    "brand": "HUAWEI",
    "model": "HONOR VIEW 20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-496",
    "brand": "HUAWEI",
    "model": "HONOR 7A",
    "repair_item": "刷机",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-497",
    "brand": "HUAWEI",
    "model": "HONOR 7A AUM L29",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-498",
    "brand": "HUAWEI",
    "model": "HONOR 8X",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-499",
    "brand": "HUAWEI",
    "model": "HONOR 8X",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-500",
    "brand": "HUAWEI",
    "model": "HONOR 9 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-501",
    "brand": "HUAWEI",
    "model": "HONOR 9 LITE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-502",
    "brand": "HUAWEI",
    "model": "INE LX1",
    "repair_item": "VOLUME BUTTON 外面的 + COVER P SMART 2019 COVER  5 EURO",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-503",
    "brand": "HUAWEI",
    "model": "MATEPAD T10S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-504",
    "brand": "HUAWEI",
    "model": "MATE 2O LITE",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-505",
    "brand": "HUAWEI",
    "model": "MATE 10 LITE",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-506",
    "brand": "HUAWEI",
    "model": "MATE 10 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-507",
    "brand": "HUAWEI",
    "model": "MATE 10 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-508",
    "brand": "HUAWEI",
    "model": "MATE 10 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-509",
    "brand": "HUAWEI",
    "model": "MATE 10 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-510",
    "brand": "HUAWEI",
    "model": "MATE 10 PRO",
    "repair_item": "DISP COMP.",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-511",
    "brand": "HUAWEI",
    "model": "MATE 20",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-512",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-513",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-514",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-515",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-516",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-517",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "BATTEERIA",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-518",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "impronte",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-519",
    "brand": "HUAWEI",
    "model": "MATE 20 LITE",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-520",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-521",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 140,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-522",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-523",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-524",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-525",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "主板",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-526",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-527",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "sistema PIN:",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-528",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "VETRO BLUE",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-529",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "VETRO ORIG. NERO   COVER",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-530",
    "brand": "HUAWEI",
    "model": "MATE 20 PRO",
    "repair_item": "WIFI 会断连，发热 掉电快",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-531",
    "brand": "HUAWEI",
    "model": "MEDIA PAD M5 LITE 10.1",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-532",
    "brand": "HUAWEI",
    "model": "MEDIAPAD T5",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-533",
    "brand": "HUAWEI",
    "model": "MEDIAPAD T5 10",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-534",
    "brand": "HUAWEI",
    "model": "NOVA 3I",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-535",
    "brand": "HUAWEI",
    "model": "NOVA 5T",
    "repair_item": "电池",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-536",
    "brand": "HUAWEI",
    "model": "POT LX1",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-537",
    "brand": "HUAWEI",
    "model": "POT LX1",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-538",
    "brand": "HUAWEI",
    "model": "PRA LX1",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-539",
    "brand": "HUAWEI",
    "model": "P SMART",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-540",
    "brand": "HUAWEI",
    "model": "P SMART",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-541",
    "brand": "HUAWEI",
    "model": "P SMART",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-542",
    "brand": "HUAWEI",
    "model": "P SMART",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-543",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-544",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-545",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-546",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "换了电池不冲电 ,借A02S手机",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-547",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "20 手工费 总共57 帮忙组装",
    "quality": "standard",
    "price": 57,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-548",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "2把",
    "quality": "standard",
    "price": 85,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-549",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "传数据",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-550",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-551",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-552",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-553",
    "brand": "HUAWEI",
    "model": "P SMART 2019",
    "repair_item": "NON CARICA",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-554",
    "brand": "HUAWEI",
    "model": "P SMART 2019 POT LX1A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-555",
    "brand": "HUAWEI",
    "model": "P SMART 2020",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-556",
    "brand": "HUAWEI",
    "model": "P SMART 2020",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-557",
    "brand": "HUAWEI",
    "model": "P SMART 2020",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-558",
    "brand": "HUAWEI",
    "model": "P SMART 2021",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-559",
    "brand": "HUAWEI",
    "model": "P SMART 2021",
    "repair_item": "安装GOOGLE",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-560",
    "brand": "HUAWEI",
    "model": "P SMARTZ",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-561",
    "brand": "HUAWEI",
    "model": "P SMARTZ",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-562",
    "brand": "HUAWEI",
    "model": "P SMARTZ",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-563",
    "brand": "HUAWEI",
    "model": "P SMARTZ",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-564",
    "brand": "HUAWEI",
    "model": "P6-U06",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-565",
    "brand": "HUAWEI",
    "model": "P8 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-566",
    "brand": "HUAWEI",
    "model": "P8 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-567",
    "brand": "HUAWEI",
    "model": "P8 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-568",
    "brand": "HUAWEI",
    "model": "P8 LITE 2017",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-569",
    "brand": "HUAWEI",
    "model": "P8 LITE 2017",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-570",
    "brand": "HUAWEI",
    "model": "P9",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-571",
    "brand": "HUAWEI",
    "model": "P9",
    "repair_item": "电池",
    "quality": "standard",
    "price": 75,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-572",
    "brand": "HUAWEI",
    "model": "P9 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-573",
    "brand": "HUAWEI",
    "model": "P9 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-574",
    "brand": "HUAWEI",
    "model": "P9 LITE VNS L31",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-575",
    "brand": "HUAWEI",
    "model": "P9 PLUS",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-576",
    "brand": "HUAWEI",
    "model": "P10 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-577",
    "brand": "HUAWEI",
    "model": "P10 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-578",
    "brand": "HUAWEI",
    "model": "P10 LITE",
    "repair_item": "电话无法接 刷机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-579",
    "brand": "HUAWEI",
    "model": "P10 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-580",
    "brand": "HUAWEI",
    "model": "P10 LITE",
    "repair_item": "power button",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-581",
    "brand": "HUAWEI",
    "model": "P10 LITE WAS LX1",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-582",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-583",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-584",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-585",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-586",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 65,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-587",
    "brand": "HUAWEI",
    "model": "P20",
    "repair_item": "TASTO VOLUME 外面的",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-588",
    "brand": "HUAWEI",
    "model": "P20 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-589",
    "brand": "HUAWEI",
    "model": "P20 LITE",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-590",
    "brand": "HUAWEI",
    "model": "P20 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-591",
    "brand": "HUAWEI",
    "model": "P20 LITE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-592",
    "brand": "HUAWEI",
    "model": "P20 LITE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-593",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-594",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-595",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-596",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-597",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-598",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-599",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-600",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-601",
    "brand": "HUAWEI",
    "model": "P20 PRO",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-602",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-603",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-604",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-605",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-606",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-607",
    "brand": "HUAWEI",
    "model": "P30",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-608",
    "brand": "HUAWEI",
    "model": "P30 30LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "USATO GARANZIA"
  },
  {
    "id": "repair-609",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-610",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-611",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "换电池后 不充电】",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-612",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-613",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-614",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "前摄",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-615",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-616",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-617",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-618",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "想买一个",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-619",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-620",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-621",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "VETRO",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-622",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "vetro dietro",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-623",
    "brand": "HUAWEI",
    "model": "P30 LITE",
    "repair_item": "virus",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-624",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-625",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 95,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-626",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-627",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-628",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-629",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-630",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-631",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-632",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-633",
    "brand": "HUAWEI",
    "model": "P30 PRO",
    "repair_item": "SENSORE LUCE",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-634",
    "brand": "HUAWEI",
    "model": "P40 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-635",
    "brand": "HUAWEI",
    "model": "T3",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-636",
    "brand": "HUAWEI",
    "model": "TAB",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-637",
    "brand": "HUAWEI",
    "model": "TAB T10 :AGR W09",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-638",
    "brand": "HUAWEI",
    "model": "TAG-L01",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-639",
    "brand": "HUAWEI",
    "model": "WATCH GT 2 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-640",
    "brand": "HUAWEI",
    "model": "X8 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-641",
    "brand": "HUAWEI",
    "model": "X8A",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-642",
    "brand": "HUAWEI",
    "model": "Y5 2018",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-643",
    "brand": "HUAWEI",
    "model": "Y5 2018",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-644",
    "brand": "HUAWEI",
    "model": "Y5 2018",
    "repair_item": "power button",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-645",
    "brand": "HUAWEI",
    "model": "Y5 2019",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-646",
    "brand": "HUAWEI",
    "model": "Y5P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-647",
    "brand": "HUAWEI",
    "model": "Y5 PRIME",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-648",
    "brand": "HUAWEI",
    "model": "Y6",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-649",
    "brand": "HUAWEI",
    "model": "Y6 2017",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-650",
    "brand": "HUAWEI",
    "model": "Y6 2017",
    "repair_item": "检查 报价",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-651",
    "brand": "HUAWEI",
    "model": "Y6 2018",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-652",
    "brand": "HUAWEI",
    "model": "Y6 2018",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-653",
    "brand": "HUAWEI",
    "model": "Y6 2019",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-654",
    "brand": "HUAWEI",
    "model": "Y6 2019",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-655",
    "brand": "HUAWEI",
    "model": "Y6 2019",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-656",
    "brand": "HUAWEI",
    "model": "Y6 2019",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-657",
    "brand": "HUAWEI",
    "model": "Y6 II",
    "repair_item": "主板",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-658",
    "brand": "HUAWEI",
    "model": "Y6S",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-659",
    "brand": "HUAWEI",
    "model": "Y6S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-660",
    "brand": "HUAWEI",
    "model": "Y6S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-661",
    "brand": "HUAWEI",
    "model": "Y7 2017",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-662",
    "brand": "HUAWEI",
    "model": "Y7 2019",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-663",
    "brand": "HUAWEI",
    "model": "Y9 2019 PRIME",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-664",
    "brand": "HUAWEI",
    "model": "Y9 PRIME 2019",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-665",
    "brand": "HUAWEI",
    "model": "Y600",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-666",
    "brand": "IIIF150",
    "model": "B1 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-667",
    "brand": "LENOVO",
    "model": "14E CHROMEBOOK",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-668",
    "brand": "LENOVO",
    "model": "18650",
    "repair_item": "电池",
    "quality": "standard",
    "price": 12,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-669",
    "brand": "LENOVO",
    "model": "G505S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-670",
    "brand": "LENOVO",
    "model": "IDEAPAD S145 15API",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-671",
    "brand": "LENOVO",
    "model": "LENOVO TAB M10 FHD PLUS DISPLAY",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-672",
    "brand": "LENOVO",
    "model": "LENOVO X104",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-673",
    "brand": "LENOVO",
    "model": "LENOVO YOGA 520-14IKB (80X8)",
    "repair_item": "电池",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-674",
    "brand": "LENOVO",
    "model": "LENOVO YOGA 520-14IKB (80X8)",
    "repair_item": "RAM 16GB",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-675",
    "brand": "LENOVO",
    "model": "M10 FHD PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-676",
    "brand": "LENOVO",
    "model": "P11",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-677",
    "brand": "LENOVO",
    "model": "P11 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-678",
    "brand": "LENOVO",
    "model": "TAB M10",
    "repair_item": "解锁（3把坏的手机换）",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-679",
    "brand": "LENOVO",
    "model": "TAB X304F",
    "repair_item": "刷机",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-680",
    "brand": "LENOVO",
    "model": "TAB X505",
    "repair_item": "POWER BUTTON NO FUNZIONA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-681",
    "brand": "LENOVO",
    "model": "TABLET",
    "repair_item": "主板",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-682",
    "brand": "LENOVO",
    "model": "TB330XU",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 115,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-683",
    "brand": "LENOVO",
    "model": "TB 8505XS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-684",
    "brand": "LENOVO",
    "model": "THINKPAD 490S",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-685",
    "brand": "LENOVO",
    "model": "THINKPAD 490S",
    "repair_item": "SISTEMA",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-686",
    "brand": "LG",
    "model": "BL-T37",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-687",
    "brand": "LG",
    "model": "K11",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-688",
    "brand": "LG",
    "model": "K22",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-689",
    "brand": "LG",
    "model": "K22",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-690",
    "brand": "LG",
    "model": "K30",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-691",
    "brand": "LG",
    "model": "K40",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-692",
    "brand": "LG",
    "model": "K42",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-693",
    "brand": "LG",
    "model": "K52",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-694",
    "brand": "MAJESTIC",
    "model": "714 TAB",
    "repair_item": "touch",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-695",
    "brand": "MAJESTIC",
    "model": "747",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-696",
    "brand": "MAJESTIC",
    "model": "916 4G",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-697",
    "brand": "MAJESTIC",
    "model": "M-SP1AZ3L",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-698",
    "brand": "MAJESTIC",
    "model": "MAJESTIC TAB 714",
    "repair_item": "不充电，换电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-699",
    "brand": "MEDIACOM",
    "model": "M-SP1AZ2TW",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-700",
    "brand": "MEDIACOM",
    "model": "M-SP1AZ3L",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-701",
    "brand": "MEDIACOM",
    "model": "M-SP1AZ3L",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-702",
    "brand": "MEDIACOM",
    "model": "M-SP1AZ3L2",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-703",
    "brand": "MEDIACOM",
    "model": "M-SP1AZ46",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-704",
    "brand": "MEDIACOM",
    "model": "M-SP1X10",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-705",
    "brand": "MEDIACOM",
    "model": "MSP1AZ3",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-706",
    "brand": "MEDIACOM",
    "model": "TAB",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-707",
    "brand": "MEDIACOM",
    "model": "TABLET",
    "repair_item": "主板",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-708",
    "brand": "MEIZU",
    "model": "MEIZU 5C",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-709",
    "brand": "MOTOROLA",
    "model": "E7I POWER",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-710",
    "brand": "MOTOROLA",
    "model": "E7 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-711",
    "brand": "MOTOROLA",
    "model": "E7 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-712",
    "brand": "MOTOROLA",
    "model": "E7 POWER",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-713",
    "brand": "MOTOROLA",
    "model": "E7 POWER",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-714",
    "brand": "MOTOROLA",
    "model": "E13",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-715",
    "brand": "MOTOROLA",
    "model": "E13",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-716",
    "brand": "MOTOROLA",
    "model": "E13",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-717",
    "brand": "MOTOROLA",
    "model": "E13",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-718",
    "brand": "MOTOROLA",
    "model": "E14",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-719",
    "brand": "MOTOROLA",
    "model": "E14",
    "repair_item": "COVER  透明",
    "quality": "standard",
    "price": 3,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-720",
    "brand": "MOTOROLA",
    "model": "E15",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-721",
    "brand": "MOTOROLA",
    "model": "E15",
    "repair_item": "NON CARICA 这边买的  手机变形了",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-722",
    "brand": "MOTOROLA",
    "model": "E20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-723",
    "brand": "MOTOROLA",
    "model": "E20",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-724",
    "brand": "MOTOROLA",
    "model": "E20",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-725",
    "brand": "MOTOROLA",
    "model": "E20",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-726",
    "brand": "MOTOROLA",
    "model": "E22I",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-727",
    "brand": "MOTOROLA",
    "model": "E32",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-728",
    "brand": "MOTOROLA",
    "model": "E32",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-729",
    "brand": "MOTOROLA",
    "model": "E32S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-730",
    "brand": "MOTOROLA",
    "model": "E32S",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-731",
    "brand": "MOTOROLA",
    "model": "EDGE 20",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-732",
    "brand": "MOTOROLA",
    "model": "EDGE 20 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-733",
    "brand": "MOTOROLA",
    "model": "EDGE 30 NEO",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-734",
    "brand": "MOTOROLA",
    "model": "EDGE 40",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-735",
    "brand": "MOTOROLA",
    "model": "EDGE 50 FUSION 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-736",
    "brand": "MOTOROLA",
    "model": "G04",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-737",
    "brand": "MOTOROLA",
    "model": "G04",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-738",
    "brand": "MOTOROLA",
    "model": "G9 PLAY",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-739",
    "brand": "MOTOROLA",
    "model": "G 9 POWER",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-740",
    "brand": "MOTOROLA",
    "model": "G10",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-741",
    "brand": "MOTOROLA",
    "model": "G13",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-742",
    "brand": "MOTOROLA",
    "model": "G13",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-743",
    "brand": "MOTOROLA",
    "model": "G14",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-744",
    "brand": "MOTOROLA",
    "model": "G14",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-745",
    "brand": "MOTOROLA",
    "model": "G20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-746",
    "brand": "MOTOROLA",
    "model": "G20",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-747",
    "brand": "MOTOROLA",
    "model": "G22",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-748",
    "brand": "MOTOROLA",
    "model": "G22",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-749",
    "brand": "MOTOROLA",
    "model": "G23",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-750",
    "brand": "MOTOROLA",
    "model": "G23",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-751",
    "brand": "MOTOROLA",
    "model": "G24",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-752",
    "brand": "MOTOROLA",
    "model": "G24",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-753",
    "brand": "MOTOROLA",
    "model": "G24",
    "repair_item": "DIS[LAY",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-754",
    "brand": "MOTOROLA",
    "model": "G31",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-755",
    "brand": "MOTOROLA",
    "model": "G32",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-756",
    "brand": "MOTOROLA",
    "model": "G32",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-757",
    "brand": "MOTOROLA",
    "model": "G32",
    "repair_item": "进不去系统 POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-758",
    "brand": "MOTOROLA",
    "model": "G32",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-759",
    "brand": "MOTOROLA",
    "model": "G32",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 6,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-760",
    "brand": "MOTOROLA",
    "model": "G34",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-761",
    "brand": "MOTOROLA",
    "model": "G34 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-762",
    "brand": "MOTOROLA",
    "model": "G35 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-763",
    "brand": "MOTOROLA",
    "model": "G35 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-764",
    "brand": "MOTOROLA",
    "model": "G42",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-765",
    "brand": "MOTOROLA",
    "model": "G42",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-766",
    "brand": "MOTOROLA",
    "model": "G53 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-767",
    "brand": "MOTOROLA",
    "model": "G54",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-768",
    "brand": "MOTOROLA",
    "model": "G54 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-769",
    "brand": "MOTOROLA",
    "model": "G55 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-770",
    "brand": "MOTOROLA",
    "model": "G62 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-771",
    "brand": "MOTOROLA",
    "model": "G84",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-772",
    "brand": "MOTOROLA",
    "model": "G84",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-773",
    "brand": "MOTOROLA",
    "model": "G84 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-774",
    "brand": "MOTOROLA",
    "model": "G84 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-775",
    "brand": "MOTOROLA",
    "model": "G84 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-776",
    "brand": "MOTOROLA",
    "model": "G85 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-777",
    "brand": "MOTOROLA",
    "model": "MACRO ONE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-778",
    "brand": "MOTOROLA",
    "model": "MOTO G42",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-779",
    "brand": "MOTOROLA",
    "model": "MOTOROLA E13",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-780",
    "brand": "MOTOROLA",
    "model": "MOTOROLA EDGE 50 FUSION",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-781",
    "brand": "MOTOROLA",
    "model": "MOTOROLA G32",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-782",
    "brand": "MOTOROLA",
    "model": "MOTOROLAG 5G",
    "repair_item": "在意大利无法使用",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-783",
    "brand": "NINTENDO",
    "model": "NINTENDO SWITCH",
    "repair_item": "CONNETTRORE GAME",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-784",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-785",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "右 BUTTON Lr",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-786",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "左摇杆",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-787",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "ANALOGICO",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-788",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "ANALOGICO WHATSAPP",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-789",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "BUTTON R NON FUNZIONA",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-790",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "JOYSTICK",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-791",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "joystick zuo",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-792",
    "brand": "NINTENDO",
    "model": "SWITCH",
    "repair_item": "NON LEGGE SCHEDA SD",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-793",
    "brand": "NINTENDO",
    "model": "SWITCH LCD",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-794",
    "brand": "NINTENDO",
    "model": "SWITCH LCD",
    "repair_item": "TOUCH SCREEN",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-795",
    "brand": "NINTENDO",
    "model": "SWITCH LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-796",
    "brand": "NINTENDO",
    "model": "SWITCH LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-797",
    "brand": "NINTENDO",
    "model": "SWITCH LITE",
    "repair_item": "BUTTON R",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-798",
    "brand": "NINTENDO",
    "model": "SWITCH OLED",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-799",
    "brand": "NOKIA",
    "model": "NOKIA 4.2",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-800",
    "brand": "NOKIA",
    "model": "NOKIA 5",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-801",
    "brand": "NOKIA",
    "model": "TA",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-802",
    "brand": "NOKIA",
    "model": "TA",
    "repair_item": "电池+胶",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-803",
    "brand": "NOKIA",
    "model": "TA-1095",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-804",
    "brand": "NOKIA",
    "model": "X20",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-805",
    "brand": "NVIDIA",
    "model": "SHIELD",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-806",
    "brand": "ONE PLUS",
    "model": "8T",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-807",
    "brand": "ONE PLUS",
    "model": "NORD 2T",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-808",
    "brand": "ONE PLUS",
    "model": "NORD 2T 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-809",
    "brand": "ONE PLUS",
    "model": "ONE PLUS 7",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-810",
    "brand": "ONE PLUS",
    "model": "ONE PLUS NORD CE 2 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-811",
    "brand": "OPPO",
    "model": "Unknown",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-812",
    "brand": "OPPO",
    "model": "Unknown",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-813",
    "brand": "OPPO",
    "model": "Unknown",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-814",
    "brand": "OPPO",
    "model": "Unknown",
    "repair_item": "NO ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-815",
    "brand": "OPPO",
    "model": "Unknown",
    "repair_item": "VETRO DIETRO",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-816",
    "brand": "OPPO",
    "model": "A3",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-817",
    "brand": "OPPO",
    "model": "A3 PRO 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-818",
    "brand": "OPPO",
    "model": "A9 2020",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-819",
    "brand": "OPPO",
    "model": "A9 2020",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-820",
    "brand": "OPPO",
    "model": "A9 2020",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-821",
    "brand": "OPPO",
    "model": "A9 2020",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-822",
    "brand": "OPPO",
    "model": "A15",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-823",
    "brand": "OPPO",
    "model": "A15",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-824",
    "brand": "OPPO",
    "model": "A15",
    "repair_item": "前摄",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-825",
    "brand": "OPPO",
    "model": "A15",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-826",
    "brand": "OPPO",
    "model": "A15",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-827",
    "brand": "OPPO",
    "model": "A15 2020",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-828",
    "brand": "OPPO",
    "model": "A16",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-829",
    "brand": "OPPO",
    "model": "A16",
    "repair_item": "DIPLAY",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-830",
    "brand": "OPPO",
    "model": "A16S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-831",
    "brand": "OPPO",
    "model": "A16S",
    "repair_item": "解锁，小孩的 ，别人取走",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-832",
    "brand": "OPPO",
    "model": "A16S",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-833",
    "brand": "OPPO",
    "model": "A16S",
    "repair_item": "VOLUME BUTTON",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-834",
    "brand": "OPPO",
    "model": "A17",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-835",
    "brand": "OPPO",
    "model": "A17",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-836",
    "brand": "OPPO",
    "model": "A18",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-837",
    "brand": "OPPO",
    "model": "A18",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-838",
    "brand": "OPPO",
    "model": "A38",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-839",
    "brand": "OPPO",
    "model": "A38",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-840",
    "brand": "OPPO",
    "model": "A40",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-841",
    "brand": "OPPO",
    "model": "A40",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-842",
    "brand": "OPPO",
    "model": "A54S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-843",
    "brand": "OPPO",
    "model": "A60",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-844",
    "brand": "OPPO",
    "model": "A60",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-845",
    "brand": "OPPO",
    "model": "A72",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-846",
    "brand": "OPPO",
    "model": "A72",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-847",
    "brand": "OPPO",
    "model": "A72 CPH 2067",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-848",
    "brand": "OPPO",
    "model": "A73 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-849",
    "brand": "OPPO",
    "model": "A74",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-850",
    "brand": "OPPO",
    "model": "A74",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-851",
    "brand": "OPPO",
    "model": "A74",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-852",
    "brand": "OPPO",
    "model": "A74",
    "repair_item": "POWER BUTTON 外面的",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-853",
    "brand": "OPPO",
    "model": "A74",
    "repair_item": "PWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-854",
    "brand": "OPPO",
    "model": "A74 4G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-855",
    "brand": "OPPO",
    "model": "A74 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-856",
    "brand": "OPPO",
    "model": "A74 4G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-857",
    "brand": "OPPO",
    "model": "A74 4G",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-858",
    "brand": "OPPO",
    "model": "A74 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-859",
    "brand": "OPPO",
    "model": "A74 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-860",
    "brand": "OPPO",
    "model": "A74 5G",
    "repair_item": "VOLUME BUTTON",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-861",
    "brand": "OPPO",
    "model": "A77",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-862",
    "brand": "OPPO",
    "model": "A77",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-863",
    "brand": "OPPO",
    "model": "A77 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-864",
    "brand": "OPPO",
    "model": "A77 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-865",
    "brand": "OPPO",
    "model": "A77 5G",
    "repair_item": "主板",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-866",
    "brand": "OPPO",
    "model": "A78",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-867",
    "brand": "OPPO",
    "model": "A78",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-868",
    "brand": "OPPO",
    "model": "A78 4G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-869",
    "brand": "OPPO",
    "model": "A78 4G",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-870",
    "brand": "OPPO",
    "model": "A78 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-871",
    "brand": "OPPO",
    "model": "A78 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-872",
    "brand": "OPPO",
    "model": "A78 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-873",
    "brand": "OPPO",
    "model": "A78 5G",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-874",
    "brand": "OPPO",
    "model": "A79 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-875",
    "brand": "OPPO",
    "model": "A80 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-876",
    "brand": "OPPO",
    "model": "A94",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-877",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-878",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-879",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-880",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-881",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "DISP[LAY COMP",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-882",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "NON FUNZIONA TASTO POWER",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-883",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-884",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "POWER BUTTON DENTRO",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-885",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-886",
    "brand": "OPPO",
    "model": "A94 5G",
    "repair_item": "volume tasto",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-887",
    "brand": "OPPO",
    "model": "A96",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-888",
    "brand": "OPPO",
    "model": "A96",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-889",
    "brand": "OPPO",
    "model": "A96",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-890",
    "brand": "OPPO",
    "model": "A96",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-891",
    "brand": "OPPO",
    "model": "A96",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-892",
    "brand": "OPPO",
    "model": "A96 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-893",
    "brand": "OPPO",
    "model": "A96 4G",
    "repair_item": "电池 不冲电 TASI TO VOLUME  POWER PUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-894",
    "brand": "OPPO",
    "model": "A96 5G",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-895",
    "brand": "OPPO",
    "model": "A98 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-896",
    "brand": "OPPO",
    "model": "BLP805",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-897",
    "brand": "OPPO",
    "model": "BLP 923",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-898",
    "brand": "OPPO",
    "model": "CPH2483",
    "repair_item": "触摸没用",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-899",
    "brand": "OPPO",
    "model": "FIND N2 FLIP",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-900",
    "brand": "OPPO",
    "model": "FIND N2 FLIP 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-901",
    "brand": "OPPO",
    "model": "FIND X3 LITE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-902",
    "brand": "OPPO",
    "model": "FIND X3 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-903",
    "brand": "OPPO",
    "model": "FIND X3 LITE",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-904",
    "brand": "OPPO",
    "model": "FIND X3 LITE 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-905",
    "brand": "OPPO",
    "model": "FIND X3 LITE CPH2145",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-906",
    "brand": "OPPO",
    "model": "FIND X3 NEO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 230,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-907",
    "brand": "OPPO",
    "model": "FIND X3 NEO",
    "repair_item": "SENSORE PROXYMITA",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-908",
    "brand": "OPPO",
    "model": "FIND X3 NEO",
    "repair_item": "VETRO DIETRO",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-909",
    "brand": "OPPO",
    "model": "FIND X3 PRO",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 280,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-910",
    "brand": "OPPO",
    "model": "FIND X3 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-911",
    "brand": "OPPO",
    "model": "FIND X3 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-912",
    "brand": "OPPO",
    "model": "FIND X5 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-913",
    "brand": "OPPO",
    "model": "FIND X5 LITE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-914",
    "brand": "OPPO",
    "model": "RENO 2Z",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-915",
    "brand": "OPPO",
    "model": "RENO 2Z",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-916",
    "brand": "OPPO",
    "model": "RENO 2Z",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-917",
    "brand": "OPPO",
    "model": "RENO 4 PRO 5G",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 11,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-918",
    "brand": "OPPO",
    "model": "RENO 4Z",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-919",
    "brand": "OPPO",
    "model": "RENO 4Z",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-920",
    "brand": "OPPO",
    "model": "RENO 4Z",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-921",
    "brand": "OPPO",
    "model": "RENO 4Z",
    "repair_item": "不显示",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-922",
    "brand": "OPPO",
    "model": "RENO 4Z",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-923",
    "brand": "OPPO",
    "model": "RENO 4Z 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-924",
    "brand": "OPPO",
    "model": "RENO 4Z 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-925",
    "brand": "OPPO",
    "model": "RENO 5 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-926",
    "brand": "OPPO",
    "model": "RENO 5 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-927",
    "brand": "OPPO",
    "model": "RENO 6",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-928",
    "brand": "OPPO",
    "model": "RENO 6 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-929",
    "brand": "OPPO",
    "model": "RENO 6 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-930",
    "brand": "OPPO",
    "model": "RENO 6 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-931",
    "brand": "OPPO",
    "model": "RENO 6 PRO",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-932",
    "brand": "OPPO",
    "model": "RENO 6 PRO",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-933",
    "brand": "OPPO",
    "model": "RENO 6 PRO",
    "repair_item": "COVER A LIBRO BLU",
    "quality": "standard",
    "price": 3,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-934",
    "brand": "OPPO",
    "model": "RENO 6 PRO 2247",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-935",
    "brand": "OPPO",
    "model": "RENO 6 PRO 5G",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-936",
    "brand": "OPPO",
    "model": "RENO 6 PRO 5G CPH 2247",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-937",
    "brand": "OPPO",
    "model": "RENO 7 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-938",
    "brand": "OPPO",
    "model": "RENO 7 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-939",
    "brand": "OPPO",
    "model": "RENO 7Z",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-940",
    "brand": "OPPO",
    "model": "RENO 7Z 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-941",
    "brand": "OPPO",
    "model": "RENO 7Z 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-942",
    "brand": "OPPO",
    "model": "RENO 8",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-943",
    "brand": "OPPO",
    "model": "RENO 8 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-944",
    "brand": "OPPO",
    "model": "RENO8 LITE 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-945",
    "brand": "OPPO",
    "model": "RENO 8 PRO",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-946",
    "brand": "OPPO",
    "model": "RENO 10 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-947",
    "brand": "OPPO",
    "model": "RENO 10 PRO 5G CPH 2525",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-948",
    "brand": "OPPO",
    "model": "RENO11F 5G",
    "repair_item": "NO ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-949",
    "brand": "OPPO",
    "model": "RENO 12F",
    "repair_item": "COVER TRASPARENTE",
    "quality": "standard",
    "price": 3,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-950",
    "brand": "OPPO",
    "model": "RENO 12 FS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-951",
    "brand": "OPPO",
    "model": "RENO 12 PRO 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-952",
    "brand": "OPPO",
    "model": "X3 NEO",
    "repair_item": "BATTEIRA ORI 换上去没用电池停在百分之一",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-953",
    "brand": "OPPO",
    "model": "X3 NEO 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-954",
    "brand": "OUKITEL",
    "model": "C53",
    "repair_item": "主板烧 修不起来 进水检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-955",
    "brand": "OUKITEL",
    "model": "G2",
    "repair_item": "VETRO PROTETTIVO",
    "quality": "standard",
    "price": 13,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-956",
    "brand": "OUKITEL",
    "model": "OUKITEL WP5 PRO",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-957",
    "brand": "OUKITEL",
    "model": "WP18",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-958",
    "brand": "OUKITEL",
    "model": "WP 23 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-959",
    "brand": "PC",
    "model": "\\",
    "repair_item": "主板",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-960",
    "brand": "PC",
    "model": "15 DW 1057NL",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-961",
    "brand": "PC",
    "model": "15-CS0991NL",
    "repair_item": "电池",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-962",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-963",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "有时可以开机有时不能开机 换电池 2032",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-964",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "清理灰尘",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-965",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "无网络+安装打印机驱动+安装杀毒软件。电脑密码去掉，Giovanna",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-966",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "主板",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-967",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "ASPIRE M3  MA50 ,CAMBIO DISCO 500GB 20 +SISTEMA WIN10 ,30",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-968",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "CAMBIAMENTO SSD 480GB + DATI",
    "quality": "standard",
    "price": 115,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-969",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "PC FISSO ACER SSD 480GB + WIN 10 PRO",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-970",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "SISTEMA WIN 10 PRO",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-971",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "SSD 480GB + WIN10 PRO + DATI",
    "quality": "standard",
    "price": 115,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-972",
    "brand": "PC",
    "model": "ACER",
    "repair_item": "WIN8 解锁",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-973",
    "brand": "PC",
    "model": "ACER 5738",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-974",
    "brand": "PC",
    "model": "ACER ASPIRE 3 A315-23",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-975",
    "brand": "PC",
    "model": "ACER ASPIRE 3 N19C1",
    "repair_item": "电池",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-976",
    "brand": "PC",
    "model": "ACER ASPIRE 5551G",
    "repair_item": "SSD 240 + WINDOWS 10 PRO",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-977",
    "brand": "PC",
    "model": "ACER ASPIRE 5738",
    "repair_item": "TASTIERA",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-978",
    "brand": "PC",
    "model": "ACER ASPIRE A515",
    "repair_item": "电池",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-979",
    "brand": "PC",
    "model": "ACER ASPIRE E1 522",
    "repair_item": "SSD + WIN 10",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-980",
    "brand": "PC",
    "model": "ACER ASPIRE E1 V5WE2",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-981",
    "brand": "PC",
    "model": "ACER ASPIRE N19H1",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-982",
    "brand": "PC",
    "model": "ACER ASPIRE N23C3",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-983",
    "brand": "PC",
    "model": "ACER E1-522",
    "repair_item": "ssd 240",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-984",
    "brand": "PC",
    "model": "ACER E5-573",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-985",
    "brand": "PC",
    "model": "ACER N20C1",
    "repair_item": "电池",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-986",
    "brand": "PC",
    "model": "ACER TPN C129",
    "repair_item": "TASTIERA",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-987",
    "brand": "PC",
    "model": "ASPIREE 15 START",
    "repair_item": "重装系统",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-988",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "不开机 可能电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-989",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-990",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "充电时不开机 ，拔掉充电器 可以开机 ， USB 不能用】",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-991",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "花屏 检查报价 品：12325803814",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-992",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-993",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "F505Z TASTO ACCENSIONE",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-994",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "FORMATTAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-995",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-996",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "SISTEMA + FORMATAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-997",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "SSD 256 + WIN 10 PRO",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-998",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "SSD 480GB + DATI",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-999",
    "brand": "PC",
    "model": "ASUS",
    "repair_item": "WIN 10 PRO 30 +  OFFICE 20",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1000",
    "brand": "PC",
    "model": "ASUS D509D",
    "repair_item": "office全家桶激活",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1001",
    "brand": "PC",
    "model": "ASUS E510M",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1002",
    "brand": "PC",
    "model": "ASUS F402N",
    "repair_item": "SSD 240",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1003",
    "brand": "PC",
    "model": "ASUS F415E",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1004",
    "brand": "PC",
    "model": "ASUS F505B",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1005",
    "brand": "PC",
    "model": "ASUS F556U",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1006",
    "brand": "PC",
    "model": "ASUS K50C",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1007",
    "brand": "PC",
    "model": "ASUS K52J",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1008",
    "brand": "PC",
    "model": "ASUS K55U",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1009",
    "brand": "PC",
    "model": "ASUS N580V",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1010",
    "brand": "PC",
    "model": "ASUS R512M",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1011",
    "brand": "PC",
    "model": "ASUS UX431F",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1012",
    "brand": "PC",
    "model": "ASUS X509J",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1013",
    "brand": "PC",
    "model": "ASUS X540S",
    "repair_item": "SISTEMA + RECUPERA DATI",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1014",
    "brand": "PC",
    "model": "ASUS X540S",
    "repair_item": "SSD 1TB + WIN 10 PRO + DATI",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1015",
    "brand": "PC",
    "model": "B450 AORUS",
    "repair_item": "SCHEDAMADRE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1016",
    "brand": "PC",
    "model": "CHROME BOOK",
    "repair_item": "FORMATTAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1017",
    "brand": "PC",
    "model": "CHUWI",
    "repair_item": "NON ACCENDE SCHEDAMADRE 80 -120",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1018",
    "brand": "PC",
    "model": "COMPAQ",
    "repair_item": "重装系统",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1019",
    "brand": "PC",
    "model": "DELL",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1020",
    "brand": "PC",
    "model": "EMACHINE E732",
    "repair_item": "TASTIERA",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1021",
    "brand": "PC",
    "model": "EMACHINES",
    "repair_item": "DATI + 128GB",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1022",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "安装机箱",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1023",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "主板",
    "quality": "standard",
    "price": 220,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1024",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "INSTALLAZIONE SISTEMA WINDOWS 11 PRO",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1025",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "NON ENTRA SISTEMA , SI BLOCCA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1026",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "SCHEDAMADRE",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1027",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "SISTEMA + DATI PIN:CALOGERO",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1028",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "sistema WIN 11",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1029",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "SISTEMA WINDOWS - + DATI",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1030",
    "brand": "PC",
    "model": "FISSO",
    "repair_item": "SSD 500GB + WIN 11 PRO",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1031",
    "brand": "PC",
    "model": "G50 45",
    "repair_item": "电池",
    "quality": "standard",
    "price": 115,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1032",
    "brand": "PC",
    "model": "G50 45",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1033",
    "brand": "PC",
    "model": "HP",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1034",
    "brand": "PC",
    "model": "HP",
    "repair_item": "电池",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1035",
    "brand": "PC",
    "model": "HP",
    "repair_item": "刷机win 10",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1036",
    "brand": "PC",
    "model": "HP",
    "repair_item": "主板",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1037",
    "brand": "PC",
    "model": "HP",
    "repair_item": "DISTEMA + SSD 480",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1038",
    "brand": "PC",
    "model": "HP",
    "repair_item": "RAM 4GB 40 + WIND10 PRO + SSD 250GB 30 + LETTORE 15 + USB 4/1 5",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1039",
    "brand": "PC",
    "model": "HP",
    "repair_item": "SSD 240GB + DATI",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1040",
    "brand": "PC",
    "model": "HP",
    "repair_item": "WINDOWS 11 PRO",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1041",
    "brand": "PC",
    "model": "HP",
    "repair_item": "ZENBOOK 14 U G6 NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1042",
    "brand": "PC",
    "model": "HP CHROMEBOOK 11 G4",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1043",
    "brand": "PC",
    "model": "HP DV6 1120 EL",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1044",
    "brand": "PC",
    "model": "HP DV6-3140SL",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1045",
    "brand": "PC",
    "model": "HP ELITE BOOK",
    "repair_item": "SSD 240 + SISTEMA DATI",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1046",
    "brand": "PC",
    "model": "HP HP 15-BS010NL",
    "repair_item": "TASTIERA",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1047",
    "brand": "PC",
    "model": "HP IDEAPAD3 TASTIERA 15IML05",
    "repair_item": "TASTIERA",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1048",
    "brand": "PC",
    "model": "HP LAPTOP 15",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1049",
    "brand": "PC",
    "model": "HP PAVILION 15 3168NGW",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1050",
    "brand": "PC",
    "model": "HP TPN - C139",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1051",
    "brand": "PC",
    "model": "HP TPN C125",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1052",
    "brand": "PC",
    "model": "HP TPN C129",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1053",
    "brand": "PC",
    "model": "HP TPN Q222",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1054",
    "brand": "PC",
    "model": "HP TPN-139",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1055",
    "brand": "PC",
    "model": "HP 14 DY0010NL",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 280,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1056",
    "brand": "PC",
    "model": "HP 15S FQ2089NL DISPLAY",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1057",
    "brand": "PC",
    "model": "HP 250 G7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1058",
    "brand": "PC",
    "model": "HP 450 G1",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1059",
    "brand": "PC",
    "model": "HP 450 G1",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1060",
    "brand": "PC",
    "model": "HP 510",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1061",
    "brand": "PC",
    "model": "HP 6730S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1062",
    "brand": "PC",
    "model": "HUAWEI IBOH-WAQ9R",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1063",
    "brand": "PC",
    "model": "IDEA PAD 15ALC6",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1064",
    "brand": "PC",
    "model": "IDEAPAD FLEX 5 TASTIERE 14IIL05",
    "repair_item": "TASTIERE PIN:2712",
    "quality": "standard",
    "price": 105,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1065",
    "brand": "PC",
    "model": "LEGION",
    "repair_item": "WIN 11 + OFFICE",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1066",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "保资料刷机+240ssd",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1067",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "不开机 不充电",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1068",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "买新电脑",
    "quality": "standard",
    "price": 430,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1069",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "ATTIVAZIONE OFFICE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1070",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "SISTEMA WIN 10",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1071",
    "brand": "PC",
    "model": "LENOVO",
    "repair_item": "SSD 256 + DATI",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1072",
    "brand": "PC",
    "model": "LENOVO C82C7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1073",
    "brand": "PC",
    "model": "LENOVO IDEAPAD 3 15ITL6",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1074",
    "brand": "PC",
    "model": "LENOVO THINK PAD",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1075",
    "brand": "PC",
    "model": "LENOVO V15 ADA",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1076",
    "brand": "PC",
    "model": "LENOVO V15 DA",
    "repair_item": "SSD 240GB + WIN 11",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1077",
    "brand": "PC",
    "model": "LENOVO 15ALC6",
    "repair_item": "COVER",
    "quality": "standard",
    "price": 135,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1078",
    "brand": "PC",
    "model": "MEDIACOM",
    "repair_item": "AUDIO DRIVER",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1079",
    "brand": "PC",
    "model": "MEDIACOM",
    "repair_item": "SISTEMA WINDOWS 10 PRO",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1080",
    "brand": "PC",
    "model": "MICROTECH",
    "repair_item": "COREBOOK INSTALLAZIONE SISTEMA WIN 11",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1081",
    "brand": "PC",
    "model": "MINI PC NIPOGI",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1082",
    "brand": "PC",
    "model": "MSI",
    "repair_item": "PULIZIONE + INSTALLAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1083",
    "brand": "PC",
    "model": "SAMSUNG",
    "repair_item": "DATI + SISTEMA",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1084",
    "brand": "PC",
    "model": "SAMSUNG",
    "repair_item": "WIN 10 + 保资料",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1085",
    "brand": "PC",
    "model": "SONY",
    "repair_item": "ssd 500 + 保资料升级win11",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1086",
    "brand": "PC",
    "model": "TABLET PC ASUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1087",
    "brand": "PC",
    "model": "TASTIERA ACER ASPIRE A3 A315",
    "repair_item": "TASTIERE",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1088",
    "brand": "PC",
    "model": "TECLAST F15 PLUS 2",
    "repair_item": "电池",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1089",
    "brand": "PC",
    "model": "TOSHIBA L850 1PD",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1090",
    "brand": "PC",
    "model": "TOSHIBA PORTEGE Z30-B",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1091",
    "brand": "PC",
    "model": "TOSHIBA SATELLITE L50A 163",
    "repair_item": "电池",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1092",
    "brand": "PC",
    "model": "TOSHIBA SATELLITE L850",
    "repair_item": "sistema+ssd 500gb  70 + tastiera 30",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1093",
    "brand": "PC",
    "model": "TOSHIBA SATELLITE L850",
    "repair_item": "TASTIERE + SISTEMA",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1094",
    "brand": "PC",
    "model": "TPN C151",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1095",
    "brand": "PC",
    "model": "VAIO",
    "repair_item": "升级最新系统",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1096",
    "brand": "POCO",
    "model": "M3 PRO 5G",
    "repair_item": "POWER BUTTON 可能退货 他的好了",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1097",
    "brand": "POCO",
    "model": "X3",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1098",
    "brand": "POCO",
    "model": "X3 PRO",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1099",
    "brand": "POCO",
    "model": "X3 PRO",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1100",
    "brand": "PS4",
    "model": "手柄",
    "repair_item": "analogico x2",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1101",
    "brand": "PS4",
    "model": "CONTROLLER",
    "repair_item": "ANALOGICO",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1102",
    "brand": "PS4",
    "model": "LETTORE CD NON FUNZIONA",
    "repair_item": "LETTORE CD NON FUNZIONA",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1103",
    "brand": "PS4",
    "model": "PS4",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 75,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1104",
    "brand": "PS4",
    "model": "PS4",
    "repair_item": "DISCO NON LEGGE",
    "quality": "standard",
    "price": 65,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1105",
    "brand": "PS5",
    "model": "CONTROLLER",
    "repair_item": "ANALOGICO",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1106",
    "brand": "PS5",
    "model": "JOYSTIC",
    "repair_item": "买手柄 已付50",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1107",
    "brand": "PS5",
    "model": "JOYSTIC",
    "repair_item": "修手柄 L1+L2+ANALOGICO X2",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1108",
    "brand": "PS5",
    "model": "JOYSTICK",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1109",
    "brand": "PS5",
    "model": "JOYSTICK",
    "repair_item": "ANALOGICO",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1110",
    "brand": "PS5",
    "model": "JOYSTICK",
    "repair_item": "ANALOGICO X2",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1111",
    "brand": "PS5",
    "model": "PS5",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1112",
    "brand": "PS5",
    "model": "PS5",
    "repair_item": "ALIMENTATORE 130+ 20 PASTA",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1113",
    "brand": "PS5",
    "model": "PS5",
    "repair_item": "HDMI NO FUNZIONA",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1114",
    "brand": "PS5",
    "model": "PS5 CONTROLLER",
    "repair_item": "ANALOGICO",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1115",
    "brand": "REALME",
    "model": "10",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1116",
    "brand": "REALME",
    "model": "10 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1117",
    "brand": "REALME",
    "model": "10 4G",
    "repair_item": "框",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1118",
    "brand": "REALME",
    "model": "10 4G",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1119",
    "brand": "REALME",
    "model": "11 PRO PLUS",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1120",
    "brand": "REALME",
    "model": "11 PRO PLUS 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 160,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1121",
    "brand": "REALME",
    "model": "12",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1122",
    "brand": "REALME",
    "model": "12",
    "repair_item": "进水不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1123",
    "brand": "REALME",
    "model": "12 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1124",
    "brand": "REALME",
    "model": "12 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1125",
    "brand": "REALME",
    "model": "12X",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1126",
    "brand": "REALME",
    "model": "12X 5G",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1127",
    "brand": "REALME",
    "model": "14X",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1128",
    "brand": "REALME",
    "model": "6",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1129",
    "brand": "REALME",
    "model": "7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1130",
    "brand": "REALME",
    "model": "8",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1131",
    "brand": "REALME",
    "model": "8",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1132",
    "brand": "REALME",
    "model": "8I",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1133",
    "brand": "REALME",
    "model": "9 PRO 5G",
    "repair_item": "ALTO PARLANTE",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1134",
    "brand": "REALME",
    "model": "C11",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1135",
    "brand": "REALME",
    "model": "C11",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1136",
    "brand": "REALME",
    "model": "C11",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1137",
    "brand": "REALME",
    "model": "C11 2021",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1138",
    "brand": "REALME",
    "model": "C11 2021",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1139",
    "brand": "REALME",
    "model": "C11 2021",
    "repair_item": "RINGER",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1140",
    "brand": "REALME",
    "model": "C21Y",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1141",
    "brand": "REALME",
    "model": "C21Y",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1142",
    "brand": "REALME",
    "model": "C21Y",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1143",
    "brand": "REALME",
    "model": "C21Y",
    "repair_item": "POWER BUTTOM",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1144",
    "brand": "REALME",
    "model": "C21Y",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1145",
    "brand": "REALME",
    "model": "C25Y",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1146",
    "brand": "REALME",
    "model": "C25Y",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1147",
    "brand": "REALME",
    "model": "C25Y",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1148",
    "brand": "REALME",
    "model": "C25Y",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1149",
    "brand": "REALME",
    "model": "C25Y",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1150",
    "brand": "REALME",
    "model": "C30",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1151",
    "brand": "REALME",
    "model": "C30",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1152",
    "brand": "REALME",
    "model": "C30",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1153",
    "brand": "REALME",
    "model": "C31",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1154",
    "brand": "REALME",
    "model": "C33",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1155",
    "brand": "REALME",
    "model": "C35",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1156",
    "brand": "REALME",
    "model": "C51",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1157",
    "brand": "REALME",
    "model": "C51",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1158",
    "brand": "REALME",
    "model": "C53",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1159",
    "brand": "REALME",
    "model": "C53",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1160",
    "brand": "REALME",
    "model": "C63",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1161",
    "brand": "REALME",
    "model": "C67",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1162",
    "brand": "REALME",
    "model": "GT MASTER",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1163",
    "brand": "REALME",
    "model": "GT MASTER",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1164",
    "brand": "REALME",
    "model": "GT NEO 2",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1165",
    "brand": "REALME",
    "model": "GT NEO 2 5G",
    "repair_item": "POWER BUTTON 外面的",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1166",
    "brand": "REALME",
    "model": "GT 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 150,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1167",
    "brand": "REALME",
    "model": "GT 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1168",
    "brand": "REALME",
    "model": "NARZO 30 5G",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1169",
    "brand": "REALME",
    "model": "NARZO 50A PRIME",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1170",
    "brand": "REALME",
    "model": "NOTE 50",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1171",
    "brand": "REALME",
    "model": "NOTE 50",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1172",
    "brand": "REALME",
    "model": "NOTE 50",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1173",
    "brand": "REALME",
    "model": "NOTE 50",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1174",
    "brand": "REALME",
    "model": "NOTE 60",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1175",
    "brand": "REALME",
    "model": "RMP2103",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1176",
    "brand": "REALME",
    "model": "RMX 3231 C11 2021",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1177",
    "brand": "REALME",
    "model": "T GYHU",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1178",
    "brand": "REALME",
    "model": "X2",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1179",
    "brand": "SAMSUNG",
    "model": "Unknown",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1180",
    "brand": "SAMSUNG",
    "model": "Unknown",
    "repair_item": "WINDOWS 10",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1181",
    "brand": "SAMSUNG",
    "model": "12",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1182",
    "brand": "SAMSUNG",
    "model": "135",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1183",
    "brand": "SAMSUNG",
    "model": "A02S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1184",
    "brand": "SAMSUNG",
    "model": "A02S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1185",
    "brand": "SAMSUNG",
    "model": "A02S 163MM",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1186",
    "brand": "SAMSUNG",
    "model": "A03",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1187",
    "brand": "SAMSUNG",
    "model": "A03",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1188",
    "brand": "SAMSUNG",
    "model": "A03",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1189",
    "brand": "SAMSUNG",
    "model": "A3",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1190",
    "brand": "SAMSUNG",
    "model": "A03S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1191",
    "brand": "SAMSUNG",
    "model": "A03S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1192",
    "brand": "SAMSUNG",
    "model": "A03S",
    "repair_item": "ALTO PARLANTE NO FUNZIONA",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1193",
    "brand": "SAMSUNG",
    "model": "A04S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1194",
    "brand": "SAMSUNG",
    "model": "A04S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1195",
    "brand": "SAMSUNG",
    "model": "A5 2017",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1196",
    "brand": "SAMSUNG",
    "model": "A5 2017",
    "repair_item": "电池",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1197",
    "brand": "SAMSUNG",
    "model": "A5 2020",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1198",
    "brand": "SAMSUNG",
    "model": "A5 2020",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1199",
    "brand": "SAMSUNG",
    "model": "A5 2020",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1200",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1201",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1202",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1203",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1204",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1205",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1206",
    "brand": "SAMSUNG",
    "model": "A05S",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 10,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1207",
    "brand": "SAMSUNG",
    "model": "A6",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1208",
    "brand": "SAMSUNG",
    "model": "A6 PLUS",
    "repair_item": "SBLOCCARE",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1209",
    "brand": "SAMSUNG",
    "model": "A7",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1210",
    "brand": "SAMSUNG",
    "model": "A7",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1211",
    "brand": "SAMSUNG",
    "model": "A7 2018",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1212",
    "brand": "SAMSUNG",
    "model": "A7 2018",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1213",
    "brand": "SAMSUNG",
    "model": "A7 2018",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1214",
    "brand": "SAMSUNG",
    "model": "A7 2018",
    "repair_item": "connetore",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1215",
    "brand": "SAMSUNG",
    "model": "A7 2018",
    "repair_item": "IMPRONTE",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1216",
    "brand": "SAMSUNG",
    "model": "A7 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1217",
    "brand": "SAMSUNG",
    "model": "A8 2018",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1218",
    "brand": "SAMSUNG",
    "model": "A9 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1219",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1220",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1221",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1222",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1223",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1224",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1225",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1226",
    "brand": "SAMSUNG",
    "model": "A10",
    "repair_item": "alto parlante",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1227",
    "brand": "SAMSUNG",
    "model": "A10S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1228",
    "brand": "SAMSUNG",
    "model": "A11",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1229",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1230",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1231",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1232",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "留下来不读卡",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1233",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1234",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1235",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1236",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1237",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "AUDIO",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1238",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "no accende CPU 问题",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1239",
    "brand": "SAMSUNG",
    "model": "A12",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1240",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1241",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1242",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1243",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "解锁google",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1244",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "进水不开机检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1245",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "天线",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1246",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "USATO GARANZIA"
  },
  {
    "id": "repair-1247",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "DISPALY + DATI , PIN: 1234",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1248",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "IMPRONTE",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1249",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1250",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1251",
    "brand": "SAMSUNG",
    "model": "A13",
    "repair_item": "POWER BUTTON ,IMPRONTE",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1252",
    "brand": "SAMSUNG",
    "model": "A13 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1253",
    "brand": "SAMSUNG",
    "model": "A13 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1254",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1255",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1256",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1257",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "进水不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1258",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "进水机 NO",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1259",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "留下来检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1260",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1261",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1262",
    "brand": "SAMSUNG",
    "model": "A14",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1263",
    "brand": "SAMSUNG",
    "model": "A14 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1264",
    "brand": "SAMSUNG",
    "model": "A14 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1265",
    "brand": "SAMSUNG",
    "model": "A14 5G",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1266",
    "brand": "SAMSUNG",
    "model": "A14 5G",
    "repair_item": "DISLAY",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1267",
    "brand": "SAMSUNG",
    "model": "A14U",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1268",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1269",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1270",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1271",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1272",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "手机不开机有震动进过水洗过主板还是没用",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1273",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1274",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "sblocazione",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1275",
    "brand": "SAMSUNG",
    "model": "A15",
    "repair_item": "VETRO",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1276",
    "brand": "SAMSUNG",
    "model": "A15 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1277",
    "brand": "SAMSUNG",
    "model": "A15 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1278",
    "brand": "SAMSUNG",
    "model": "A15 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1279",
    "brand": "SAMSUNG",
    "model": "A16",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1280",
    "brand": "SAMSUNG",
    "model": "A16 4G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1281",
    "brand": "SAMSUNG",
    "model": "A16 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1282",
    "brand": "SAMSUNG",
    "model": "A16 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1283",
    "brand": "SAMSUNG",
    "model": "A16 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1284",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1285",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1286",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "解锁",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1287",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "刷机",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1288",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1289",
    "brand": "SAMSUNG",
    "model": "A20E",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1290",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1291",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1292",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "进水清洗",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1293",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1294",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1295",
    "brand": "SAMSUNG",
    "model": "A20S",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1296",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1297",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1298",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "进水不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1299",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "进水检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1300",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1301",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1302",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1303",
    "brand": "SAMSUNG",
    "model": "A21S",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1304",
    "brand": "SAMSUNG",
    "model": "A22",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1305",
    "brand": "SAMSUNG",
    "model": "A22",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1306",
    "brand": "SAMSUNG",
    "model": "A22",
    "repair_item": "主板不充电不修等他回来拿",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1307",
    "brand": "SAMSUNG",
    "model": "A22 4G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1308",
    "brand": "SAMSUNG",
    "model": "A22 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1309",
    "brand": "SAMSUNG",
    "model": "A22 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1310",
    "brand": "SAMSUNG",
    "model": "A22 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1311",
    "brand": "SAMSUNG",
    "model": "A22 5G",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1312",
    "brand": "SAMSUNG",
    "model": "A22 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1313",
    "brand": "SAMSUNG",
    "model": "A22 5G",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1314",
    "brand": "SAMSUNG",
    "model": "A23",
    "repair_item": "进水清理",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1315",
    "brand": "SAMSUNG",
    "model": "A23",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1316",
    "brand": "SAMSUNG",
    "model": "A23",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1317",
    "brand": "SAMSUNG",
    "model": "A23 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1318",
    "brand": "SAMSUNG",
    "model": "A25",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1319",
    "brand": "SAMSUNG",
    "model": "A25 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1320",
    "brand": "SAMSUNG",
    "model": "A25 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1321",
    "brand": "SAMSUNG",
    "model": "A025G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1322",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1323",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1324",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1325",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1326",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1327",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1328",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1329",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1330",
    "brand": "SAMSUNG",
    "model": "A30S",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1331",
    "brand": "SAMSUNG",
    "model": "A31",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1332",
    "brand": "SAMSUNG",
    "model": "A31",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1333",
    "brand": "SAMSUNG",
    "model": "A32",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1334",
    "brand": "SAMSUNG",
    "model": "A32",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1335",
    "brand": "SAMSUNG",
    "model": "A32",
    "repair_item": "电池满电会突然没电 变成 0 电池重新定",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1336",
    "brand": "SAMSUNG",
    "model": "A32",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1337",
    "brand": "SAMSUNG",
    "model": "A32",
    "repair_item": "power buton",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1338",
    "brand": "SAMSUNG",
    "model": "A32 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1339",
    "brand": "SAMSUNG",
    "model": "A32 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1340",
    "brand": "SAMSUNG",
    "model": "A33",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1341",
    "brand": "SAMSUNG",
    "model": "A33 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1342",
    "brand": "SAMSUNG",
    "model": "A33 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1343",
    "brand": "SAMSUNG",
    "model": "A33 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1344",
    "brand": "SAMSUNG",
    "model": "A34",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1345",
    "brand": "SAMSUNG",
    "model": "A34 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1346",
    "brand": "SAMSUNG",
    "model": "A34 5G",
    "repair_item": "不进系统 应该是电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1347",
    "brand": "SAMSUNG",
    "model": "A34 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1348",
    "brand": "SAMSUNG",
    "model": "A035",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1349",
    "brand": "SAMSUNG",
    "model": "A35",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1350",
    "brand": "SAMSUNG",
    "model": "A35 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1351",
    "brand": "SAMSUNG",
    "model": "A035G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1352",
    "brand": "SAMSUNG",
    "model": "A037",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1353",
    "brand": "SAMSUNG",
    "model": "A037G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1354",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1355",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1356",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1357",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1358",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1359",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "排线",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1360",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1361",
    "brand": "SAMSUNG",
    "model": "A40",
    "repair_item": "non accende",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1362",
    "brand": "SAMSUNG",
    "model": "A41",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1363",
    "brand": "SAMSUNG",
    "model": "A41",
    "repair_item": "不定时 黑屏 不开机 不充电",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1364",
    "brand": "SAMSUNG",
    "model": "A41",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1365",
    "brand": "SAMSUNG",
    "model": "A047",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1366",
    "brand": "SAMSUNG",
    "model": "A047",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1367",
    "brand": "SAMSUNG",
    "model": "A047",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1368",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1369",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1370",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1371",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1372",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1373",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "变形 无声音 换屏",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1374",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "留下来检查",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1375",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1376",
    "brand": "SAMSUNG",
    "model": "A50",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1377",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1378",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1379",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1380",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1381",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "不充电",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1382",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1383",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1384",
    "brand": "SAMSUNG",
    "model": "A51",
    "repair_item": "cover vetro bianco",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1385",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1386",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1387",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "不读卡",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1388",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1389",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "检查 ，NO CARICA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1390",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "开机卡logo",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1391",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "排线",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1392",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1393",
    "brand": "SAMSUNG",
    "model": "A52",
    "repair_item": "CONNETTOIRE",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1394",
    "brand": "SAMSUNG",
    "model": "A52 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1395",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1396",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1397",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1398",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1399",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1400",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1401",
    "brand": "SAMSUNG",
    "model": "A52S",
    "repair_item": "GOOGLE",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1402",
    "brand": "SAMSUNG",
    "model": "A53",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1403",
    "brand": "SAMSUNG",
    "model": "A53",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1404",
    "brand": "SAMSUNG",
    "model": "A53",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1405",
    "brand": "SAMSUNG",
    "model": "A53",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1406",
    "brand": "SAMSUNG",
    "model": "A53",
    "repair_item": "WIFI NO FUNZIONA",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1407",
    "brand": "SAMSUNG",
    "model": "A53 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1408",
    "brand": "SAMSUNG",
    "model": "A53 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1409",
    "brand": "SAMSUNG",
    "model": "A53 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1410",
    "brand": "SAMSUNG",
    "model": "A53 5G",
    "repair_item": "IMPRONTE NO FUNZIONA PIN : 2304",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1411",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1412",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1413",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1414",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1415",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1416",
    "brand": "SAMSUNG",
    "model": "A53S",
    "repair_item": "power button  里面20 外面15",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1417",
    "brand": "SAMSUNG",
    "model": "A54",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1418",
    "brand": "SAMSUNG",
    "model": "A54",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1419",
    "brand": "SAMSUNG",
    "model": "A54",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1420",
    "brand": "SAMSUNG",
    "model": "A54 5G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1421",
    "brand": "SAMSUNG",
    "model": "A54 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1422",
    "brand": "SAMSUNG",
    "model": "A54 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 85,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1423",
    "brand": "SAMSUNG",
    "model": "A54 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1424",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1425",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1426",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1427",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1428",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "玩游戏会卡屏 可能系统",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1429",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1430",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1431",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1432",
    "brand": "SAMSUNG",
    "model": "A54S",
    "repair_item": "VETRO CAMARA",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1433",
    "brand": "SAMSUNG",
    "model": "A055",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1434",
    "brand": "SAMSUNG",
    "model": "A55 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1435",
    "brand": "SAMSUNG",
    "model": "A55 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1436",
    "brand": "SAMSUNG",
    "model": "A057",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1437",
    "brand": "SAMSUNG",
    "model": "A57S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1438",
    "brand": "SAMSUNG",
    "model": "A57S",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1439",
    "brand": "SAMSUNG",
    "model": "A57S 4G",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1440",
    "brand": "SAMSUNG",
    "model": "A58",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1441",
    "brand": "SAMSUNG",
    "model": "A58",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1442",
    "brand": "SAMSUNG",
    "model": "A58 4G",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1443",
    "brand": "SAMSUNG",
    "model": "A58 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1444",
    "brand": "SAMSUNG",
    "model": "A58 4G",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1445",
    "brand": "SAMSUNG",
    "model": "A70",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1446",
    "brand": "SAMSUNG",
    "model": "A70",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 135,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1447",
    "brand": "SAMSUNG",
    "model": "A70",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1448",
    "brand": "SAMSUNG",
    "model": "A70",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1449",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1450",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1451",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1452",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1453",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1454",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1455",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1456",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1457",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "NON LEGGE SCHEDA",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1458",
    "brand": "SAMSUNG",
    "model": "A71",
    "repair_item": "VETRO VERDE ACQUA",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1459",
    "brand": "SAMSUNG",
    "model": "A71 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1460",
    "brand": "SAMSUNG",
    "model": "A80",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1461",
    "brand": "SAMSUNG",
    "model": "A80",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1462",
    "brand": "SAMSUNG",
    "model": "A125",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1463",
    "brand": "SAMSUNG",
    "model": "A125",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1464",
    "brand": "SAMSUNG",
    "model": "A125",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1465",
    "brand": "SAMSUNG",
    "model": "A125",
    "repair_item": "CONNETTRORE",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1466",
    "brand": "SAMSUNG",
    "model": "A125F",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1467",
    "brand": "SAMSUNG",
    "model": "A127",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1468",
    "brand": "SAMSUNG",
    "model": "A127",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1469",
    "brand": "SAMSUNG",
    "model": "A135",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1470",
    "brand": "SAMSUNG",
    "model": "A135",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1471",
    "brand": "SAMSUNG",
    "model": "A135",
    "repair_item": "小板",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1472",
    "brand": "SAMSUNG",
    "model": "A135",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1473",
    "brand": "SAMSUNG",
    "model": "A135F",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1474",
    "brand": "SAMSUNG",
    "model": "A135 M336",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1475",
    "brand": "SAMSUNG",
    "model": "A136",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1476",
    "brand": "SAMSUNG",
    "model": "A136",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1477",
    "brand": "SAMSUNG",
    "model": "A136",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1478",
    "brand": "SAMSUNG",
    "model": "A136",
    "repair_item": "VOLUME BUTOON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1479",
    "brand": "SAMSUNG",
    "model": "A136U",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1480",
    "brand": "SAMSUNG",
    "model": "A137",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1481",
    "brand": "SAMSUNG",
    "model": "A137",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1482",
    "brand": "SAMSUNG",
    "model": "A137",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1483",
    "brand": "SAMSUNG",
    "model": "A137",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1484",
    "brand": "SAMSUNG",
    "model": "A145",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1485",
    "brand": "SAMSUNG",
    "model": "A145",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1486",
    "brand": "SAMSUNG",
    "model": "A145",
    "repair_item": "IMPRONTE DIGITALE",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1487",
    "brand": "SAMSUNG",
    "model": "A145",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1488",
    "brand": "SAMSUNG",
    "model": "A145",
    "repair_item": "POWER BUTTON + IMPRONTE",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1489",
    "brand": "SAMSUNG",
    "model": "A145F/R/P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1490",
    "brand": "SAMSUNG",
    "model": "A145P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1491",
    "brand": "SAMSUNG",
    "model": "A145R",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1492",
    "brand": "SAMSUNG",
    "model": "A145R",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1493",
    "brand": "SAMSUNG",
    "model": "A146",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1494",
    "brand": "SAMSUNG",
    "model": "A146",
    "repair_item": "NO SEGNAL",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1495",
    "brand": "SAMSUNG",
    "model": "A146P",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1496",
    "brand": "SAMSUNG",
    "model": "A146P",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1497",
    "brand": "SAMSUNG",
    "model": "A146U",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1498",
    "brand": "SAMSUNG",
    "model": "A155",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1499",
    "brand": "SAMSUNG",
    "model": "A155",
    "repair_item": "很久没来自己修起来卖了。换购组装 ，检查 触摸有问题 帮她换个换屏收30 差价",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1500",
    "brand": "SAMSUNG",
    "model": "A155",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1501",
    "brand": "SAMSUNG",
    "model": "A155F",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1502",
    "brand": "SAMSUNG",
    "model": "A156",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1503",
    "brand": "SAMSUNG",
    "model": "A156",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1504",
    "brand": "SAMSUNG",
    "model": "A156",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1505",
    "brand": "SAMSUNG",
    "model": "A156",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1506",
    "brand": "SAMSUNG",
    "model": "A165",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1507",
    "brand": "SAMSUNG",
    "model": "A165",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1508",
    "brand": "SAMSUNG",
    "model": "A166",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1509",
    "brand": "SAMSUNG",
    "model": "A166",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1510",
    "brand": "SAMSUNG",
    "model": "A166",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1511",
    "brand": "SAMSUNG",
    "model": "A166",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1512",
    "brand": "SAMSUNG",
    "model": "A166B",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1513",
    "brand": "SAMSUNG",
    "model": "A166B",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1514",
    "brand": "SAMSUNG",
    "model": "A176",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1515",
    "brand": "SAMSUNG",
    "model": "A202",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1516",
    "brand": "SAMSUNG",
    "model": "A202",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1517",
    "brand": "SAMSUNG",
    "model": "A207",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1518",
    "brand": "SAMSUNG",
    "model": "A207",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1519",
    "brand": "SAMSUNG",
    "model": "A217",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1520",
    "brand": "SAMSUNG",
    "model": "A225",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1521",
    "brand": "SAMSUNG",
    "model": "A225",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1522",
    "brand": "SAMSUNG",
    "model": "A225",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1523",
    "brand": "SAMSUNG",
    "model": "A225",
    "repair_item": "VETRO DIETRO BAINCO (WHATSAPP)",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1524",
    "brand": "SAMSUNG",
    "model": "A226",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1525",
    "brand": "SAMSUNG",
    "model": "A226",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1526",
    "brand": "SAMSUNG",
    "model": "A226",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1527",
    "brand": "SAMSUNG",
    "model": "A226",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1528",
    "brand": "SAMSUNG",
    "model": "A226",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1529",
    "brand": "SAMSUNG",
    "model": "A235",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1530",
    "brand": "SAMSUNG",
    "model": "A236",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1531",
    "brand": "SAMSUNG",
    "model": "A236",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1532",
    "brand": "SAMSUNG",
    "model": "A236",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1533",
    "brand": "SAMSUNG",
    "model": "A236",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1534",
    "brand": "SAMSUNG",
    "model": "A236",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1535",
    "brand": "SAMSUNG",
    "model": "A236B",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1536",
    "brand": "SAMSUNG",
    "model": "A256",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1537",
    "brand": "SAMSUNG",
    "model": "A256",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1538",
    "brand": "SAMSUNG",
    "model": "A256",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1539",
    "brand": "SAMSUNG",
    "model": "A256",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1540",
    "brand": "SAMSUNG",
    "model": "A307",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1541",
    "brand": "SAMSUNG",
    "model": "A307",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1542",
    "brand": "SAMSUNG",
    "model": "A307",
    "repair_item": "DISLPAY COMP",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1543",
    "brand": "SAMSUNG",
    "model": "A315",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1544",
    "brand": "SAMSUNG",
    "model": "A315",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1545",
    "brand": "SAMSUNG",
    "model": "A320",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1546",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1547",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1548",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1549",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1550",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1551",
    "brand": "SAMSUNG",
    "model": "A325",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1552",
    "brand": "SAMSUNG",
    "model": "A325F",
    "repair_item": "virus",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1553",
    "brand": "SAMSUNG",
    "model": "A326",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1554",
    "brand": "SAMSUNG",
    "model": "A326",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1555",
    "brand": "SAMSUNG",
    "model": "A326",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1556",
    "brand": "SAMSUNG",
    "model": "A326",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1557",
    "brand": "SAMSUNG",
    "model": "A326",
    "repair_item": "conettore",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1558",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1559",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1560",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1561",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1562",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1563",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1564",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1565",
    "brand": "SAMSUNG",
    "model": "A336",
    "repair_item": "CONETTORE",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1566",
    "brand": "SAMSUNG",
    "model": "A336B",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1567",
    "brand": "SAMSUNG",
    "model": "A336B",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1568",
    "brand": "SAMSUNG",
    "model": "A336B 5G",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 110,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1569",
    "brand": "SAMSUNG",
    "model": "A346",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1570",
    "brand": "SAMSUNG",
    "model": "A405",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1571",
    "brand": "SAMSUNG",
    "model": "A405",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1572",
    "brand": "SAMSUNG",
    "model": "A405",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1573",
    "brand": "SAMSUNG",
    "model": "A405",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1574",
    "brand": "SAMSUNG",
    "model": "A405",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1575",
    "brand": "SAMSUNG",
    "model": "A415",
    "repair_item": "FLEX",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1576",
    "brand": "SAMSUNG",
    "model": "A500",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1577",
    "brand": "SAMSUNG",
    "model": "A500",
    "repair_item": "NON CARICA",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1578",
    "brand": "SAMSUNG",
    "model": "A500",
    "repair_item": "NON CARICA AL 100%",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1579",
    "brand": "SAMSUNG",
    "model": "A505",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1580",
    "brand": "SAMSUNG",
    "model": "A505",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1581",
    "brand": "SAMSUNG",
    "model": "A505",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1582",
    "brand": "SAMSUNG",
    "model": "A505",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1583",
    "brand": "SAMSUNG",
    "model": "A515",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1584",
    "brand": "SAMSUNG",
    "model": "A515",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1585",
    "brand": "SAMSUNG",
    "model": "A515",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1586",
    "brand": "SAMSUNG",
    "model": "A515",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1587",
    "brand": "SAMSUNG",
    "model": "A515F",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1588",
    "brand": "SAMSUNG",
    "model": "A520",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1589",
    "brand": "SAMSUNG",
    "model": "A520",
    "repair_item": "BUTTON VOLUME",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1590",
    "brand": "SAMSUNG",
    "model": "A525",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1591",
    "brand": "SAMSUNG",
    "model": "A525",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1592",
    "brand": "SAMSUNG",
    "model": "A525",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1593",
    "brand": "SAMSUNG",
    "model": "A525",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1594",
    "brand": "SAMSUNG",
    "model": "A525",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1595",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1596",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1597",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1598",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1599",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "排线",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1600",
    "brand": "SAMSUNG",
    "model": "A526",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1601",
    "brand": "SAMSUNG",
    "model": "A528",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1602",
    "brand": "SAMSUNG",
    "model": "A530",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1603",
    "brand": "SAMSUNG",
    "model": "A530F",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1604",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1605",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1606",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1607",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1608",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1609",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1610",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "系统会死机 不开机 大概5分钟10分钟",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1611",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1612",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "NON ACCENDE",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1613",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1614",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "SCHE DAMADRE 骗钱的",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1615",
    "brand": "SAMSUNG",
    "model": "A536",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1616",
    "brand": "SAMSUNG",
    "model": "A536B",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1617",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1618",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 110,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1619",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "天线 + 他说充电不灵敏",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1620",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1621",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1622",
    "brand": "SAMSUNG",
    "model": "A546",
    "repair_item": "SEGNALE DEBOLE",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1623",
    "brand": "SAMSUNG",
    "model": "A556",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1624",
    "brand": "SAMSUNG",
    "model": "A600",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1625",
    "brand": "SAMSUNG",
    "model": "A600",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1626",
    "brand": "SAMSUNG",
    "model": "A600",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1627",
    "brand": "SAMSUNG",
    "model": "A605",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1628",
    "brand": "SAMSUNG",
    "model": "A605",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1629",
    "brand": "SAMSUNG",
    "model": "A605",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1630",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1631",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1632",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1633",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1634",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1635",
    "brand": "SAMSUNG",
    "model": "A705",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1636",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 135,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1637",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1638",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1639",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1640",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1641",
    "brand": "SAMSUNG",
    "model": "A715",
    "repair_item": "DISP.ORIG",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1642",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1643",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1644",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1645",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1646",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1647",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "DISP",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1648",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1649",
    "brand": "SAMSUNG",
    "model": "A750",
    "repair_item": "TASTO POWER",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1650",
    "brand": "SAMSUNG",
    "model": "A1750",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1651",
    "brand": "SAMSUNG",
    "model": "BAT T500",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1652",
    "brand": "SAMSUNG",
    "model": "G991 S21",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1653",
    "brand": "SAMSUNG",
    "model": "GALAXY TAB S7 FE",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1654",
    "brand": "SAMSUNG",
    "model": "GT P5200",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1655",
    "brand": "SAMSUNG",
    "model": "I9060I",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1656",
    "brand": "SAMSUNG",
    "model": "J5 2017",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1657",
    "brand": "SAMSUNG",
    "model": "J6",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1658",
    "brand": "SAMSUNG",
    "model": "J6 2018",
    "repair_item": "不充电",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1659",
    "brand": "SAMSUNG",
    "model": "J6 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1660",
    "brand": "SAMSUNG",
    "model": "J250",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1661",
    "brand": "SAMSUNG",
    "model": "J320",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1662",
    "brand": "SAMSUNG",
    "model": "J320",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1663",
    "brand": "SAMSUNG",
    "model": "J330",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1664",
    "brand": "SAMSUNG",
    "model": "J410F",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1665",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1666",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1667",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1668",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1669",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1670",
    "brand": "SAMSUNG",
    "model": "J415",
    "repair_item": "tasto POWER",
    "quality": "standard",
    "price": 7,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1671",
    "brand": "SAMSUNG",
    "model": "J510",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1672",
    "brand": "SAMSUNG",
    "model": "J530",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1673",
    "brand": "SAMSUNG",
    "model": "J530",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1674",
    "brand": "SAMSUNG",
    "model": "J530",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1675",
    "brand": "SAMSUNG",
    "model": "J530",
    "repair_item": "POWER ON OFF BUTTON",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1676",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 75,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1677",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1678",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1679",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1680",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "button power",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1681",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "POWER BUTTON+PULIZIA",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1682",
    "brand": "SAMSUNG",
    "model": "J600",
    "repair_item": "TASTO VOLUME",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1683",
    "brand": "SAMSUNG",
    "model": "J610",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1684",
    "brand": "SAMSUNG",
    "model": "J610",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1685",
    "brand": "SAMSUNG",
    "model": "J615",
    "repair_item": "电池",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1686",
    "brand": "SAMSUNG",
    "model": "J615",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1687",
    "brand": "SAMSUNG",
    "model": "J710",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1688",
    "brand": "SAMSUNG",
    "model": "J710",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1689",
    "brand": "SAMSUNG",
    "model": "J730",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1690",
    "brand": "SAMSUNG",
    "model": "J730",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1691",
    "brand": "SAMSUNG",
    "model": "J730F",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1692",
    "brand": "SAMSUNG",
    "model": "M12",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1693",
    "brand": "SAMSUNG",
    "model": "M12",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1694",
    "brand": "SAMSUNG",
    "model": "M51",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1695",
    "brand": "SAMSUNG",
    "model": "M51",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1696",
    "brand": "SAMSUNG",
    "model": "M52",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1697",
    "brand": "SAMSUNG",
    "model": "M215",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1698",
    "brand": "SAMSUNG",
    "model": "M315F",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1699",
    "brand": "SAMSUNG",
    "model": "M526",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1700",
    "brand": "SAMSUNG",
    "model": "MATE 20 PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 205,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1701",
    "brand": "SAMSUNG",
    "model": "NOTE 8",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1702",
    "brand": "SAMSUNG",
    "model": "NOTE 8",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1703",
    "brand": "SAMSUNG",
    "model": "NOTE 8",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1704",
    "brand": "SAMSUNG",
    "model": "NOTE 8",
    "repair_item": "主板",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1705",
    "brand": "SAMSUNG",
    "model": "NOTE 8 N950F",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 170,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1706",
    "brand": "SAMSUNG",
    "model": "NOTE 9",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1707",
    "brand": "SAMSUNG",
    "model": "NOTE 9",
    "repair_item": "不冲电 三角形",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1708",
    "brand": "SAMSUNG",
    "model": "NOTE 9",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1709",
    "brand": "SAMSUNG",
    "model": "NOTE 9",
    "repair_item": "VETRO NERO",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1710",
    "brand": "SAMSUNG",
    "model": "NOTE 10",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1711",
    "brand": "SAMSUNG",
    "model": "NOTE 10",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1712",
    "brand": "SAMSUNG",
    "model": "NOTE 10 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1713",
    "brand": "SAMSUNG",
    "model": "NOTE 10 LITE",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1714",
    "brand": "SAMSUNG",
    "model": "NOTE 10 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1715",
    "brand": "SAMSUNG",
    "model": "NOTE 10 LITE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1716",
    "brand": "SAMSUNG",
    "model": "NOTE 10 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 134,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1717",
    "brand": "SAMSUNG",
    "model": "NOTE 10 PLUS",
    "repair_item": "VETRO DIETRO 灵彩色",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1718",
    "brand": "SAMSUNG",
    "model": "NOTE 20",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1719",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 270,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1720",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1721",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1722",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1723",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA",
    "repair_item": "pen+PELLICOLLA",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1724",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1725",
    "brand": "SAMSUNG",
    "model": "NOTE 20 ULTRA 5G",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1726",
    "brand": "SAMSUNG",
    "model": "P580",
    "repair_item": "sistemna",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1727",
    "brand": "SAMSUNG",
    "model": "P615",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1728",
    "brand": "SAMSUNG",
    "model": "P620",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1729",
    "brand": "SAMSUNG",
    "model": "P5200",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1730",
    "brand": "SAMSUNG",
    "model": "P5200",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1731",
    "brand": "SAMSUNG",
    "model": "P5210",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1732",
    "brand": "SAMSUNG",
    "model": "S3 NEO",
    "repair_item": "BATTTERIA",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1733",
    "brand": "SAMSUNG",
    "model": "S6",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1734",
    "brand": "SAMSUNG",
    "model": "S6",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1735",
    "brand": "SAMSUNG",
    "model": "S6 EDGE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1736",
    "brand": "SAMSUNG",
    "model": "S6 EDGE",
    "repair_item": "电池 返修",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1737",
    "brand": "SAMSUNG",
    "model": "S6 EDGE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1738",
    "brand": "SAMSUNG",
    "model": "S6 EDGE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1739",
    "brand": "SAMSUNG",
    "model": "S6 EDGE",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1740",
    "brand": "SAMSUNG",
    "model": "S6 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1741",
    "brand": "SAMSUNG",
    "model": "S7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1742",
    "brand": "SAMSUNG",
    "model": "S7",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1743",
    "brand": "SAMSUNG",
    "model": "S7 EDGE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1744",
    "brand": "SAMSUNG",
    "model": "S7 EDGE",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1745",
    "brand": "SAMSUNG",
    "model": "S7 EDGE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 10,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1746",
    "brand": "SAMSUNG",
    "model": "S7 EDGE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1747",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1748",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 90,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1749",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1750",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1751",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1752",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1753",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1754",
    "brand": "SAMSUNG",
    "model": "S8",
    "repair_item": "FORMATAZIONE",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1755",
    "brand": "SAMSUNG",
    "model": "S8 G960",
    "repair_item": "电池",
    "quality": "standard",
    "price": 150,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1756",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1757",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 130,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1758",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1759",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1760",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1761",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1762",
    "brand": "SAMSUNG",
    "model": "S8 PLUS",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 4,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1763",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1764",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1765",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1766",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "不充电",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1767",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1768",
    "brand": "SAMSUNG",
    "model": "S9",
    "repair_item": "power  button 外面的那个",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1769",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1770",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1771",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1772",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1773",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1774",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "听筒",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1775",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1776",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1777",
    "brand": "SAMSUNG",
    "model": "S9 PLUS",
    "repair_item": "POWER BUTTON+VOLUME",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1778",
    "brand": "SAMSUNG",
    "model": "S10",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 180,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1779",
    "brand": "SAMSUNG",
    "model": "S10",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1780",
    "brand": "SAMSUNG",
    "model": "S10",
    "repair_item": "刷机保资料",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1781",
    "brand": "SAMSUNG",
    "model": "S10",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1782",
    "brand": "SAMSUNG",
    "model": "S10",
    "repair_item": "power button",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1783",
    "brand": "SAMSUNG",
    "model": "S10E",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1784",
    "brand": "SAMSUNG",
    "model": "S10 G973",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1785",
    "brand": "SAMSUNG",
    "model": "S10 LITE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 150,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1786",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1787",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 230,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1788",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 200,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1789",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1790",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1791",
    "brand": "SAMSUNG",
    "model": "S10 PLUS",
    "repair_item": "主板",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1792",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1793",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1794",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "电源键25+COLLA 10",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1795",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1796",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "POWER BUTTON + VOLUME BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1797",
    "brand": "SAMSUNG",
    "model": "S20",
    "repair_item": "VOLUME BUTTON",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1798",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1799",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1800",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1801",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1802",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1803",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1804",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1805",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1806",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1807",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1808",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "主板不开机 卡logo",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1809",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "COMPATIBILE 修前先打电话问一下框能不能直",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1810",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1811",
    "brand": "SAMSUNG",
    "model": "S20 FE",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1812",
    "brand": "SAMSUNG",
    "model": "S20 FE G750",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1813",
    "brand": "SAMSUNG",
    "model": "S20 PLUS",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1814",
    "brand": "SAMSUNG",
    "model": "S20 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1815",
    "brand": "SAMSUNG",
    "model": "S20 ULTRA",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 260,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1816",
    "brand": "SAMSUNG",
    "model": "S20 ULTRA",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1817",
    "brand": "SAMSUNG",
    "model": "S21",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 160,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1818",
    "brand": "SAMSUNG",
    "model": "S21",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1819",
    "brand": "SAMSUNG",
    "model": "S21",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1820",
    "brand": "SAMSUNG",
    "model": "S21",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1821",
    "brand": "SAMSUNG",
    "model": "S21 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1822",
    "brand": "SAMSUNG",
    "model": "S21 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1823",
    "brand": "SAMSUNG",
    "model": "S21 5G",
    "repair_item": "无信号   好了",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1824",
    "brand": "SAMSUNG",
    "model": "S21 FE",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1825",
    "brand": "SAMSUNG",
    "model": "S21 FE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1826",
    "brand": "SAMSUNG",
    "model": "S21 FE",
    "repair_item": "主板",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1827",
    "brand": "SAMSUNG",
    "model": "S21 FE",
    "repair_item": "WIFI 没用 留下来检查 拿走了 没用 wifi",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1828",
    "brand": "SAMSUNG",
    "model": "S21 G991B",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1829",
    "brand": "SAMSUNG",
    "model": "S21 PLUS",
    "repair_item": "电池",
    "quality": "standard",
    "price": 90,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1830",
    "brand": "SAMSUNG",
    "model": "S21 PLUS",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1831",
    "brand": "SAMSUNG",
    "model": "S21 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1832",
    "brand": "SAMSUNG",
    "model": "S21 PLUS",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1833",
    "brand": "SAMSUNG",
    "model": "S21 ULTRA",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1834",
    "brand": "SAMSUNG",
    "model": "S21 ULTRA",
    "repair_item": "读卡无信号，有时候有信号会掉。没修好",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1835",
    "brand": "SAMSUNG",
    "model": "S21 ULTRA 5G",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1836",
    "brand": "SAMSUNG",
    "model": "S21 ULTRA 5G",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1837",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 200,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1838",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1839",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1840",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1841",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1842",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1843",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1844",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "主板",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1845",
    "brand": "SAMSUNG",
    "model": "S22",
    "repair_item": "RIAVVIO AUTOMATICO",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1846",
    "brand": "SAMSUNG",
    "model": "S22 PLUS",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 170,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1847",
    "brand": "SAMSUNG",
    "model": "S22 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1848",
    "brand": "SAMSUNG",
    "model": "S22 PLUS",
    "repair_item": "POWER PUTTON FUORI",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1849",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1850",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1851",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1852",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1853",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "主板",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1854",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "ANTENNA NO SEGNALE",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1855",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA",
    "repair_item": "DIPLAY ORIG",
    "quality": "standard",
    "price": 250,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1856",
    "brand": "SAMSUNG",
    "model": "S22 ULTRA 5G",
    "repair_item": "ANTENNA",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1857",
    "brand": "SAMSUNG",
    "model": "S23",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 180,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1858",
    "brand": "SAMSUNG",
    "model": "S23",
    "repair_item": "电池",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1859",
    "brand": "SAMSUNG",
    "model": "S23",
    "repair_item": "天线和开机键",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1860",
    "brand": "SAMSUNG",
    "model": "S23",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1861",
    "brand": "SAMSUNG",
    "model": "S23",
    "repair_item": "FRC ANTENNA",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1862",
    "brand": "SAMSUNG",
    "model": "S23 FE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1863",
    "brand": "SAMSUNG",
    "model": "S23 FE",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1864",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 140,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1865",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 270,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1866",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "电池",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1867",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1868",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 8,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1869",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1870",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "主板",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1871",
    "brand": "SAMSUNG",
    "model": "S23 ULTRA",
    "repair_item": "COVER ROSSO",
    "quality": "standard",
    "price": 8,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1872",
    "brand": "SAMSUNG",
    "model": "S24",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1873",
    "brand": "SAMSUNG",
    "model": "S24",
    "repair_item": "天线",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1874",
    "brand": "SAMSUNG",
    "model": "S24",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1875",
    "brand": "SAMSUNG",
    "model": "S24",
    "repair_item": "主板",
    "quality": "standard",
    "price": 200,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1876",
    "brand": "SAMSUNG",
    "model": "S24 ULTRA",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 280,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1877",
    "brand": "SAMSUNG",
    "model": "S24 ULTRA",
    "repair_item": "扬声器",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1878",
    "brand": "SAMSUNG",
    "model": "S25",
    "repair_item": "SBLOCCAZIONE",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1879",
    "brand": "SAMSUNG",
    "model": "SM T560",
    "repair_item": "检查",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1880",
    "brand": "SAMSUNG",
    "model": "T220",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 48,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1881",
    "brand": "SAMSUNG",
    "model": "T220",
    "repair_item": "POWER BUTTON",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1882",
    "brand": "SAMSUNG",
    "model": "T295",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1883",
    "brand": "SAMSUNG",
    "model": "T325",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1884",
    "brand": "SAMSUNG",
    "model": "T505",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1885",
    "brand": "SAMSUNG",
    "model": "T505 A7",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1886",
    "brand": "SAMSUNG",
    "model": "T510",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1887",
    "brand": "SAMSUNG",
    "model": "T515",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1888",
    "brand": "SAMSUNG",
    "model": "T515",
    "repair_item": "耳机孔",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1889",
    "brand": "SAMSUNG",
    "model": "T535",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1890",
    "brand": "SAMSUNG",
    "model": "T535",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1891",
    "brand": "SAMSUNG",
    "model": "T535",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1892",
    "brand": "SAMSUNG",
    "model": "T555",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1893",
    "brand": "SAMSUNG",
    "model": "T555",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1894",
    "brand": "SAMSUNG",
    "model": "T560",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 120,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1895",
    "brand": "SAMSUNG",
    "model": "T560",
    "repair_item": "电池",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1896",
    "brand": "SAMSUNG",
    "model": "T585",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1897",
    "brand": "SAMSUNG",
    "model": "T585",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1898",
    "brand": "SAMSUNG",
    "model": "T585",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1899",
    "brand": "SAMSUNG",
    "model": "T595",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1900",
    "brand": "SAMSUNG",
    "model": "T595",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1901",
    "brand": "SAMSUNG",
    "model": "T595",
    "repair_item": "FORMATTAZIONE + COLLA",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1902",
    "brand": "SAMSUNG",
    "model": "T719",
    "repair_item": "电池",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1903",
    "brand": "SAMSUNG",
    "model": "T720",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1904",
    "brand": "SAMSUNG",
    "model": "T725",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 200,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1905",
    "brand": "SAMSUNG",
    "model": "T805",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1906",
    "brand": "SAMSUNG",
    "model": "T815",
    "repair_item": "激活电池+还原",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1907",
    "brand": "SAMSUNG",
    "model": "T819",
    "repair_item": "电池",
    "quality": "standard",
    "price": 45,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1908",
    "brand": "SAMSUNG",
    "model": "TAB A7",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1909",
    "brand": "SAMSUNG",
    "model": "TAB A7",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1910",
    "brand": "SAMSUNG",
    "model": "TAB A7 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1911",
    "brand": "SAMSUNG",
    "model": "TAB A8",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1912",
    "brand": "SAMSUNG",
    "model": "TAB A8",
    "repair_item": "电池 (组装)",
    "quality": "comp",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1913",
    "brand": "SAMSUNG",
    "model": "TAB A8 X200",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1914",
    "brand": "SAMSUNG",
    "model": "TAB A9 PLUS X216B",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1915",
    "brand": "SAMSUNG",
    "model": "TAB N8000",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1916",
    "brand": "SAMSUNG",
    "model": "TAB S6",
    "repair_item": "主板",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1917",
    "brand": "SAMSUNG",
    "model": "TAB S6 LITE",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1918",
    "brand": "SAMSUNG",
    "model": "TAB T111",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1919",
    "brand": "SAMSUNG",
    "model": "TAB T505",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1920",
    "brand": "SAMSUNG",
    "model": "TAB T515",
    "repair_item": "主板",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1921",
    "brand": "SAMSUNG",
    "model": "TAB T560",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1922",
    "brand": "SAMSUNG",
    "model": "TAB T561",
    "repair_item": "刷机 升级系统",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1923",
    "brand": "SAMSUNG",
    "model": "TAB T580",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1924",
    "brand": "SAMSUNG",
    "model": "TAB T585",
    "repair_item": "TOUCH BIANCO",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1925",
    "brand": "SAMSUNG",
    "model": "TAB T595",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1926",
    "brand": "SAMSUNG",
    "model": "TAB X200",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 75,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1927",
    "brand": "SAMSUNG",
    "model": "TABE",
    "repair_item": "不进系统 ，刷机",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1928",
    "brand": "SAMSUNG",
    "model": "TABLET",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1929",
    "brand": "SAMSUNG",
    "model": "X210",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1930",
    "brand": "SAMSUNG",
    "model": "Y9 PRIME 2019",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1931",
    "brand": "SAMSUNG",
    "model": "Z FLIP 3 5G",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1932",
    "brand": "SAMSUNG",
    "model": "Z FOLD 2",
    "repair_item": "电池 (原装)",
    "quality": "orig",
    "price": 180,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1933",
    "brand": "SAMSUNG",
    "model": "Z FOLD 2 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 350,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1934",
    "brand": "SAMSUNG",
    "model": "Z FOLD 3",
    "repair_item": "屏幕 (组装)",
    "quality": "comp",
    "price": 470,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1935",
    "brand": "SAMSUNG",
    "model": "Z FOLD 3",
    "repair_item": "DISP NO FUNZIONA",
    "quality": "standard",
    "price": 600,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1936",
    "brand": "SAMSUNG",
    "model": "Z FOLD 4",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1937",
    "brand": "SAMSUNG",
    "model": "ZFLIP 4 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 385,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1938",
    "brand": "SAMSUNG",
    "model": "ZFLIP 5G 707",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1939",
    "brand": "SONY",
    "model": "PLAYSTATION 4",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1940",
    "brand": "SONY",
    "model": "PS3",
    "repair_item": "清理灰尘+硅脂",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1941",
    "brand": "SONY",
    "model": "PS3",
    "repair_item": "升级系统",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1942",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "不充电",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1943",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "刷机 不读光盘",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1944",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1945",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "右边摇杆坏",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1946",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "主板",
    "quality": "standard",
    "price": 100,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1947",
    "brand": "SONY",
    "model": "PS4",
    "repair_item": "ANALOGICO 右",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1948",
    "brand": "SONY",
    "model": "PS4 JOYSTICK",
    "repair_item": "L2+DOWN",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1949",
    "brand": "SONY",
    "model": "PS4 PRO",
    "repair_item": "检查报价 不开机",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1950",
    "brand": "SONY",
    "model": "PS4 SLIM",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1951",
    "brand": "SONY",
    "model": "PS5",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1952",
    "brand": "SONY",
    "model": "PS5",
    "repair_item": "ANALOGICO 左 摇杆",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1953",
    "brand": "SONY",
    "model": "PS5",
    "repair_item": "ANALOGICO左",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1954",
    "brand": "SONY",
    "model": "SONY DUALSHOCK 4",
    "repair_item": "手柄 电路板",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1955",
    "brand": "SONY",
    "model": "SONY XPERIA XZ  SO 04J",
    "repair_item": "VOLUME FLEX (ALIEXPRESS) 4 EURO",
    "quality": "standard",
    "price": 4,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1956",
    "brand": "SONY",
    "model": "XPERIA 1 IV",
    "repair_item": "vetro",
    "quality": "standard",
    "price": 7,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1957",
    "brand": "SURFACE",
    "model": "SURFACE PRO 5",
    "repair_item": "屏幕 (原装)",
    "quality": "orig",
    "price": 180,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1958",
    "brand": "TCL",
    "model": "10 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1959",
    "brand": "TCL",
    "model": "10 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1960",
    "brand": "TCL",
    "model": "10 SE T766H",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1961",
    "brand": "TCL",
    "model": "20 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1962",
    "brand": "TCL",
    "model": "20 SE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1963",
    "brand": "TCL",
    "model": "205",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1964",
    "brand": "TCL",
    "model": "205",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1965",
    "brand": "TCL",
    "model": "205 4187D",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1966",
    "brand": "TCL",
    "model": "20L",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1967",
    "brand": "TCL",
    "model": "20L PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1968",
    "brand": "TCL",
    "model": "20Y",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1969",
    "brand": "TCL",
    "model": "20Y",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1970",
    "brand": "TCL",
    "model": "30 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1971",
    "brand": "TCL",
    "model": "30 SE",
    "repair_item": "后盖",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1972",
    "brand": "TCL",
    "model": "30 SE",
    "repair_item": "DIPSLAY",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1973",
    "brand": "TCL",
    "model": "306",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1974",
    "brand": "TCL",
    "model": "40 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1975",
    "brand": "TCL",
    "model": "403",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1976",
    "brand": "TCL",
    "model": "408",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1977",
    "brand": "TCL",
    "model": "40R",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1978",
    "brand": "TCL",
    "model": "40R 5G",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1979",
    "brand": "TCL",
    "model": "50 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1980",
    "brand": "TCL",
    "model": "50 5G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1981",
    "brand": "TCL",
    "model": "505",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1982",
    "brand": "TCL",
    "model": "506G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1983",
    "brand": "TCL",
    "model": "509K",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1984",
    "brand": "TCL",
    "model": "T506",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1985",
    "brand": "TCL",
    "model": "T506G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1986",
    "brand": "TCL",
    "model": "T610K",
    "repair_item": "刷机 还原 有一次保修 免费刷机",
    "quality": "standard",
    "price": 20,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1987",
    "brand": "TCL",
    "model": "T671H",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1988",
    "brand": "TCL",
    "model": "T780H",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1989",
    "brand": "TCL",
    "model": "TCL 20LT 774",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1990",
    "brand": "TCL",
    "model": "TCL 20R",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1991",
    "brand": "TCL",
    "model": "TCL 20R 5G / T767H",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1992",
    "brand": "TCL",
    "model": "TCL 20 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1993",
    "brand": "TCL",
    "model": "TCL 30",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1994",
    "brand": "TCL",
    "model": "TCL 30 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1995",
    "brand": "TCL",
    "model": "TCL 30 SE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-1996",
    "brand": "TCL",
    "model": "TCL 40 SE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1997",
    "brand": "TCL",
    "model": "TCL 406S",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 23,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-1998",
    "brand": "TCL",
    "model": "TCL 408",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 15,
    "warranty": "USATO GARANZIA"
  },
  {
    "id": "repair-1999",
    "brand": "TECLAST",
    "model": "T40 PLUS",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 80,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2000",
    "brand": "TECLAST",
    "model": "TLA007",
    "repair_item": "touch 要下单",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2001",
    "brand": "TECLAST",
    "model": "TLA007 TOUCH",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 40,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2002",
    "brand": "ULEFONE",
    "model": "ARMOR 18 ULTRA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2003",
    "brand": "ULEFONE",
    "model": "POWER ARMOR 19",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2004",
    "brand": "ULEFONE",
    "model": "ULEFONE NOTE PRO",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 65,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2005",
    "brand": "UMIDIGI",
    "model": "BISON",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2006",
    "brand": "VIVO",
    "model": "S1",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2007",
    "brand": "VIVO",
    "model": "Y20I",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2008",
    "brand": "VIVO",
    "model": "Y20S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2009",
    "brand": "VIVO",
    "model": "Y21",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2010",
    "brand": "VIVO",
    "model": "Y21",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 5,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2011",
    "brand": "VIVO",
    "model": "Y21S",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2012",
    "brand": "VIVO",
    "model": "Y72",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2013",
    "brand": "VIVO",
    "model": "Y72 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2014",
    "brand": "VIVO",
    "model": "Y76 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2015",
    "brand": "WIKO",
    "model": "JERRY 3",
    "repair_item": "电池",
    "quality": "standard",
    "price": 15,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2016",
    "brand": "WIKO",
    "model": "POWER U10",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2017",
    "brand": "WIKO",
    "model": "POWER U10",
    "repair_item": "电池",
    "quality": "standard",
    "price": 0,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2018",
    "brand": "WIKO",
    "model": "POWER U20",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2019",
    "brand": "WIKO",
    "model": "POWERU 30",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2020",
    "brand": "WIKO",
    "model": "SUNNY 2 PLUS",
    "repair_item": "TOUCH",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2021",
    "brand": "WIKO",
    "model": "U10 POWER",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2022",
    "brand": "WIKO",
    "model": "VIEW XL",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2023",
    "brand": "WIKO",
    "model": "VIEW 4",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2024",
    "brand": "WIKO",
    "model": "VIEW 4 LITE",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2025",
    "brand": "WIKO",
    "model": "VIEW 4 LITE",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2026",
    "brand": "WIKO",
    "model": "WIKO W-V680",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2027",
    "brand": "WIKO",
    "model": "Y50",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2028",
    "brand": "WIKO",
    "model": "Y61",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2029",
    "brand": "WIKO",
    "model": "Y61",
    "repair_item": "SIM卡槽",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2030",
    "brand": "WIKO",
    "model": "Y62",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2031",
    "brand": "WIKO",
    "model": "Y62",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2032",
    "brand": "WIKO",
    "model": "Y62 PLUS",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2033",
    "brand": "WIKO",
    "model": "Y80",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 75,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2034",
    "brand": "WIKO",
    "model": "Y80",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2035",
    "brand": "WIKO",
    "model": "Y81",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2036",
    "brand": "WIKO",
    "model": "Y81",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 25,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2037",
    "brand": "XBOX",
    "model": "CONTROLLER",
    "repair_item": "ANALOGICO 右",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2038",
    "brand": "XBOX",
    "model": "CONTROLLER",
    "repair_item": "ANALOGICO NON FUNZIONA",
    "quality": "standard",
    "price": 20,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2039",
    "brand": "XBOX",
    "model": "SERIEX",
    "repair_item": "2 JOYSTICK 10 + 25",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2040",
    "brand": "XBOX",
    "model": "SERIEX",
    "repair_item": "主板",
    "quality": "standard",
    "price": 80,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2041",
    "brand": "XBOX",
    "model": "XBOX",
    "repair_item": "主板",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2042",
    "brand": "XBOX",
    "model": "XBOX",
    "repair_item": "L1",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2043",
    "brand": "XBOX",
    "model": "XBOX ONES",
    "repair_item": "NON ENTRA SISTEMA",
    "quality": "standard",
    "price": 45,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2044",
    "brand": "ZTE",
    "model": "A32",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2045",
    "brand": "ZTE",
    "model": "A34",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2046",
    "brand": "ZTE",
    "model": "A34",
    "repair_item": "手机 miwo x2",
    "quality": "standard",
    "price": 180,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2047",
    "brand": "ZTE",
    "model": "A72 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2048",
    "brand": "ZTE",
    "model": "A72 5G",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2049",
    "brand": "ZTE",
    "model": "A73",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2050",
    "brand": "ZTE",
    "model": "A73 4G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2051",
    "brand": "ZTE",
    "model": "A73 4G",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2052",
    "brand": "ZTE",
    "model": "A75 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2053",
    "brand": "ZTE",
    "model": "A76 5G",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 25,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2054",
    "brand": "ZTE",
    "model": "BLADE A5 2020",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2055",
    "brand": "ZTE",
    "model": "BLADE A5 2020",
    "repair_item": "NON CARICA FINO A 78% FERMA",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2056",
    "brand": "ZTE",
    "model": "BLADE A75 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2057",
    "brand": "ZTE",
    "model": "NUBIA FOCUS 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 70,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2058",
    "brand": "ZTE",
    "model": "NUBIA FOCUS 5G Z2357N",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2059",
    "brand": "ZTE",
    "model": "NUBIA MUSIC Z2353",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2060",
    "brand": "ZTE",
    "model": "NUBIA Z2353",
    "repair_item": "麦克风",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2061",
    "brand": "ZTE",
    "model": "V40",
    "repair_item": "主板",
    "quality": "standard",
    "price": 5,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2062",
    "brand": "ZTE",
    "model": "V40 DESIGN",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2063",
    "brand": "ZTE",
    "model": "V40 DESIGN",
    "repair_item": "电池",
    "quality": "standard",
    "price": 35,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2064",
    "brand": "ZTE",
    "model": "V40 DESIGN",
    "repair_item": "主板",
    "quality": "standard",
    "price": 15,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2065",
    "brand": "ZTE",
    "model": "V40 VITA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "3 MESI"
  },
  {
    "id": "repair-2066",
    "brand": "ZTE",
    "model": "V50",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 55,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2067",
    "brand": "ZTE",
    "model": "V50 DESIGN 5G",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2068",
    "brand": "ZTE",
    "model": "V60",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 50,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2069",
    "brand": "ZTE",
    "model": "V60 DESIGN",
    "repair_item": "尾插/充电口",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2070",
    "brand": "ZTE",
    "model": "V60 VITA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2071",
    "brand": "ZTE",
    "model": "V60 VITA",
    "repair_item": "摄像头",
    "quality": "standard",
    "price": 0,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2072",
    "brand": "ZTE",
    "model": "V70 VITA",
    "repair_item": "屏幕",
    "quality": "standard",
    "price": 60,
    "warranty": "6 MESI"
  },
  {
    "id": "repair-2073",
    "brand": "ZTE",
    "model": "ZTE BLADE A5 2020",
    "repair_item": "电池",
    "quality": "standard",
    "price": 30,
    "warranty": "6 MESI"
  }
];
