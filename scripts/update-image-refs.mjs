/**
 * 更新程式碼中的圖片路徑
 * 將 .png/.jpg 改為 .webp
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(__dirname, '..', 'src')

// 不替換的模式
const SKIP_PATTERNS = [
  'og-cover.png', // OG 圖片
  '/icons/pwa', // PWA icons 在 manifest 中需要 PNG
  'favicon', // Favicon
]

const stats = {
  filesScanned: 0,
  filesModified: 0,
  replacements: 0,
}

/**
 * 遞迴取得所有 tsx/ts 檔案
 */
async function getSourceFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      await getSourceFiles(fullPath, files)
    } else {
      const ext = extname(entry.name).toLowerCase()
      if (['.tsx', '.ts'].includes(ext) && !entry.name.includes('.d.ts')) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * 更新單一檔案
 */
async function updateFile(filePath, dryRun = true) {
  const content = await readFile(filePath, 'utf-8')
  let newContent = content
  let fileReplacements = 0

  // 替換 .png 和 .jpg/.jpeg
  const patterns = [
    { regex: /(\/)([^'"\/]+)\.(png)(['"])/g, ext: '.webp' },
    { regex: /(\/)([^'"\/]+)\.(jpe?g)(['"])/g, ext: '.webp' },
  ]

  for (const { regex, ext } of patterns) {
    newContent = newContent.replace(regex, (match, prefix, filename, oldExt, quote) => {
      const fullPath = `${prefix}${filename}.${oldExt}`

      // 檢查是否要跳過
      if (SKIP_PATTERNS.some((skip) => fullPath.includes(skip))) {
        return match
      }

      fileReplacements++
      return `${prefix}${filename}${ext}${quote}`
    })
  }

  if (fileReplacements > 0) {
    const relativePath = filePath.replace(SRC_DIR + '/', '')
    console.log(`  ✏️  ${relativePath} (${fileReplacements} 處)`)

    if (!dryRun) {
      await writeFile(filePath, newContent)
    }

    stats.filesModified++
    stats.replacements += fileReplacements
  }

  stats.filesScanned++
}

async function main() {
  const dryRun = !process.argv.includes('--run')

  console.log('\n📝 更新圖片路徑工具\n')
  console.log(`   目錄: ${SRC_DIR}`)
  console.log(`   模式: ${dryRun ? '預覽（加上 --run 執行）' : '執行更新'}`)
  console.log('')

  const files = await getSourceFiles(SRC_DIR)
  console.log(`📂 找到 ${files.length} 個原始檔案\n`)

  for (const file of files) {
    await updateFile(file, dryRun)
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 統計結果')
  console.log('='.repeat(50))
  console.log(`   掃描: ${stats.filesScanned} 個檔案`)
  console.log(`   修改: ${stats.filesModified} 個檔案`)
  console.log(`   替換: ${stats.replacements} 處`)
  console.log('')

  if (dryRun && stats.replacements > 0) {
    console.log('💡 執行更新請加上 --run 參數：')
    console.log('   node scripts/update-image-refs.mjs --run\n')
  }
}

main().catch(console.error)
