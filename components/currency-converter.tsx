"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const exchangeRates = {
  USD: 18.45,
  EUR: 20.12,
  GBP: 23.67,
  AUD: 12.34,
  CAD: 13.56,
  JPY: 0.13,
  CNY: 2.56,
  ZAR: 1,
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("ZAR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState(0)
  const [isConverting, setIsConverting] = useState(false)

  const handleConvert = () => {
    setIsConverting(true)

    // Add a small delay to show the animation
    setTimeout(() => {
      // Convert to ZAR first if not already ZAR
      const amountInZAR = fromCurrency === "ZAR" ? amount : amount * exchangeRates[fromCurrency]

      // Then convert from ZAR to target currency
      const convertedAmount = toCurrency === "ZAR" ? amountInZAR : amountInZAR / exchangeRates[toCurrency]

      setResult(convertedAmount)
      setIsConverting(false)
    }, 500)
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <div className="grid grid-cols-4 gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            className="col-span-2 border-emerald-500/20 focus-visible:ring-emerald-500/30"
          />
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="border-emerald-500/20 focus:ring-emerald-500/30">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(exchangeRates).map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="border-emerald-500/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
          >
            <motion.div animate={{ rotate: fromCurrency !== toCurrency ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowRightLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2 relative">
            <Input
              type="number"
              value={result.toFixed(2)}
              readOnly
              className="w-full border-emerald-500/20 focus-visible:ring-emerald-500/30"
            />
            {isConverting && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="h-5 w-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              </div>
            )}
          </div>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="border-emerald-500/20 focus:ring-emerald-500/30">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(exchangeRates).map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleConvert}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            Convert
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          Exchange Rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)}{" "}
          {toCurrency}
        </p>
      </div>
    </div>
  )
}

