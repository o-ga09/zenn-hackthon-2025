import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { NextTopLoaderProps } from 'nextjs-toploader'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const topLoaderConfig: NextTopLoaderProps = {
  color: '#FCC31C',
  initialPosition: 0.3,
  crawlSpeed: 300,
  height: 4,
  crawl: true,
  showSpinner: false,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  speed: 250,
  shadow: '0 2px 15px rgba(233, 100, 43, 0.5)',
  zIndex: 2000,
}
