"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/10 dark:bg-emerald-500/5"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      <div className="container relative pt-24 pb-20 md:pt-36 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 text-sm text-emerald-600 dark:text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              Live Market Data
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Unlocking Africa's</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
                Financial Potential
              </span>
            </h1>

            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Your premier destination for real-time JSE stocks, ZAR currency rates, and comprehensive market analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Explore Markets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
              >
                Market Analysis
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                Real-time data
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                Expert analysis
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                Market insights
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-2 shadow-2xl">
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />

              <div className="relative h-full rounded-xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <span className="font-bold">Market Pulse</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Live</div>
                </div>

                <div className="space-y-6">
                  {/* Animated chart lines */}
                  <div className="h-40 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0,100 C50,80 100,120 150,100 C200,80 250,110 300,90 C350,70 400,85 400,75"
                        fill="none"
                        stroke="url(#gradient1)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#0d9488" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <motion.div
                      className="absolute right-0 top-[75px] h-4 w-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 2, duration: 0.5 }}
                    />
                  </div>

                  {/* Market stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 p-3"
                    >
                      <div className="text-xs text-muted-foreground">JSE All Share</div>
                      <div className="text-lg font-bold">73,456.21</div>
                      <div className="flex items-center text-xs text-emerald-500">
                        <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                        +1.2%
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 p-3"
                    >
                      <div className="text-xs text-muted-foreground">USD/ZAR</div>
                      <div className="text-lg font-bold">18.45</div>
                      <div className="flex items-center text-xs text-emerald-500">
                        <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                        +0.23%
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-sm font-bold">R15.7T</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -top-6 -right-6 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Trading Vol</div>
                  <div className="text-sm font-bold">2.7B</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

