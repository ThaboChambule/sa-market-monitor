"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1,
  className = "",
}: AnimatedCounterProps) {
  const springValue = useSpring(0, { duration: duration * 1000 })
  const displayValue = useTransform(springValue, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`
  })

  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  return <motion.span className={className}>{displayValue}</motion.span>
}

