/**
 * 觸覺回饋工具
 * 使用 Vibration API 提供不同強度的震動回饋
 */

// 檢查是否支援震動
const isVibrationSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator
}

// 震動模式（毫秒）
type VibratePattern = number | number[]

const PATTERNS: Record<string, VibratePattern> = {
  // 輕點 - 用於一般點擊
  light: 10,
  // 中等 - 用於確認動作
  medium: 20,
  // 重擊 - 用於重要動作（如刷新觸發）
  heavy: 30,
  // 成功 - 短-長模式
  success: [10, 50, 20],
  // 警告 - 雙擊模式
  warning: [20, 50, 20],
  // 錯誤 - 三連擊
  error: [30, 50, 30, 50, 30],
}

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'

/**
 * 觸發觸覺回饋
 * @param type 回饋類型
 * @returns 是否成功觸發
 */
export function haptic(type: HapticType = 'light'): boolean {
  if (!isVibrationSupported()) {
    return false
  }

  try {
    const pattern = PATTERNS[type]
    return navigator.vibrate(pattern)
  } catch {
    return false
  }
}

/**
 * 停止震動
 */
export function stopHaptic(): void {
  if (isVibrationSupported()) {
    navigator.vibrate(0)
  }
}

/**
 * 自訂震動模式
 * @param pattern 震動模式（毫秒數組或單一數值）
 */
export function customHaptic(pattern: number | number[]): boolean {
  if (!isVibrationSupported()) {
    return false
  }

  try {
    return navigator.vibrate(pattern)
  } catch {
    return false
  }
}
