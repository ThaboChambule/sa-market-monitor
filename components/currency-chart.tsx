"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function CurrencyChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Sample data for USD/ZAR over 30 days
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toLocaleDateString("en-ZA", { month: "short", day: "numeric" })
    })

    // Generate some realistic looking exchange rate data
    const baseRate = 18.45
    const rates = Array.from({ length: 30 }, (_, i) => {
      // Create some volatility but with a slight upward trend
      const volatility = Math.random() * 0.4 - 0.2
      const trend = i * 0.01
      return baseRate + volatility + trend
    })

    // Chart dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find min and max for scaling
    const minRate = Math.min(...rates) * 0.995
    const maxRate = Math.max(...rates) * 1.005

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#94a3b8"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (height - 2 * padding) * (i / gridLines)
      const value = maxRate - (maxRate - minRate) * (i / gridLines)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(value.toFixed(2), padding - 5, y + 3)
    }

    // Draw x-axis labels (dates)
    ctx.textAlign = "center"
    const labelInterval = Math.ceil(dates.length / 10) // Show ~10 labels

    for (let i = 0; i < dates.length; i += labelInterval) {
      const x = padding + (width - 2 * padding) * (i / (dates.length - 1))
      ctx.fillText(dates[i], x, height - padding + 15)
    }

    // Animated drawing of the line chart
    let currentPoint = 0
    const totalPoints = rates.length

    function drawNextPoint() {
      if (currentPoint >= totalPoints) {
        // Add gradient fill under the line
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)")
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

        ctx.fillStyle = gradient
        ctx.lineTo(width - padding, height - padding)
        ctx.lineTo(padding, height - padding)
        ctx.closePath()
        ctx.fill()

        // Add data points
        for (let i = 0; i < rates.length; i++) {
          const x = padding + (width - 2 * padding) * (i / (rates.length - 1))
          const y = padding + (height - 2 * padding) * (1 - (rates[i] - minRate) / (maxRate - minRate))

          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = "#10b981"
          ctx.fill()
        }

        setIsLoaded(true)
        return
      }

      const x = padding + (width - 2 * padding) * (currentPoint / (rates.length - 1))
      const y = padding + (height - 2 * padding) * (1 - (rates[currentPoint] - minRate) / (maxRate - minRate))

      if (currentPoint === 0) {
        ctx.beginPath()
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 2
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      currentPoint++
      requestAnimationFrame(drawNextPoint)
    }

    // Start the animation
    drawNextPoint()

    // Add chart title
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "#0f172a"
    ctx.textAlign = "center"
    ctx.fillText("USD/ZAR Exchange Rate - 30 Day Trend", width / 2, 20)
  }, [])

  return (
    <div className="w-full aspect-[2/1] relative">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-2" />
            <span className="text-sm text-muted-foreground">Loading chart data...</span>
          </div>
        </div>
      )}

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-10 right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
        >
          <div className="text-xs font-medium">30-Day Change</div>
          <div className="text-sm font-bold text-emerald-500">+0.31%</div>
        </motion.div>
      )}
    </div>
  )
}

