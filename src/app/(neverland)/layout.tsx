import { GoogleAnalytics } from '@components/common'

const GA_MEASUREMENT_ID = 'G-QBT96TN0KR'

export default function NeverlandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      {children}
    </>
  )
}
