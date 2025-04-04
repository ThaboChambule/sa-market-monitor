"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

const newsItems = [
  {
    id: 1,
    category: "stocks",
    title: "JSE All Share Index reaches new high amid global market optimism",
    summary:
      "The JSE All Share Index climbed to a record high today, driven by strong performances in the technology and financial sectors.",
    source: "Business Day",
    time: "2 hours ago",
    url: "#",
  },
  {
    id: 2,
    category: "currency",
    title: "Rand strengthens against dollar following positive economic data",
    summary:
      "The South African Rand gained ground against major currencies after better-than-expected manufacturing output data was released.",
    source: "Reuters",
    time: "4 hours ago",
    url: "#",
  },
  {
    id: 3,
    category: "economy",
    title: "South African Reserve Bank maintains interest rate at current levels",
    summary:
      "The SARB has decided to keep interest rates unchanged, citing concerns about inflation and economic growth prospects.",
    source: "Fin24",
    time: "Yesterday",
    url: "#",
  },
  {
    id: 4,
    category: "stocks",
    title: "Naspers shares surge following positive Tencent earnings",
    summary:
      "Shares in Naspers jumped over 5% today after its main investment, Tencent, reported strong quarterly results in China.",
    source: "Moneyweb",
    time: "Yesterday",
    url: "#",
  },
  {
    id: 5,
    category: "currency",
    title: "Analysts predict volatile period ahead for the Rand",
    summary:
      "Currency experts are warning of increased volatility for the ZAR in coming weeks due to global economic uncertainties and local political factors.",
    source: "Bloomberg",
    time: "2 days ago",
    url: "#",
  },
  {
    id: 6,
    category: "economy",
    title: "Mining sector shows signs of recovery as commodity prices rise",
    summary:
      "South Africa's mining sector is showing positive growth signals as global commodity prices continue their upward trend.",
    source: "Mining Weekly",
    time: "2 days ago",
    url: "#",
  },
]

export function MarketNews() {
  const [activeTab, setActiveTab] = useState("all")

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
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-muted/50 backdrop-blur rounded-xl p-1">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg transition-all"
        >
          All News
        </TabsTrigger>
        <TabsTrigger
          value="stocks"
          className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg transition-all"
        >
          Stocks
        </TabsTrigger>
        <TabsTrigger
          value="currency"
          className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg transition-all"
        >
          Currency
        </TabsTrigger>
        <TabsTrigger
          value="economy"
          className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg transition-all"
        >
          Economy
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {newsItems.map((item) => (
            <motion.div key={item.id} variants={item}>
              <NewsCard news={item} />
            </motion.div>
          ))}
        </motion.div>
      </TabsContent>
      <TabsContent value="stocks" className="mt-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {newsItems
            .filter((item) => item.category === "stocks")
            .map((item) => (
              <motion.div key={item.id} variants={item}>
                <NewsCard news={item} />
              </motion.div>
            ))}
        </motion.div>
      </TabsContent>
      <TabsContent value="currency" className="mt-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {newsItems
            .filter((item) => item.category === "currency")
            .map((item) => (
              <motion.div key={item.id} variants={item}>
                <NewsCard news={item} />
              </motion.div>
            ))}
        </motion.div>
      </TabsContent>
      <TabsContent value="economy" className="mt-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {newsItems
            .filter((item) => item.category === "economy")
            .map((item) => (
              <motion.div key={item.id} variants={item}>
                <NewsCard news={item} />
              </motion.div>
            ))}
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}

function NewsCard({ news }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5">
        <CardTitle className="line-clamp-2">{news.title}</CardTitle>
        <CardDescription className="flex items-center text-xs">
          <Clock className="mr-1 h-3 w-3" />
          {news.time} • {news.source}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{news.summary}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 pt-3">
        <Link
          href={news.url}
          className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center hover:underline group"
        >
          Read more <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

