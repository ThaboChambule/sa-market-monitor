"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample stock data
const stockData = [
  { symbol: "NPN", name: "Naspers Ltd", price: 3245.67, change: 1.2, volume: "2.3M", marketCap: "1.3T" },
  { symbol: "MTN", name: "MTN Group Ltd", price: 87.45, change: 4.2, volume: "5.1M", marketCap: "164.2B" },
  { symbol: "SBK", name: "Standard Bank Group", price: 156.78, change: 0.5, volume: "1.8M", marketCap: "267.5B" },
  { symbol: "FSR", name: "FirstRand Ltd", price: 67.32, change: -0.8, volume: "3.2M", marketCap: "378.1B" },
  { symbol: "SOL", name: "Sasol Ltd", price: 145.23, change: -2.8, volume: "2.7M", marketCap: "93.4B" },
  { symbol: "AGL", name: "Anglo American Plc", price: 567.89, change: 1.7, volume: "1.5M", marketCap: "756.2B" },
  { symbol: "SHP", name: "Shoprite Holdings Ltd", price: 234.56, change: 0.3, volume: "1.1M", marketCap: "132.8B" },
  { symbol: "VOD", name: "Vodacom Group Ltd", price: 123.45, change: -0.5, volume: "1.9M", marketCap: "225.6B" },
  { symbol: "AMS", name: "Anglo American Platinum", price: 1234.56, change: 2.1, volume: "0.8M", marketCap: "324.7B" },
  { symbol: "BID", name: "Bid Corporation Ltd", price: 345.67, change: 0.9, volume: "0.7M", marketCap: "116.3B" },
]

export function StockTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredRow, setHoveredRow] = useState(null)

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5">
        <CardTitle>JSE Top Stocks</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks..."
            className="w-full pl-8 border-emerald-500/20 focus-visible:ring-emerald-500/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted">
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price (ZAR)</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock, index) => (
                <motion.tr
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${hoveredRow === stock.symbol ? "bg-muted/30" : ""}`}
                  onMouseEnter={() => setHoveredRow(stock.symbol)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full mr-2 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {stock.symbol}
                    </div>
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right font-medium">{stock.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end ${stock.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUp className="mr-1 h-4 w-4 group-hover:animate-bounce" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4 group-hover:animate-bounce" />
                      )}
                      {Math.abs(stock.change)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{stock.volume}</TableCell>
                  <TableCell className="text-right">{stock.marketCap}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

