'use client'

import Link from 'next/link'
import styles from '../page.module.css'

export default function SwiftuiAdvancedPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>SwiftUI Advanced</h1>
          <p className={styles.subtitle}>
            進階單元規劃中：將涵蓋架構設計、狀態管理、資料流、網路與專題實作。內容完成後會在此頁公布。
          </p>
        </header>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>尚在籌備</h2>
            <p className={styles.cardDescription}>
              歡迎先瀏覽入門路徑，並留下需求回饋。完成時程將同步於主站公告。
            </p>
            <div className={styles.links}>
              <Link className={styles.link} href="/courses/swiftui">
                返回 SwiftUI 課程首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
