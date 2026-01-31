import { buildCoursePageMetadata, SWIFT_ADVANCED_CONFIG, SITE_URL } from '@/app/metadata'
import { PersonJsonLd } from '@components/common'

export const metadata = buildCoursePageMetadata('instructor', SWIFT_ADVANCED_CONFIG)

const instructorImage = new URL('/swift/advanced/instructor/portrait.webp', SITE_URL).toString()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PersonJsonLd
        name="彼得潘 Peter Pan"
        url={new URL('/neverland', SITE_URL).toString()}
        image={instructorImage}
        jobTitle="iOS App 開發講師"
        description="講師、作家、顧問，從零程式到 App 上架，彼得潘陪你一步步完成。暢銷書《彼得潘的 Swift 程式設計入門》作者。"
        sameAs={[
          'https://medium.com/@apppeterpan',
          'https://www.facebook.com/iphone.peterpan/',
          'http://www.appcoda.com.tw/',
        ]}
      />
      {children}
    </>
  )
}
