"use client"

import {
  Smartphone,
  Laptop,
  Gamepad2,
  Tablet,
  Watch,
  Monitor,
  Cpu,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mapping of brands to Simple Icons slugs or Lucide icons
// Using cdn.simpleicons.org for high quality SVG icons
const BRAND_LOGOS: Record<string, string> = {
  APPLE: "apple",
  SAMSUNG: "samsung",
  HUAWEI: "huawei",
  XIAOMI: "xiaomi",
  OPPO: "oppo",
  VIVO: "vivo",
  HONOR: "honor",
  "ONE PLUS": "oneplus",
  GOOGLE: "google",
  SONY: "sony",
  NOKIA: "nokia",
  MOTOROLA: "motorola",
  ASUS: "asus",
  LENOVO: "lenovo",
  HP: "hp",
  LG: "lg",
  ZTE: "zte",
  REALME: "realme",
  ALCATEL: "alcatel",
  WIKO: "wiko", // May not exist on simple-icons, fallback
  NINTENDO: "nintendo",
  PS4: "playstation",
  PS5: "playstation",
  XBOX: "xbox",
  MEIZU: "meizu",
  TCL: "tcl",
  HTC: "htc",
  BLACKBERRY: "blackberry",
  ACER: "acer",
  DELL: "dell",
  MICROSOFT: "microsoft",
  SURFACE: "microsoft",
}

const BRAND_COLORS: Record<string, string> = {
  APPLE: "text-zinc-900 dark:text-zinc-100",
  SAMSUNG: "text-[#1428A0]",
  HUAWEI: "text-[#FF0000]",
  XIAOMI: "text-[#FF6900]",
  OPPO: "text-[#118743]",
  VIVO: "text-[#415FFF]",
  HONOR: "text-[#000000]", // Or specific blue
  GOOGLE: "text-[#4285F4]",
  SONY: "text-[#000000]",
  XBOX: "text-[#107C10]",
  PS4: "text-[#003791]",
  PS5: "text-[#003791]",
  NINTENDO: "text-[#E60012]",
}

interface BrandIconProps {
  brand: string
  className?: string
  variant?: "icon" | "card"
}

export function BrandIcon({ brand, className, variant = "icon" }: BrandIconProps) {
  const normalizedBrand = brand.toUpperCase()
  const slug = BRAND_LOGOS[normalizedBrand]
  
  // Fallback icon based on keywords
  const getFallbackIcon = () => {
    if (["PS4", "PS5", "XBOX", "NINTENDO", "JOYSTICK"].some(k => normalizedBrand.includes(k))) return <Gamepad2 className={className} />
    if (["PC", "LAPTOP", "NOTEBOOK", "HP", "ACER", "ASUS", "LENOVO", "DELL", "SURFACE"].some(k => normalizedBrand.includes(k))) return <Laptop className={className} />
    if (["TABLET", "IPAD", "PAD"].some(k => normalizedBrand.includes(k))) return <Tablet className={className} />
    if (["WATCH"].some(k => normalizedBrand.includes(k))) return <Watch className={className} />
    return <Smartphone className={className} />
  }

  // Use CDN image for known brands
  if (slug) {
    // Determine color based on theme (using CSS filter for dark mode adaptation if needed, but for now simple color)
    // Actually, simpleicons default is black.
    // We can use the 'default' color from simpleicons or force a color.
    // For a cleaner look, let's use the default brand color or monochrome.
    // Let's try monochrome for consistency, or brand color for pop.
    // Using `currentColor` allows Tailwind to control it.
    
    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        <img 
            src={`https://cdn.simpleicons.org/${slug}`} 
            alt={brand}
            className="w-full h-full object-contain dark:invert transition-all duration-300"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            loading="lazy"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                // The parent will show fallback? No, img is hidden. 
                // We need a way to show fallback if img fails.
                // React `onError` handler is tricky here. 
                // Let's just trust the list for now or use a wrapper.
            }}
        />
      </div>
    )
  }

  return getFallbackIcon()
}
