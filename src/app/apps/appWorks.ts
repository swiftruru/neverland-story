export interface AppWork {
  id: string
  titleKey: string
  descriptionKey: string
  description2Key?: string
  image: string
  url?: string
}

export const APP_WORKS: AppWork[] = [
  {
    id: 'wealthy-01',
    titleKey: 'wealthy.title',
    descriptionKey: 'wealthy01.description',
    description2Key: 'wealthy01.description2',
    image: '/apps/wealthy-01.png',
    url: 'https://itunes.apple.com/app/wealthy!-track-expenses-take/id714626591',
  },
  {
    id: 'wealthy-02',
    titleKey: 'wealthy.title',
    descriptionKey: 'wealthy02.description',
    description2Key: 'wealthy02.description2',
    image: '/apps/wealthy-02.png',
    url: 'https://itunes.apple.com/app/wealthy!-track-expenses-take/id714626591',
  },
  {
    id: 'wealthy-03',
    titleKey: 'wealthy.title',
    descriptionKey: 'wealthy03.description',
    description2Key: 'wealthy03.description2',
    image: '/apps/wealthy-03.png',
    url: 'https://itunes.apple.com/app/wealthy!-track-expenses-take/id714626591',
  },
  {
    id: 'wealthy-04',
    titleKey: 'wealthy.title',
    descriptionKey: 'wealthy04.description',
    image: '/apps/wealthy-04.png',
    url: 'https://itunes.apple.com/app/wealthy!-track-expenses-take/id714626591',
  },
  {
    id: 'penny-home-01',
    titleKey: 'pennyHome.title',
    descriptionKey: 'pennyHome01.description',
    description2Key: 'pennyHome01.description2',
    image: '/apps/penny-home-01.png',
  },
  {
    id: 'penny-home-02',
    titleKey: 'pennyHome.title',
    descriptionKey: 'pennyHome02.description',
    description2Key: 'pennyHome02.description2',
    image: '/apps/penny-home-02.png',
  },
  {
    id: 'penny-home-03',
    titleKey: 'pennyHome.title',
    descriptionKey: 'pennyHome03.description',
    description2Key: 'pennyHome03.description2',
    image: '/apps/penny-home-03.png',
  },
  {
    id: 'penny-home-04',
    titleKey: 'pennyHome.title',
    descriptionKey: 'pennyHome04.description',
    description2Key: 'pennyHome04.description2',
    image: '/apps/penny-home-04.png',
  },
  {
    id: 'apart-01',
    titleKey: 'apart.title',
    descriptionKey: 'apart01.description',
    description2Key: 'apart01.description2',
    image: '/apps/apart-01.png',
  },
  {
    id: 'apart-02',
    titleKey: 'apart.title',
    descriptionKey: 'apart02.description',
    image: '/apps/apart-02.png',
  },
  {
    id: 'apart-03',
    titleKey: 'apart.title',
    descriptionKey: 'apart03.description',
    image: '/apps/apart-03.png',
  },
  {
    id: 'apart-04',
    titleKey: 'apart.title',
    descriptionKey: 'apart04.description',
    image: '/apps/apart-04.png',
  },
]
