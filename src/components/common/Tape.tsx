import styles from './Tape.module.css'

type TapeColor = 'yellow' | 'green' | 'pink' | 'blue' | 'beige'
type TapePosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right'

interface TapeProps {
  color?: TapeColor
  position?: TapePosition
  rotation?: number
  className?: string
}

export function Tape({
  color = 'yellow',
  position = 'top-center',
  rotation = 0,
  className = '',
}: TapeProps) {
  const positionClass = styles[position.replace('-', '')] || styles.topcenter

  return (
    <span
      className={`${styles.tape} ${styles[color]} ${positionClass} ${className}`}
      style={{ '--tape-rotation': `${rotation}deg` } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}
