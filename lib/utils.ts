import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTicketNo() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ" // Removed I, O
  const prefix = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)]
  const num = Math.floor(Math.random() * 900) + 100 // 100-999
  return `${prefix}${num}`
}
