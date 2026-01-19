import fs from 'fs'
import path from 'path'

describe('Static assets', () => {
  const root = path.join(process.cwd(), 'public')

  it('has PWA manifest with basic fields', () => {
    const manifestPath = path.join(root, 'manifest.json')
    expect(fs.existsSync(manifestPath)).toBe(true)

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    expect(manifest.name).toBeTruthy()
    expect(manifest.icons?.length).toBeGreaterThan(0)
    const has512 = manifest.icons?.some((icon: any) => icon.sizes?.includes('512'))
    expect(has512).toBe(true)
  })

  it('exposes SEO files (robots.txt, sitemap.xml, og-cover)', () => {
    expect(fs.existsSync(path.join(root, 'robots.txt'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'sitemap.xml'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'og-cover.png'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'offline.html'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'sw.js'))).toBe(true)

    const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf-8')
    expect(robots).toMatch(/User-agent:\s*\*/i)
    expect(robots).toMatch(/Allow:\s*\//)

    const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf-8')
    expect(sitemap).toMatch(/https:\/\/neverland\.swift\.moe\//)
  })
})
