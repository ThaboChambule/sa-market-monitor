"use client"

import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Globe, 
  Info,
  Mail, 
  Share2,
  TrendingUp, 
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AnimatedCounter } from "@/components/animated-counter";

// Sample stock data - In a real application, this would come from an API
const stockData = {
  "NPN": {
    name: "Naspers Ltd",
    price: 2875.45,
    change: 42.18,
    changePercent: 1.49,
    marketCap: "965.2B",
    volume: "1.2M",
    pe: 22.8,
    dividendYield: 0.25,
    sector: "Technology",
    description: "Naspers Limited is a multinational technology investor headquartered in South Africa. Founded in 1915, it operates in online classifieds, food delivery, payments, fintech, educational technology, and media.",
    performance: {
      day: 1.49,
      week: 2.3,
      month: -3.2,
      year: 15.7,
      ytd: 8.4,
    },
    keyStats: {
      open: 2833.27,
      high: 2880.15,
      low: 2825.62,
      close: 2875.45,
      volume: "1,245,678",
      avgVolume: "987,452",
      high52w: 3125.78,
      low52w: 2380.45,
      beta: 1.35,
      eps: 126.12,
    },
    chartData: [
      { date: "Apr 15", price: 2780.45 },
      { date: "Apr 16", price: 2795.20 },
      { date: "Apr 17", price: 2810.35 },
      { date: "Apr 18", price: 2800.15 },
      { date: "Apr 19", price: 2833.27 },
      { date: "Apr 20", price: 2875.45 },
    ]
  },
  "MTN": {
    name: "MTN Group Ltd",
    price: 156.78,
    change: 6.58,
    changePercent: 4.2,
    marketCap: "295.1B",
    volume: "2.5M",
    pe: 14.2,
    dividendYield: 2.8,
    sector: "Telecommunications",
    description: "MTN Group Limited is a South African multinational mobile telecommunications company operating in many African and Asian countries. It is one of the largest mobile network operators in Africa.",
    performance: {
      day: 4.2,
      week: 5.8,
      month: 7.3,
      year: 12.5,
      ytd: 10.2,
    },
    keyStats: {
      open: 150.20,
      high: 157.85,
      low: 149.75,
      close: 156.78,
      volume: "2,534,897",
      avgVolume: "1,987,562",
      high52w: 172.45,
      low52w: 132.80,
      beta: 0.95,
      eps: 11.04,
    },
    chartData: [
      { date: "Apr 15", price: 149.25 },
      { date: "Apr 16", price: 148.90 },
      { date: "Apr 17", price: 150.35 },
      { date: "Apr 18", price: 152.70 },
      { date: "Apr 19", price: 150.20 },
      { date: "Apr 20", price: 156.78 },
    ]
  },
  "SLM": {
    name: "Sanlam Ltd",
    price: 65.42,
    change: -0.83,
    changePercent: -1.25,
    marketCap: "145.6B",
    volume: "1.7M",
    pe: 12.5,
    dividendYield: 4.2,
    sector: "Financial Services",
    description: "Sanlam Limited is a South African financial services group headquartered in Cape Town, South Africa. It is listed on the Johannesburg Stock Exchange and provides business solutions within insurance, investments, and wealth management.",
    performance: {
      day: -1.25,
      week: -0.5,
      month: 2.7,
      year: 8.3,
      ytd: 3.9,
    },
    keyStats: {
      open: 66.25,
      high: 66.78,
      low: 65.20,
      close: 65.42,
      volume: "1,678,523",
      avgVolume: "1,456,789",
      high52w: 72.45,
      low52w: 58.75,
      beta: 0.85,
      eps: 5.23,
    },
    chartData: [
      { date: "Apr 15", price: 66.80 },
      { date: "Apr 16", price: 67.25 },
      { date: "Apr 17", price: 66.95 },
      { date: "Apr 18", price: 66.40 },
      { date: "Apr 19", price: 66.25 },
      { date: "Apr 20", price: 65.42 },
    ]
  },
  "SOL": {
    name: "Sasol Ltd",
    price: 145.26,
    change: -4.12,
    changePercent: -2.8,
    marketCap: "92.3B",
    volume: "3.1M",
    pe: 6.8,
    dividendYield: 3.5,
    sector: "Energy",
    description: "Sasol Limited is a South African integrated energy and chemical company. It develops and commercializes technologies, and builds and operates world-scale facilities to produce a range of product streams.",
    performance: {
      day: -2.8,
      week: -4.2,
      month: -6.5,
      year: -12.3,
      ytd: -8.7,
    },
    keyStats: {
      open: 149.38,
      high: 149.85,
      low: 144.95,
      close: 145.26,
      volume: "3,145,678",
      avgVolume: "2,567,890",
      high52w: 198.75,
      low52w: 142.30,
      beta: 1.75,
      eps: 21.36,
    },
    chartData: [
      { date: "Apr 15", price: 152.45 },
      { date: "Apr 16", price: 151.20 },
      { date: "Apr 17", price: 149.35 },
      { date: "Apr 18", price: 150.70 },
      { date: "Apr 19", price: 149.38 },
      { date: "Apr 20", price: 145.26 },
    ]
  }
};

export default function StockDetailsPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  
  // Default to NPN if symbol not found
  const stock = stockData[symbol] || stockData.NPN;
  
  const isPositiveChange = stock.change >= 0;
  
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
                <BreadcrumbLink href="/stocks">Stocks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{symbol}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8">
        {/* Stock Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-muted">{stock.sector}</Badge>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">{stock.name} ({symbol})</h1>
            
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold mr-3">R{stock.price.toLocaleString('en-ZA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</span>
              <div className={`flex items-center ${isPositiveChange ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositiveChange ? (
                  <ArrowUp className="mr-1 h-5 w-5" />
                ) : (
                  <ArrowDown className="mr-1 h-5 w-5" />
                )}
                <span className="text-lg font-medium">
                  R{Math.abs(stock.change).toLocaleString('en-ZA', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ({Math.abs(stock.changePercent).toLocaleString('en-ZA', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Set Alert
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Market Cap</div>
              <div className="text-lg font-bold">R{stock.marketCap}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Volume</div>
              <div className="text-lg font-bold">{stock.volume}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">P/E Ratio</div>
              <div className="text-lg font-bold">{stock.pe}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">52-Week High</div>
              <div className="text-lg font-bold">R{stock.keyStats.high52w}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">52-Week Low</div>
              <div className="text-lg font-bold">R{stock.keyStats.low52w}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Dividend Yield</div>
              <div className="text-lg font-bold">{stock.dividendYield}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full grid grid-cols-4 md:w-auto md:inline-flex p-1 bg-muted/50 backdrop-blur rounded-xl mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">
              Overview
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">
              Charts
            </TabsTrigger>
            <TabsTrigger value="financials" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">
              Financials
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all">
              News
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{stock.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Sector</h4>
                      <p className="font-medium">{stock.sector}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Beta</h4>
                      <p className="font-medium">{stock.keyStats.beta}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">EPS (TTM)</h4>
                      <p className="font-medium">R{stock.keyStats.eps}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Day</span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${stock.performance.day >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.performance.day >= 0 ? '+' : ''}{stock.performance.day}%
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${stock.performance.day >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(stock.performance.day) * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Week</span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${stock.performance.week >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.performance.week >= 0 ? '+' : ''}{stock.performance.week}%
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${stock.performance.week >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(stock.performance.week) * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Month</span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${stock.performance.month >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.performance.month >= 0 ? '+' : ''}{stock.performance.month}%
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${stock.performance.month >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(stock.performance.month) * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">YTD</span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${stock.performance.ytd >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.performance.ytd >= 0 ? '+' : ''}{stock.performance.ytd}%
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${stock.performance.ytd >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(stock.performance.ytd) * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Year</span>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-medium ${stock.performance.year >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.performance.year >= 0 ? '+' : ''}{stock.performance.year}%
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${stock.performance.year >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(Math.abs(stock.performance.year) * 5, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Open</h4>
                      <p className="font-medium">R{stock.keyStats.open}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Previous Close</h4>
                      <p className="font-medium">R{stock.keyStats.close}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Day High</h4>
                      <p className="font-medium">R{stock.keyStats.high}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Day Low</h4>
                      <p className="font-medium">R{stock.keyStats.low}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Volume</h4>
                      <p className="font-medium">{stock.keyStats.volume}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Avg. Volume</h4>
                      <p className="font-medium">{stock.keyStats.avgVolume}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Related Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.keys(stockData).filter(s => s !== symbol).slice(0, 4).map(s => {
                      const relatedStock = stockData[s];
                      const isPositive = relatedStock.change >= 0;
                      
                      return (
                        <Link key={s} href={`/stocks/${s}`} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md transition-colors">
                          <div>
                            <div className="font-medium">{s}</div>
                            <div className="text-sm text-muted-foreground">{relatedStock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">R{relatedStock.price}</div>
                            <div className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                              {isPositive ? '+' : ''}{relatedStock.changePercent}%
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Charts Tab */}
          <TabsContent value="charts">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Price Chart</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">1D</Button>
                    <Button variant="outline" size="sm" className="text-xs bg-emerald-600 text-white hover:bg-emerald-700">1W</Button>
                    <Button variant="outline" size="sm" className="text-xs">1M</Button>
                    <Button variant="outline" size="sm" className="text-xs">3M</Button>
                    <Button variant="outline" size="sm" className="text-xs">1Y</Button>
                    <Button variant="outline" size="sm" className="text-xs">5Y</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center bg-muted/30">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Interactive chart would be displayed here.</p>
                  <p className="text-muted-foreground text-sm">Using a charting library like Recharts, ApexCharts or TradingView.</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                      <span>RSI (14)</span>
                      <Badge variant={stock.changePercent > 0 ? "default" : "destructive"}>
                        {stock.changePercent > 0 ? "58.12 - Neutral" : "35.21 - Oversold"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                      <span>MACD</span>
                      <Badge variant={stock.changePercent > 0 ? "default" : "destructive"}>
                        {stock.changePercent > 0 ? "Bullish" : "Bearish"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                      <span>Moving Avg (50)</span>
                      <Badge>Neutral</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                      <span>Moving Avg (200)</span>
                      <Badge variant={stock.changePercent > 0 ? "default" : "destructive"}>
                        {stock.changePercent > 0 ? "Above" : "Below"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
                      <span>Bollinger Bands</span>
                      <Badge>{stock.changePercent > 0 ? "Upper Band" : "Lower Band"}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Volume Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center bg-muted/30">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Volume chart would be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Financials Tab */}
          <TabsContent value="financials">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Financial Summary</CardTitle>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Reports
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Financial Metric</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">2025 Q1</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">2024 Q4</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">2024 Q3</th>
                          <th className="text-right p-3 text-sm font-medium text-muted-foreground">2024 Q2</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 text-sm">Revenue (millions)</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 10000 + 20000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 10000 + 20000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 10000 + 20000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 10000 + 20000).toFixed(2)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm">Net Income (millions)</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 2000 + 3000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 2000 + 3000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 2000 + 3000).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 2000 + 3000).toFixed(2)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm">EPS (Rand)</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 5 + 10).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 5 + 10).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 5 + 10).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 5 + 10).toFixed(2)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm">Operating Margin</td>
                          <td className="p-3 text-right text-sm font-medium">{(Math.random() * 10 + 15).toFixed(2)}%</td>
                          <td className="p-3 text-right text-sm font-medium">{(Math.random() * 10 + 15).toFixed(2)}%</td>
                          <td className="p-3 text-right text-sm font-medium">{(Math.random() * 10 + 15).toFixed(2)}%</td>
                          <td className="p-3 text-right text-sm font-medium">{(Math.random() * 10 + 15).toFixed(2)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm">Free Cash Flow (millions)</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 1500 + 2500).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 1500 + 2500).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 1500 + 2500).toFixed(2)}</td>
                          <td className="p-3 text-right text-sm font-medium">R{(Math.random() * 1500 + 2500).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dividend History</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                            <th className="text-right p-3 text-sm font-medium text-muted-foreground">Amount</th>
                            <th className="text-right p-3 text-sm font-medium text-muted-foreground">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 text-sm">Mar 15, 2025</td>
                            <td className="p-3 text-right text-sm font-medium">R2.75</td>
                            <td className="p-3 text-right text-sm font-medium">Final</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 text-sm">Sep 12, 2024</td>
                            <td className="p-3 text-right text-sm font-medium">R3.10</td>
                            <td className="p-3 text-right text-sm font-medium">Interim</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 text-sm">Mar 18, 2024</td>
                            <td className="p-3 text-right text-sm font-medium">R2.85</td>
                            <td className="p-3 text-right text-sm font-medium">Final</td>
                          </tr>
                          <tr>
                            <td className="p-3 text-sm">Sep 15, 2023</td>
                            <td className="p-3 text-right text-sm font-medium">R2.50</td>
                            <td className="p-3 text-right text-sm font-medium">Interim</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                        <Calendar className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Q2 2025 Earnings Release</h4>
                          <p className="text-sm text-muted-foreground">May 15, 2025 - 10:00 AM SAST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                        <Calendar className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Annual General Meeting</h4>
                          <p className="text-sm text-muted-foreground">June 8, 2025 - 2:00 PM SAST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                        <Calendar className="h-5 w-5 text-emerald-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Dividend Payment Date</h4>
                          <p className="text-sm text-muted-foreground">June 25, 2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Latest News</CardTitle>
                  <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    All News
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* News Item 1 */}
                  <div className="flex flex-col md:flex-row gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="md:w-32 h-20 bg-muted rounded-md shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-1">{stock.name} Reports Strong Q1 Earnings, Exceeding Analyst Expectations</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {stock.name} announced its Q1 2025 results, with revenue climbing 15% year-over-year and net income up 22%, surpassing market expectations.
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Business Day</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>3 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* News Item 2 */}
                  <div className="flex flex-col md:flex-row gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="md:w-32 h-20 bg-muted rounded-md shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-1">{stock.name} Expands Operations with New R1.2 Billion Investment</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        The company announced a significant expansion of its operations in Southern Africa with a new R1.2 billion investment initiative aimed at strengthening its market position.
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Financial Mail</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* News Item 3 */}
                  <div className="flex flex-col md:flex-row gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="md:w-32 h-20 bg-muted rounded-md shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-1">Analyst Upgrade: {stock.name} Receives "Buy" Rating from Major Investment Bank</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        Leading investment bank raises outlook for {stock.name}, citing strong fundamentals and promising growth prospects in emerging markets.
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Moneyweb</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* News Item 4 */}
                  <div className="flex flex-col md:flex-row gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="md:w-32 h-20 bg-muted rounded-md shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-1">{stock.name} Announces Strategic Partnership to Enhance Digital Services</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        The company is partnering with a leading technology firm to enhance its digital service offerings and improve customer experience across all channels.
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">TechCentral</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-muted/30 py-4">
                <Button variant="outline">Load More News</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="mt-10 text-xs text-muted-foreground border-t pt-6">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              Disclaimer: The information provided is for informational purposes only and should not be considered as investment advice. 
              Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal.
              Always conduct your own research or consult with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}