"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"

export function MarketOverview() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Card className="overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5">
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Live snapshot of South African markets</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item} className="flex flex-col space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">JSE All Share</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">73,456.21</div>
              <div className="flex items-center text-sm text-emerald-500">
                <TrendingUp className="mr-1 h-4 w-4 animate-pulse" />
                <span>+1.2%</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">USD/ZAR</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">18.45</div>
              <div className="flex items-center text-sm text-red-500">
                <TrendingUp className="mr-1 h-4 w-4 animate-pulse" />
                <span>+0.23%</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">Gold (ZAR)</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">34,567.89</div>
              <div className="flex items-center text-sm text-emerald-500">
                <TrendingUp className="mr-1 h-4 w-4 animate-pulse" />
                <span>+0.7%</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col space-y-1.5">
            <div className="text-sm font-medium text-muted-foreground">Market Sentiment</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">Bullish</div>
              <div className="flex items-center text-sm text-emerald-500">
                <ArrowUp className="mr-1 h-4 w-4 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <motion.div
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
            className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 p-3 shadow-sm transition-all duration-300"
          >
            <div className="text-sm font-medium">Top Gainer</div>
            <div className="text-lg font-bold">MTN</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowUp className="mr-1 h-3 w-3 animate-bounce" />
              <span>+4.2%</span>
            </div>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
            className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 p-3 shadow-sm transition-all duration-300"
          >
            <div className="text-sm font-medium">Top Loser</div>
            <div className="text-lg font-bold">Sasol</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDown className="mr-1 h-3 w-3 animate-bounce" />
              <span>-2.8%</span>
            </div>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
            className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 p-3 shadow-sm transition-all duration-300"
          >
            <div className="text-sm font-medium">Most Active</div>
            <div className="text-lg font-bold">Naspers</div>
            <div className="text-xs text-muted-foreground">12.5M shares</div>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
            className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 p-3 shadow-sm transition-all duration-300"
          >
            <div className="text-sm font-medium">Market Cap</div>
            <div className="text-lg font-bold">R15.7T</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowUp className="mr-1 h-3 w-3 animate-bounce" />
              <span>+0.9%</span>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

