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
  })

  it('exposes SEO files (robots.txt, sitemap.xml, og-cover)', () => {
    expect(fs.existsSync(path.join(root, 'robots.txt'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'sitemap.xml'))).toBe(true)
    expect(fs.existsSync(path.join(root, 'og-cover.png'))).toBe(true)
  })
})
