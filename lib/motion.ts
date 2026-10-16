import { Variants } from 'framer-motion'

export function createContainerVariants(
  staggerChildren = 0.1,
  delayChildren = 0.2
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

export function createItemVariants(options: {
  y?: number
  blur?: number
  duration?: number
} = {}): Variants {
  const { y = 24, blur = 6, duration = 0.6 } = options
  return {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }
}
