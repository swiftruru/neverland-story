import type { NavItem } from '@app-types/navigation'
import { withBasePath } from '@app/metadata'

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首頁', path: withBasePath('/') },
  { id: 'videos', label: '影片', path: withBasePath('/videos') },
  { id: 'classroom', label: '開發教室', path: withBasePath('/classroom') },
  { id: 'contact', label: '聯絡', path: withBasePath('/contact') },
  { id: 'books', label: '著作', path: withBasePath('/books') },
  { id: 'tutoring', label: '家教', path: withBasePath('/tutoring') },
  { id: 'qa', label: 'Q & A', path: withBasePath('/qa') },
  { id: 'courses', label: '講座課程', path: withBasePath('/courses') },
  { id: 'gallery', label: '相冊', path: withBasePath('/gallery') },
  { id: 'ferryman', label: '金牌擺渡人', path: withBasePath('/ferryman') },
  { id: 'apps', label: 'APP 作品', path: withBasePath('/apps') },
  { id: 'essays', label: '散文集', path: withBasePath('/essays') },
  { id: 'columns', label: '雜誌專欄', path: withBasePath('/columns') },
  { id: 'experience', label: '經歷', path: withBasePath('/experience') },
]
