import { redirect } from 'next/navigation'
import { withBasePath } from './metadata'

export default function RootRedirect() {
  redirect(withBasePath('/'))
}
