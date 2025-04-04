"use client"

import { useEffect, useRef, useState } from "react"

export function MarketPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create a grid of dots
    const dotSize = 2
    const spacing = 20
    const dots = []

    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        dots.push({
          x,
          y,
          size: dotSize,
          originalSize: dotSize,
          color: "#10b981",
          alpha: 0.3,
          originalAlpha: 0.3,
          pulse: Math.random() * 2 * Math.PI, // Random starting phase
          pulseSpeed: 0.05 + Math.random() * 0.05, // Random pulse speed
        })
      }
    }

    // Create "hotspots" that represent active trading areas
    const hotspots = [
      { x: width * 0.2, y: height * 0.3, strength: 50, active: true },
      { x: width * 0.7, y: height * 0.6, strength: 70, active: true },
      { x: width * 0.5, y: height * 0.2, strength: 40, active: false },
      { x: width * 0.8, y: height * 0.8, strength: 60, active: false },
    ]

    // Periodically activate/deactivate hotspots
    setInterval(() => {
      hotspots.forEach((hotspot) => {
        hotspot.active = Math.random() > 0.5
      })
    }, 3000)

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Update and draw dots
      dots.forEach((dot) => {
        // Update pulse
        dot.pulse += dot.pulseSpeed

        // Reset size and alpha
        dot.size = dot.originalSize
        dot.alpha = dot.originalAlpha

        // Apply hotspot effects
        hotspots.forEach((hotspot) => {
          if (!hotspot.active) return

          const dx = dot.x - hotspot.x
          const dy = dot.y - hotspot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < hotspot.strength) {
            const influence = 1 - distance / hotspot.strength
            dot.size += influence * 2
            dot.alpha += influence * 0.5
          }
        })

        // Apply pulse effect
        const pulseEffect = Math.sin(dot.pulse) * 0.5 + 0.5
        dot.size += pulseEffect

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${dot.alpha})`
        ctx.fill()
      })

      // Draw connections between nearby dots
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dot1 = dots[i]
          const dot2 = dots[j]

          const dx = dot1.x - dot2.x
          const dy = dot1.y - dot2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < spacing * 1.5) {
            ctx.beginPath()
            ctx.moveTo(dot1.x, dot1.y)
            ctx.lineTo(dot2.x, dot2.y)
            ctx.stroke()
          }
        }
      }

      // Draw hotspots
      hotspots.forEach((hotspot) => {
        if (!hotspot.active) return

        const gradient = ctx.createRadialGradient(hotspot.x, hotspot.y, 0, hotspot.x, hotspot.y, hotspot.strength)

        gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)")
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

        ctx.beginPath()
        ctx.arc(hotspot.x, hotspot.y, hotspot.strength, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()
    setIsLoaded(true)

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground">
        Visualizing real-time market activity across the JSE
      </div>
    </div>
  )
}

