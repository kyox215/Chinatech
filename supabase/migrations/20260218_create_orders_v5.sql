
-- 订单管理系统 V5 - 数据库 Schema

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_no TEXT NOT NULL UNIQUE,
  
  -- 状态流转
  status TEXT NOT NULL DEFAULT 'pending', 
  -- pending: 待处理
  -- parts_ordered: 已订购配件
  -- parts_arrived: 配件到货
  -- in_progress: 维修中
  -- ready: 待取机
  -- completed: 已完成
  -- cancelled: 已取消
  -- long_wait: 滞留
  
  -- 客户信息
  customer_name TEXT DEFAULT '',
  customer_phone TEXT NOT NULL, -- 核心索引
  
  -- 设备信息
  brand TEXT DEFAULT '',
  model TEXT DEFAULT '',
  imei TEXT DEFAULT '', -- 串号/SN
  
  -- 故障与服务
  issue TEXT DEFAULT '',
  service_type TEXT DEFAULT 'quick', -- quick (快修), leave_in (留机), wait (等候)
  category TEXT DEFAULT '', -- parts, motherboard, system...
  source_code TEXT DEFAULT '', -- 内部代码/配件来源 (MB, NB...)
  warranty TEXT DEFAULT '', -- 3 MESI, 6 MESI...
  
  -- 留机与配件管理 (New)
  is_device_left BOOLEAN DEFAULT false, -- 是否留机
  accessories_left TEXT DEFAULT '', -- 留下的配件 (JSON string or simple text)
  
  -- 财务信息
  price NUMERIC DEFAULT 0, -- 总价
  deposit NUMERIC DEFAULT 0, -- 定金
  
  -- 时间与人员
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  technician TEXT DEFAULT '', -- 技术员
  
  -- 附件
  images JSONB DEFAULT '[]'::jsonb -- 照片 URL 数组
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_ticket_no ON orders(ticket_no);

-- 启用 RLS (开发环境允许公开读写)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON orders FOR DELETE USING (true);
