"use client"

import * as React from "react"
import { OrderList } from "./order-list"
import { cn } from "@/lib/utils"

export function OrderManagementApp({ setMainHeaderVisible }: { setMainHeaderVisible: (visible: boolean) => void }) {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0)
  
  // Use media query to detect desktop
  const [isDesktop, setIsDesktop] = React.useState(false)
  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Always show main header since detail view is removed
  React.useEffect(() => {
    setMainHeaderVisible(true)
  }, [setMainHeaderVisible])

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* List Panel - Always Visible */}
      <div className={cn(
        "flex-1 flex flex-col h-full transition-all duration-300 bg-background overflow-hidden w-full"
      )}>
        <OrderList 
            refreshTrigger={refreshTrigger}
        />
      </div>
    </div>
  )
}
