'use client'

import Link from 'next/link'
import styles from './page.module.css'

export default function SwiftuiCourseHome() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>SwiftUI 課程路徑</h1>
          <p className={styles.subtitle}>
            為文組與轉職學習者打造的 SwiftUI 系列，先建立基礎，再進階實作。選擇你的起點。
          </p>
        </header>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Foundation · 文組生入門</h2>
            <p className={styles.cardDescription}>
              零程式基礎也能上手的 SwiftUI 入門路徑，從基礎概念、版面、資料綁定到常用元件，幫你快速完成第一個 App。
            </p>
            <div className={styles.links}>
              <Link className={styles.link} href="/courses/swiftui/foundation">
                查看內容
              </Link>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Advanced · 進階實作</h2>
            <p className={styles.cardDescription}>
              持續擴充中的進階單元，將涵蓋架構、狀態管理、網路層與實戰專題，適合已完成入門的同學。
            </p>
            <div className={styles.links}>
              <Link className={styles.link} href="/courses/swiftui/advanced">
                預覽規劃
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
