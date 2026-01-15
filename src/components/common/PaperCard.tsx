import { Tape } from './Tape'
import styles from './PaperCard.module.css'

type TapeColor = 'yellow' | 'green' | 'pink' | 'blue' | 'beige'

interface PaperCardProps {
  children: React.ReactNode
  className?: string
  tapeColor?: TapeColor
  tapePosition?: 'top-left' | 'top-right' | 'top-center' | 'none'
  tapeRotation?: number
  variant?: 'default' | 'lined' | 'grid'
  hover?: boolean
}

export function PaperCard({
  children,
  className = '',
  tapeColor = 'yellow',
  tapePosition = 'top-center',
  tapeRotation = -3,
  variant = 'default',
  hover = true,
}: PaperCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className}`}>
      {tapePosition !== 'none' && (
        <Tape color={tapeColor} position={tapePosition} rotation={tapeRotation} />
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
