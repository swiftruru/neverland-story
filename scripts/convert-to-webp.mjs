/**
 * 圖片轉 WebP 腳本
 * 將 public 資料夾中的 PNG/JPG 圖片轉換為 WebP 格式
 *
 * 使用方式：
 *   node scripts/convert-to-webp.mjs          # 預覽模式（不實際轉換）
 *   node scripts/convert-to-webp.mjs --run    # 執行轉換
 */

import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')

// 設定
const CONFIG = {
  // WebP 品質 (0-100)
  quality: 85,
  // 最小檔案大小才轉換 (bytes)
  minSize: 10 * 1024, // 10KB
  // 跳過的檔案/資料夾
  skip: [
    'icons', // PWA icons 保持 PNG
    'favicon', // Favicon
    'og-cover.png', // OG 圖片需要特定格式
    'neverland/og-cover.png',
  ],
  // 是否刪除原始檔案
  deleteOriginal: true,
}

// 統計
const stats = {
  scanned: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  savedBytes: 0,
}

/**
 * 遞迴取得所有圖片檔案
 */
async function getImageFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = fullPath.replace(PUBLIC_DIR + '/', '')

    // 檢查是否要跳過
    if (CONFIG.skip.some((skip) => relativePath.startsWith(skip) || relativePath === skip)) {
      continue
    }

    if (entry.isDirectory()) {
      await getImageFiles(fullPath, files)
    } else {
      const ext = extname(entry.name).toLowerCase()
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * 格式化檔案大小
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * 轉換單一檔案
 */
async function convertFile(filePath, dryRun = true) {
  const relativePath = filePath.replace(PUBLIC_DIR + '/', '')
  const ext = extname(filePath).toLowerCase()
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

  try {
    const originalStat = await stat(filePath)
    const originalSize = originalStat.size

    // 跳過太小的檔案
    if (originalSize < CONFIG.minSize) {
      console.log(`  ⏭️  ${relativePath} (太小，跳過)`)
      stats.skipped++
      return
    }

    stats.scanned++

    if (dryRun) {
      // 預覽模式：模擬轉換以計算大小
      const buffer = await sharp(filePath).webp({ quality: CONFIG.quality }).toBuffer()

      const newSize = buffer.length
      const saved = originalSize - newSize
      const percent = ((saved / originalSize) * 100).toFixed(1)

      console.log(
        `  📦 ${relativePath}`,
        `\n     ${formatSize(originalSize)} → ${formatSize(newSize)}`,
        `(-${percent}%, 節省 ${formatSize(saved)})`
      )

      stats.savedBytes += saved
      stats.converted++
    } else {
      // 實際轉換
      await sharp(filePath).webp({ quality: CONFIG.quality }).toFile(webpPath)

      const newStat = await stat(webpPath)
      const newSize = newStat.size
      const saved = originalSize - newSize
      const percent = ((saved / originalSize) * 100).toFixed(1)

      console.log(
        `  ✅ ${relativePath} → .webp`,
        `\n     ${formatSize(originalSize)} → ${formatSize(newSize)}`,
        `(-${percent}%)`
      )

      // 刪除原始檔案
      if (CONFIG.deleteOriginal) {
        await unlink(filePath)
      }

      stats.savedBytes += saved
      stats.converted++
    }
  } catch (error) {
    console.error(`  ❌ ${relativePath}: ${error.message}`)
    stats.errors++
  }
}

/**
 * 主程式
 */
async function main() {
  const dryRun = !process.argv.includes('--run')

  console.log('\n🖼️  圖片轉 WebP 工具\n')
  console.log(`   目錄: ${PUBLIC_DIR}`)
  console.log(`   品質: ${CONFIG.quality}`)
  console.log(`   模式: ${dryRun ? '預覽（加上 --run 執行）' : '執行轉換'}`)
  console.log('')

  // 取得所有圖片
  const files = await getImageFiles(PUBLIC_DIR)
  console.log(`📂 找到 ${files.length} 個圖片檔案\n`)

  // 轉換
  for (const file of files) {
    await convertFile(file, dryRun)
  }

  // 統計
  console.log('\n' + '='.repeat(50))
  console.log('📊 統計結果')
  console.log('='.repeat(50))
  console.log(`   掃描: ${stats.scanned} 個檔案`)
  console.log(`   轉換: ${stats.converted} 個檔案`)
  console.log(`   跳過: ${stats.skipped} 個檔案`)
  console.log(`   錯誤: ${stats.errors} 個檔案`)
  console.log(`   節省: ${formatSize(stats.savedBytes)}`)
  console.log('')

  if (dryRun && stats.converted > 0) {
    console.log('💡 執行轉換請加上 --run 參數：')
    console.log('   node scripts/convert-to-webp.mjs --run\n')
  }
}

main().catch(console.error)
