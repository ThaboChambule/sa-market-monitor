"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Download, 
  LineChart, 
  MoreHorizontal, 
  Search, 
  Star,
  StarOff
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CurrencyConverter } from "@/components/currency-converter"
import { CurrencyChart } from "@/components/currency-chart"

// Sample currency data - In a real application, this would come from an API
const currencyData = [
  {
    code: "USD",
    name: "US Dollar",
    rate: 18.45,
    change: 0.23,
    changePercent: 1.26,
    bid: 18.43,
    ask: 18.47,
    high: 18.52,
    low: 18.38,
    volume: "783.2M",
    isFavorite: true,
    flag: "US"
  },
  {
    code: "EUR",
    name: "Euro",
    rate: 19.87,
    change: 0.18,
    changePercent: 0.91,
    bid: 19.85,
    ask: 19.89,
    high: 19.95,
    low: 19.81,
    volume: "624.5M",
    isFavorite: true,
    flag: "EU"
  },
  {
    code: "GBP",
    name: "British Pound",
    rate: 22.65,
    change: -0.12,
    changePercent: -0.53,
    bid: 22.63,
    ask: 22.67,
    high: 22.78,
    low: 22.60,
    volume: "412.8M",
    isFavorite: true,
    flag: "GB"
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    rate: 2.68,
    change: 0.08,
    changePercent: 3.07,
    bid: 2.67,
    ask: 2.69,
    high: 2.71,
    low: 2.67,
    volume: "328.6M",
    isFavorite: false,
    flag: "CN"
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    rate: 0.12,
    change: -0.001,
    changePercent: -0.83,
    bid: 0.119,
    ask: 0.121,
    high: 0.122,
    low: 0.119,
    volume: "218.4M",
    isFavorite: false,
    flag: "JP"
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    rate: 12.15,
    change: 0.05,
    changePercent: 0.41,
    bid: 12.13,
    ask: 12.17,
    high: 12.22,
    low: 12.10,
    volume: "156.7M",
    isFavorite: false,
    flag: "AU"
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    rate: 13.52,
    change: 0.07,
    changePercent: 0.52,
    bid: 13.50,
    ask: 13.54,
    high: 13.57,
    low: 13.48,
    volume: "142.3M",
    isFavorite: false,
    flag: "CA"
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    rate: 20.13,
    change: -0.18,
    changePercent: -0.89,
    bid: 20.11,
    ask: 20.15,
    high: 20.27,
    low: 20.09,
    volume: "98.5M",
    isFavorite: false,
    flag: "CH"
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    rate: 11.23,
    change: 0.04,
    changePercent: 0.36,
    bid: 11.21,
    ask: 11.25,
    high: 11.30,
    low: 11.20,
    volume: "64.9M",
    isFavorite: false,
    flag: "NZ"
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    rate: 13.78,
    change: 0.06,
    changePercent: 0.44,
    bid: 13.76,
    ask: 13.80,
    high: 13.82,
    low: 13.72,
    volume: "72.1M",
    isFavorite: false,
    flag: "SG"
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    rate: 2.36,
    change: 0.02,
    changePercent: 0.85,
    bid: 2.35,
    ask: 2.37,
    high: 2.38,
    low: 2.35,
    volume: "92.4M",
    isFavorite: false,
    flag: "HK"
  },
  {
    code: "BWP",
    name: "Botswana Pula",
    rate: 1.37,
    change: -0.01,
    changePercent: -0.72,
    bid: 1.36,
    ask: 1.38,
    high: 1.39,
    low: 1.36,
    volume: "45.2M",
    isFavorite: false,
    flag: "BW"
  },
  {
    code: "NAD",
    name: "Namibian Dollar",
    rate: 1.00,
    change: 0.00,
    changePercent: 0.00,
    bid: 0.99,
    ask: 1.01,
    high: 1.01,
    low: 0.99,
    volume: "36.8M",
    isFavorite: false,
    flag: "NA"
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    rate: 0.14,
    change: -0.002,
    changePercent: -1.41,
    bid: 0.139,
    ask: 0.141,
    high: 0.143,
    low: 0.139,
    volume: "28.3M",
    isFavorite: false,
    flag: "KE"
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    rate: 0.012,
    change: -0.0005,
    changePercent: -4.00,
    bid: 0.0119,
    ask: 0.0121,
    high: 0.0125,
    low: 0.0119,
    volume: "32.7M",
    isFavorite: false,
    flag: "NG"
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    rate: 1.28,
    change: -0.04,
    changePercent: -3.03,
    bid: 1.27,
    ask: 1.29,
    high: 1.32,
    low: 1.27,
    volume: "18.9M",
    isFavorite: false,
    flag: "GH"
  },
  {
    code: "ARS",
    name: "Argentine Peso",
    rate: 0.021,
    change: -0.001,
    changePercent: -4.55,
    bid: 0.020,
    ask: 0.022,
    high: 0.023,
    low: 0.020,
    volume: "12.5M",
    isFavorite: false,
    flag: "AR"
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    rate: 3.37,
    change: -0.05,
    changePercent: -1.46,
    bid: 3.36,
    ask: 3.38,
    high: 3.42,
    low: 3.35,
    volume: "56.3M",
    isFavorite: false,
    flag: "BR"
  },
  {
    code: "INR",
    name: "Indian Rupee",
    rate: 0.22,
    change: 0.003,
    changePercent: 1.38,
    bid: 0.219,
    ask: 0.221,
    high: 0.222,
    low: 0.218,
    volume: "147.6M",
    isFavorite: false,
    flag: "IN"
  }
];

// Sample historical data for the currency chart
const historicalData = [
  { date: "Apr 1", rate: 18.15 },
  { date: "Apr 2", rate: 18.23 },
  { date: "Apr 3", rate: 18.28 },
  { date: "Apr 4", rate: 18.32 },
  { date: "Apr 5", rate: 18.27 },
  { date: "Apr 6", rate: 18.21 },
  { date: "Apr 7", rate: 18.25 },
  { date: "Apr 8", rate: 18.29 },
  { date: "Apr 9", rate: 18.35 },
  { date: "Apr 10", rate: 18.42 },
  { date: "Apr 11", rate: 18.38 },
  { date: "Apr 12", rate: 18.32 },
  { date: "Apr 13", rate: 18.37 },
  { date: "Apr 14", rate: 18.41 },
  { date: "Apr 15", rate: 18.45 },
  { date: "Apr 16", rate: 18.42 },
  { date: "Apr 17", rate: 18.38 },
  { date: "Apr 18", rate: 18.40 },
  { date: "Apr 19", rate: 18.43 },
  { date: "Apr 20", rate: 18.45 }
];

export default function CurrencyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [currencyRates, setCurrencyRates] = useState(currencyData);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  
  // Filter currencies based on search query and favorites filter
  const filteredCurrencies = currencyRates.filter(currency => {
    const matchesSearch = searchQuery === "" || 
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      currency.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFavorites = !favoritesOnly || currency.isFavorite;
    
    return matchesSearch && matchesFavorites;
  });

  // Toggle favorite status
  const toggleFavorite = (code: string) => {
    setCurrencyRates(currencyRates.map(currency => 
      currency.code === code ? { ...currency, isFavorite: !currency.isFavorite } : currency
    ));
  };

  // Get the currently selected currency data
  const selectedCurrencyData = currencyRates.find(c => c.code === selectedCurrency) || currencyRates[0];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs navigation */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Currency Rates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-muted">ZAR</Badge>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">South African Rand Exchange Rates</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Live currency rates for the South African Rand (ZAR) against major global currencies. 
              Track performance, analyze trends, and convert between currencies.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Rates
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Historical Data
            </Button>
          </div>
        </div>

        {/* Main Currency Converter */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>Convert between ZAR and other currencies</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <CurrencyConverter />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Major Rates</CardTitle>
                  <CardDescription>Key exchange rates against ZAR</CardDescription>
                </div>
                <Badge variant="outline" className="bg-muted">
                  <Clock className="mr-1 h-3 w-3" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {currencyData
                  .filter(c => ["USD", "EUR", "GBP", "CNY", "JPY", "AUD"].includes(c.code))
                  .map(currency => (
                    <div key={currency.code} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={`bg-${currency.code.toLowerCase() === "eur" ? "blue" : "muted"}-100 text-${currency.code.toLowerCase() === "eur" ? "blue" : "muted"}-600 text-xs`}>
                            {currency.flag}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{currency.code}/ZAR</span>
                      </div>
                      <div className="mt-1">
                        <div className="text-lg font-bold">{currency.rate.toFixed(2)}</div>
                        <div className={`flex items-center text-xs ${currency.changePercent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                          {currency.changePercent >= 0 ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(currency.changePercent).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filter and Search Controls */}
        <Card className="mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search currencies..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant={favoritesOnly ? "default" : "outline"}
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className="flex gap-2"
                >
                  {favoritesOnly ? (
                    <>
                      <Star className="h-4 w-4" />
                      Favorites
                    </>
                  ) : (
                    <>
                      <StarOff className="h-4 w-4" />
                      All Currencies
                    </>
                  )}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Sort By
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Name (A to Z)</DropdownMenuItem>
                    <DropdownMenuItem>Name (Z to A)</DropdownMenuItem>
                    <DropdownMenuItem>Rate (Highest)</DropdownMenuItem>
                    <DropdownMenuItem>Rate (Lowest)</DropdownMenuItem>
                    <DropdownMenuItem>% Change (Highest)</DropdownMenuItem>
                    <DropdownMenuItem>% Change (Lowest)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Currency Rates Table */}
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Currency Exchange Rates</CardTitle>
                <Badge variant="outline" className="bg-muted/30 font-normal">
                  {filteredCurrencies.length} of {currencyRates.length} currencies
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead className="text-right">Rate (ZAR)</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Bid</TableHead>
                    <TableHead className="text-right">Ask</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((currency) => (
                      <TableRow key={currency.code} className={`hover:bg-muted/50 ${selectedCurrency === currency.code ? 'bg-muted/40 border-l-4 border-emerald-500' : ''}`}>
                        <TableCell>
                          <button onClick={() => toggleFavorite(currency.code)}>
                            {currency.isFavorite ? (
                              <Star className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </TableCell>
                        <TableCell onClick={() => setSelectedCurrency(currency.code)} className="cursor-pointer">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="text-xs bg-muted">{currency.flag}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{currency.code}</div>
                              <div className="text-sm text-muted-foreground">{currency.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium" onClick={() => setSelectedCurrency(currency.code)} className="cursor-pointer">
                          {currency.rate.toFixed(4)}
                        </TableCell>
                        <TableCell className={`text-right ${currency.changePercent >= 0 ? "text-emerald-600" : "text-red-600"}`} onClick={() => setSelectedCurrency(currency.code)} className="cursor-pointer">
                          <div className="flex items-center justify-end">
                            {currency.changePercent >= 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(currency.changePercent).toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right" onClick={() => setSelectedCurrency(currency.code)} className="cursor-pointer">
                          {currency.bid.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right" onClick={() => setSelectedCurrency(currency.code)} className="cursor-pointer">
                          {currency.ask.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedCurrency(currency.code)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleFavorite(currency.code)}>
                                {currency.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>Historical Data</DropdownMenuItem>
                              <DropdownMenuItem>Set Alert</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No currencies found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <div className="text-xs text-muted-foreground">
                * Rates shown are indicative only and may differ from actual trading rates.
                Last updated: {new Date().toLocaleString()}
              </div>
            </CardFooter>
          </Card>
          
          {/* Currency Details Panel */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{selectedCurrencyData.flag}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedCurrencyData.code}/ZAR</CardTitle>
                    <CardDescription>{selectedCurrencyData.name}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleFavorite(selectedCurrencyData.code)}
                >
                  {selectedCurrencyData.isFavorite ? (
                    <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
                  ) : (
                    <StarOff className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold">{selectedCurrencyData.rate.toFixed(4)}</div>
                <div className={`text-lg font-medium ${selectedCurrencyData.changePercent >= 0 ? "text-emerald-500" : "text-red-500"} flex items-center`}>
                  {selectedCurrencyData.changePercent >= 0 ? (
                    <ArrowUp className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(selectedCurrencyData.changePercent).toFixed(2)}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground">Bid</div>
                  <div className="font-medium">{selectedCurrencyData.bid.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ask</div>
                  <div className="font-medium">{selectedCurrencyData.ask.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">24h High</div>
                  <div className="font-medium">{selectedCurrencyData.high.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">24h Low</div>
                  <div className="font-medium">{selectedCurrencyData.low.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div className="font-medium">{selectedCurrencyData.volume}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Updated</div>
                  <div className="font-medium">{new Date().toLocaleTimeString()}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="font-medium mb-2">1 month trend</div>
                <div className="h-40 bg-muted/40 rounded-md flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm">Interactive chart would be displayed here</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full">
                  <LineChart className="mr-2 h-4 w-4" />
                  View Detailed Chart
                </Button>
                <Button variant="outline" className="w-full">
                  Set Price Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Currency Info */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {/* Historical performance */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>ZAR Historical Performance</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      USD/ZAR
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>USD/ZAR</DropdownMenuItem>
                    <DropdownMenuItem>EUR/ZAR</DropdownMenuItem>
                    <DropdownMenuItem>GBP/ZAR</DropdownMenuItem>
                    <DropdownMenuItem>CNY/ZAR</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center">
                <CurrencyChart />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <div className="flex items-center justify-between w-full">
                <div className="text-xs text-muted-foreground">
                  Data from Apr 1, 2025 - Apr 20, 2025
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">1M</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">3M</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">6M</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">1Y</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">5Y</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Regional Currency Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Currency Performance</CardTitle>
              <CardDescription>ZAR performance against African currencies</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Currency</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">1 Day</TableHead>
                    <TableHead className="text-right">7 Day</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencyData.filter(c => ['BWP', 'NAD', 'KES', 'NGN', 'GHS'].includes(c.code)).map((currency) => (
                    <TableRow key={currency.code}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs">{currency.flag}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{currency.code}</div>
                            <div className="text-xs text-muted-foreground">{currency.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{currency.rate.toFixed(4)}</TableCell>
                      <TableCell className={`text-right ${currency.changePercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        <div className="flex items-center justify-end">
                          {currency.changePercent >= 0 ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(currency.changePercent).toFixed(2)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Mock 7-day data - in a real app this would be actual data */}
                        <div className={`flex items-center justify-end ${Math.random() > 0.5 ? "text-emerald-600" : "text-red-600"}`}>
                          {Math.random() > 0.5 ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                          )}
                          {(Math.random() * 5).toFixed(2)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Information about ZAR */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About the South African Rand (ZAR)</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              The South African rand (symbol: R; code: ZAR) is the official currency of South Africa. It is subdivided into 100 cents. 
              The rand was introduced in 1961, replacing the South African pound. The rand takes its name from the Witwatersrand 
              (literally "white waters' ridge"), the ridge upon which Johannesburg is built and where most of South Africa's gold deposits were found.
            </p>
            <p className="mb-4">
              The rand is issued by the South African Reserve Bank (SARB). Like many emerging market currencies, the rand is quite volatile and 
              sensitive to domestic political developments, global economic factors, and commodity prices, particularly gold and platinum, 
              of which South Africa is a major producer.
            </p>
            <p>
              South Africa maintains a floating exchange rate system, meaning that the value of the rand is determined by market forces. 
              The SARB may intervene in the foreign exchange markets to prevent excessive volatility or to build reserves, 
              but it does not actively try to influence the rand's value to achieve specific economic objectives.
            </p>
          </CardContent>
          <CardFooter className="border-t flex justify-between">
            <div className="text-xs text-muted-foreground">
              Source: South African Reserve Bank
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              View More Information
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}