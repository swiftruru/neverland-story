import { GoogleAnalytics } from '@components/common'

const GA_MEASUREMENT_ID = 'G-QMB0KWP5H4'

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
