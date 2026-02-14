"use client";

import { Bot } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-white p-6 rounded-full shadow-sm mb-4">
        <Bot className="w-10 h-10 text-blue-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">智能助手已就绪</h2>
      <p className="text-slate-500 mt-2 max-w-sm">
        导入数据后，点击 <b>&quot;智能纠错&quot;</b> <br />我将帮您检查价格倒挂、信息缺失等问题
      </p>
    </div>
  );
}
