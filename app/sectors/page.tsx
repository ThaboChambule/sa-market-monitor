"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowDown, 
  ArrowUp, 
  ArrowUpDown,
  BarChart3, 
  Calendar, 
  ChevronDown, 
  Download, 
  Filter,
  LayoutGrid, 
  LineChart, 
  PieChart, 
  SlidersHorizontal
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample sector data
const sectorData = [
  {
    id: "fin",
    name: "Financial Services",
    description: "Banks, insurance companies, and financial institutions",
    performance: {
      daily: 1.2,
      weekly: 2.8,
      monthly: -1.7,
      yearly: 15.6,
      ytd: 12.4
    },
    marketCap: 2784.5,
    volume: "6.8B",
    companies: [
      { symbol: "SBK", name: "Standard Bank Group Ltd", price: 187.35, change: 2.15, changePercent: 1.16 },
      { symbol: "FSR", name: "FirstRand Ltd", price: 68.42, change: 0.37, changePercent: 0.54 },
      { symbol: "NED", name: "Nedbank Group Ltd", price: 245.16, change: 4.38, changePercent: 1.82 },
      { symbol: "CPI", name: "Capitec Bank Ltd", price: 1895.67, change: 28.43, changePercent: 1.52 },
      { symbol: "DSY", name: "Discovery Ltd", price: 142.78, change: 2.14, changePercent: 1.52 },
    ],
    color: "#3B82F6" // blue
  },
  {
    id: "res",
    name: "Resources & Mining",
    description: "Mining companies, metal producers, and resource extractors",
    performance: {
      daily: -0.8,
      weekly: -2.3,
      monthly: 4.9,
      yearly: 8.3,
      ytd: 6.7
    },
    marketCap: 3562.1,
    volume: "8.2B",
    companies: [
      { symbol: "AGL", name: "Anglo American Plc", price: 546.21, change: -12.34, changePercent: -2.21 },
      { symbol: "BHP", name: "BHP Group Ltd", price: 448.92, change: -5.83, changePercent: -1.28 },
      { symbol: "ANG", name: "AngloGold Ashanti Ltd", price: 315.76, change: 7.23, changePercent: 2.34 },
      { symbol: "IMP", name: "Impala Platinum Ltd", price: 124.52, change: -4.28, changePercent: -3.32 },
      { symbol: "GFI", name: "Gold Fields Ltd", price: 187.44, change: 6.43, changePercent: 3.55 },
    ],
    color: "#EF4444" // red
  },
  {
    id: "ind",
    name: "Industrial",
    description: "Manufacturing, construction, logistics, and industrial companies",
    performance: {
      daily: 0.6,
      weekly: 1.8,
      monthly: 3.2,
      yearly: 7.8,
      ytd: 4.5
    },
    marketCap: 1428.3,
    volume: "3.5B",
    companies: [
      { symbol: "BVT", name: "Bidvest Group Ltd", price: 215.36, change: 1.45, changePercent: 0.68 },
      { symbol: "KIO", name: "Kumba Iron Ore Ltd", price: 587.24, change: -8.52, changePercent: -1.43 },
      { symbol: "BAW", name: "Barloworld Ltd", price: 94.68, change: 0.75, changePercent: 0.8 },
      { symbol: "IPL", name: "Imperial Logistics Ltd", price: 72.35, change: -0.46, changePercent: -0.63 },
      { symbol: "TXT", name: "Textainer Group Holdings Ltd", price: 45.82, change: 0.37, changePercent: 0.81 },
    ],
    color: "#F59E0B" // amber
  },
  {
    id: "con",
    name: "Consumer Goods",
    description: "Food producers, retailers, and consumer product manufacturers",
    performance: {
      daily: 0.4,
      weekly: -0.6,
      monthly: 2.4,
      yearly: 12.5,
      ytd: 9.3
    },
    marketCap: 1872.6,
    volume: "4.2B",
    companies: [
      { symbol: "SHP", name: "Shoprite Holdings Ltd", price: 214.33, change: 3.45, changePercent: 1.63 },
      { symbol: "TBS", name: "Tiger Brands Ltd", price: 184.25, change: 2.15, changePercent: 1.18 },
      { symbol: "WHL", name: "Woolworths Holdings Ltd", price: 62.47, change: 1.23, changePercent: 2.01 },
      { symbol: "MRP", name: "Mr Price Group Ltd", price: 178.93, change: -2.34, changePercent: -1.29 },
      { symbol: "PIK", name: "Pick n Pay Stores Ltd", price: 52.68, change: -0.32, changePercent: -0.6 },
    ],
    color: "#10B981" // emerald
  },
  {
    id: "tel",
    name: "Telecommunications",
    description: "Telecom providers, network operators, and communication services",
    performance: {
      daily: 1.5,
      weekly: 3.2,
      monthly: -0.7,
      yearly: 5.6,
      ytd: 3.8
    },
    marketCap: 985.7,
    volume: "2.8B",
    companies: [
      { symbol: "MTN", name: "MTN Group Ltd", price: 156.78, change: 6.58, changePercent: 4.2 },
      { symbol: "VOD", name: "Vodacom Group Ltd", price: 115.67, change: 1.28, changePercent: 1.12 },
      { symbol: "TKG", name: "Telkom SA SOC Ltd", price: 34.56, change: 0.87, changePercent: 2.58 },
      { symbol: "BLU", name: "Blue Label Telecoms Ltd", price: 5.27, change: 0.08, changePercent: 1.54 },
      { symbol: "SNT", name: "Santova Ltd", price: 3.12, change: -0.04, changePercent: -1.27 },
    ],
    color: "#8B5CF6" // violet
  },
  {
    id: "hea",
    name: "Healthcare",
    description: "Healthcare providers, pharmaceutical companies, and medical equipment manufacturers",
    performance: {
      daily: 0.9,
      weekly: 4.6,
      monthly: 7.3,
      yearly: 18.4,
      ytd: 15.2
    },
    marketCap: 725.4,
    volume: "1.7B",
    companies: [
      { symbol: "MEI", name: "Mediclinic International Ltd", price: 104.56, change: 1.87, changePercent: 1.82 },
      { symbol: "NTC", name: "Netcare Ltd", price: 16.75, change: 0.45, changePercent: 2.76 },
      { symbol: "APN", name: "Aspen Pharmacare Holdings Ltd", price: 187.29, change: 3.42, changePercent: 1.86 },
      { symbol: "ADH", name: "Adcock Ingram Holdings Ltd", price: 54.37, change: 0.67, changePercent: 1.25 },
      { symbol: "LHC", name: "Life Healthcare Group Holdings Ltd", price: 24.35, change: -0.18, changePercent: -0.73 },
    ],
    color: "#EC4899" // pink
  },
  {
    id: "rea",
    name: "Real Estate",
    description: "Property developers, REITs, and real estate management companies",
    performance: {
      daily: -0.2,
      weekly: -1.4,
      monthly: -3.8,
      yearly: -8.7,
      ytd: -5.3
    },
    marketCap: 682.3,
    volume: "1.5B",
    companies: [
      { symbol: "GRT", name: "Growthpoint Properties Ltd", price: 20.85, change: -0.28, changePercent: -1.33 },
      { symbol: "RDF", name: "Redefine Properties Ltd", price: 4.82, change: -0.05, changePercent: -1.03 },
      { symbol: "VKE", name: "Vukile Property Fund Ltd", price: 10.34, change: -0.12, changePercent: -1.15 },
      { symbol: "HYP", name: "Hyprop Investments Ltd", price: 35.67, change: -0.24, changePercent: -0.67 },
      { symbol: "ATT", name: "Attacq Ltd", price: 8.75, change: -0.14, changePercent: -1.58 },
    ],
    color: "#6366F1" // indigo
  },
  {
    id: "tec",
    name: "Technology",
    description: "Software companies, IT services, and technology providers",
    performance: {
      daily: 2.4,
      weekly: 5.7,
      monthly: 12.3,
      yearly: 32.5,
      ytd: 28.4
    },
    marketCap: 2175.2,
    volume: "5.4B",
    companies: [
      { symbol: "NPN", name: "Naspers Ltd", price: 2875.45, change: 42.18, changePercent: 1.49 },
      { symbol: "PRX", name: "Prosus N.V.", price: 1245.67, change: 18.74, changePercent: 1.53 },
      { symbol: "EOH", name: "EOH Holdings Ltd", price: 6.78, change: 0.34, changePercent: 5.28 },
      { symbol: "ALT", name: "Allied Electronics Corporation Ltd", price: 12.45, change: 0.35, changePercent: 2.89 },
      { symbol: "DTC", name: "Datatec Ltd", price: 32.56, change: 0.87, changePercent: 2.74 },
    ],
    color: "#0EA5E9" // sky
  },
  {
    id: "ene",
    name: "Energy",
    description: "Oil & gas companies, renewable energy, and power utilities",
    performance: {
      daily: -1.5,
      weekly: -3.2,
      monthly: -5.4,
      yearly: -12.8,
      ytd: -8.6
    },
    marketCap: 564.8,
    volume: "2.3B",
    companies: [
      { symbol: "SOL", name: "Sasol Ltd", price: 145.26, change: -4.12, changePercent: -2.8 },
      { symbol: "MSM", name: "MultiChoice Group Ltd", price: 32.15, change: -0.45, changePercent: -1.38 },
      { symbol: "SNH", name: "Steinhoff International Holdings N.V.", price: 0.89, change: -0.05, changePercent: -5.32 },
      { symbol: "MNP", name: "Mondi Plc", price: 325.45, change: -4.37, changePercent: -1.33 },
      { symbol: "SAP", name: "Sappi Ltd", price: 42.67, change: -0.87, changePercent: -2.00 },
    ],
    color: "#14B8A6" // teal
  }
];

export default function MarketSectorsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({ key: "marketCap", direction: "descending" });
  
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly" | "yearly" | "ytd">("daily");
  
  // Sort sectors
  const sortedSectors = [...sectorData].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "ascending" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "marketCap") {
      return sortConfig.direction === "ascending" 
        ? a.marketCap - b.marketCap 
        : b.marketCap - a.marketCap;
    } else if (sortConfig.key === "performance") {
      return sortConfig.direction === "ascending" 
        ? a.performance[timeFrame] - b.performance[timeFrame] 
        : b.performance[timeFrame] - a.performance[timeFrame];
    }
    return 0;
  });
  
  // Function to handle column sorting
  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Get sort icon for column headers
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ArrowUp className="h-3 w-3 ml-1" /> 
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };
  
  // Generate market cap percentages for visualization
  const totalMarketCap = sectorData.reduce((sum, sector) => sum + sector.marketCap, 0);
  const sectorPercentages = sectorData.map(sector => ({
    id: sector.id,
    name: sector.name,
    percentage: (sector.marketCap / totalMarketCap) * 100,
    color: sector.color
  }));
  
  // Calculate overall market performance
  const getOverallPerformance = (timeframe: "daily" | "weekly" | "monthly" | "yearly" | "ytd") => {
    const weightedSum = sectorData.reduce((sum, sector) => {
      return sum + (sector.performance[timeframe] * sector.marketCap);
    }, 0);
    
    return weightedSum / totalMarketCap;
  };
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-ZA').format(num);
  };
  
  // Format currency (South African Rand)
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(num);
  };
  
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
                <BreadcrumbPage>Market Sectors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">JSE Market Sectors</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Explore performance across different sectors of the Johannesburg Stock Exchange (JSE).
              Track sector performance, analyze market trends, and discover leading companies in each sector.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Historical Data
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Market Summary */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>JSE sector performance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-5">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Market Cap</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalMarketCap)}B
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <div className="text-sm font-medium text-muted-foreground">Daily Change</div>
                </div>
                <div className={`text-2xl font-bold flex items-center ${getOverallPerformance("daily") >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {getOverallPerformance("daily") >= 0 ? (
                    <ArrowUp className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(getOverallPerformance("daily")).toFixed(2)}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Weekly Change</div>
                <div className={`text-2xl font-bold flex items-center ${getOverallPerformance("weekly") >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {getOverallPerformance("weekly") >= 0 ? (
                    <ArrowUp className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(getOverallPerformance("weekly")).toFixed(2)}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Monthly Change</div>
                <div className={`text-2xl font-bold flex items-center ${getOverallPerformance("monthly") >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {getOverallPerformance("monthly") >= 0 ? (
                    <ArrowUp className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(getOverallPerformance("monthly")).toFixed(2)}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">YTD Change</div>
                <div className={`text-2xl font-bold flex items-center ${getOverallPerformance("ytd") >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {getOverallPerformance("ytd") >= 0 ? (
                    <ArrowUp className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDown className="mr-1 h-5 w-5" />
                  )}
                  {Math.abs(getOverallPerformance("ytd")).toFixed(2)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Time Period Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={timeFrame === "daily" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("daily")}
          >
            Daily
          </Button>
          <Button 
            variant={timeFrame === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("weekly")}
          >
            Weekly
          </Button>
          <Button 
            variant={timeFrame === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("monthly")}
          >
            Monthly
          </Button>
          <Button 
            variant={timeFrame === "ytd" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("ytd")}
          >
            Year-to-Date
          </Button>
          <Button 
            variant={timeFrame === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("yearly")}
          >
            12 Months
          </Button>
        </div>
        
        {/* Sector Views */}
        <Tabs defaultValue="table" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex p-1 bg-muted/50 backdrop-blur rounded-xl">
            <TabsTrigger value="table" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Table View
              </div>
            </TabsTrigger>
            <TabsTrigger value="chart" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Chart View
              </div>
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <LineChart className="mr-2 h-4 w-4" />
                Performance View
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* Table View */}
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Sector Performance</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      {timeFrame === "daily" && "24h Change"}
                      {timeFrame === "weekly" && "7d Change"}
                      {timeFrame === "monthly" && "30d Change"}
                      {timeFrame === "yearly" && "12m Change"}
                      {timeFrame === "ytd" && "YTD Change"}
                    </Badge>
                    <Button variant="outline" size="sm" className="h-8">
                      <Filter className="mr-2 h-3 w-3" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50 w-[240px]" 
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Sector
                          {getSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("performance")}
                      >
                        <div className="flex items-center justify-end">
                          Performance
                          {getSortIcon("performance")}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("marketCap")}
                      >
                        <div className="flex items-center justify-end">
                          Market Cap (ZAR)
                          {getSortIcon("marketCap")}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        24h Volume
                      </TableHead>
                      <TableHead className="text-right">
                        Top Companies
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSectors.map((sector) => (
                      <TableRow key={sector.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-4 w-4 rounded-full" 
                              style={{ backgroundColor: sector.color }}
                            />
                            <div>
                              <div className="font-medium">{sector.name}</div>
                              <div className="text-sm text-muted-foreground">{sector.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className={`text-right ${sector.performance[timeFrame] >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                          <div className="flex items-center justify-end">
                            {sector.performance[timeFrame] >= 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(sector.performance[timeFrame]).toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(sector.marketCap)}B
                        </TableCell>
                        <TableCell className="text-right">
                          R{sector.volume}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            {sector.companies.slice(0, 3).map((company) => (
                              <Link key={company.symbol} href={`/stocks/${company.symbol}`}>
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-muted text-xs">
                                    {company.symbol.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                            ))}
                            <Link href={`/sectors/${sector.id}`}>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                View
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Chart View */}
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Market Cap Distribution</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    {formatCurrency(totalMarketCap)}B Total Market Cap
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Market Cap Chart - In a real app, this would be a proper chart component */}
                  <div className="flex items-center justify-center">
                    <div className="h-60 w-60 relative rounded-full border-8 border-muted flex items-center justify-center">
                      <PieChart className="h-12 w-12 text-muted-foreground/50" />
                      <div className="text-sm text-muted-foreground text-center">
                        <div className="font-medium">JSE Sectors</div>
                        <div className="text-xs">Market Cap Distribution</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Cap Details */}
                  <div>
                    <div className="space-y-4">
                      {sectorPercentages.sort((a, b) => b.percentage - a.percentage).map((sector) => (
                        <div key={sector.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: sector.color }}
                              />
                              <span className="text-sm font-medium">{sector.name}</span>
                            </div>
                            <span className="text-sm">{sector.percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={sector.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {timeFrame === "daily" && "Daily Performance"}
                    {timeFrame === "weekly" && "Weekly Performance"}
                    {timeFrame === "monthly" && "Monthly Performance"}
                    {timeFrame === "yearly" && "Yearly Performance"}
                    {timeFrame === "ytd" && "Year-to-Date Performance"}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSort("performance")}>
                        Performance (High to Low)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "performance", direction: "ascending" })}>
                        Performance (Low to High)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("name")}>
                        Sector Name (A-Z)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortConfig({ key: "name", direction: "descending" })}>
                        Sector Name (Z-A)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[...sectorData]
                    .sort((a, b) => b.performance[timeFrame] - a.performance[timeFrame])
                    .map((sector) => (
                      <div key={sector.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: sector.color }}
                            />
                            <span className="font-medium">{sector.name}</span>
                          </div>
                          <span className={`${sector.performance[timeFrame] >= 0 ? "text-emerald-600" : "text-red-600"} flex items-center`}>
                            {sector.performance[timeFrame] >= 0 ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(sector.performance[timeFrame]).toFixed(2)}%
                          </span>
                        </div>
                        <div className="relative">
                          <div
                            className={`h-2 rounded ${sector.performance[timeFrame] >= 0 ? "bg-emerald-500" : "bg-red-500"}`}
                            style={{ 
                              width: `${Math.min(Math.abs(sector.performance[timeFrame]) * 2, 100)}%`,
                              marginLeft: sector.performance[timeFrame] < 0 ? `${100 - Math.min(Math.abs(sector.performance[timeFrame]) * 2, 100)}%` : "0%"
                            }}
                          />
                          <div className="absolute top-0 left-1/2 h-full w-0.5 bg-muted-foreground/20" />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Performance View */}
          <TabsContent value="performance">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedSectors.map(sector => (
                <Card key={sector.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: sector.color }}
                          />
                          {sector.name}
                        </CardTitle>
                        <CardDescription>{sector.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="font-normal">
                        {formatCurrency(sector.marketCap)}B
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="h-36 bg-muted/40 rounded-md flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <LineChart className="h-8 w-8 mx-auto mb-2" />
                        <div className="text-sm">Performance chart would display here</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div>
                        <div className="text-xs text-muted-foreground">24h</div>
                        <div className={`text-sm font-medium ${sector.performance.daily >= 0 ? "text-emerald-600" : "text-red-600"} flex items-center`}>
                          {sector.performance.daily >= 0 ? (
                            <ArrowUp className="mr-0.5 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-0.5 h-3 w-3" />
                          )}
                          {Math.abs(sector.performance.daily).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">7d</div>
                        <div className={`text-sm font-medium ${sector.performance.weekly >= 0 ? "text-emerald-600" : "text-red-600"} flex items-center`}>
                          {sector.performance.weekly >= 0 ? (
                            <ArrowUp className="mr-0.5 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-0.5 h-3 w-3" />
                          )}
                          {Math.abs(sector.performance.weekly).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">30d</div>
                        <div className={`text-sm font-medium ${sector.performance.monthly >= 0 ? "text-emerald-600" : "text-red-600"} flex items-center`}>
                          {sector.performance.monthly >= 0 ? (
                            <ArrowUp className="mr-0.5 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-0.5 h-3 w-3" />
                          )}
                          {Math.abs(sector.performance.monthly).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">YTD</div>
                        <div className={`text-sm font-medium ${sector.performance.ytd >= 0 ? "text-emerald-600" : "text-red-600"} flex items-center`}>
                          {sector.performance.ytd >= 0 ? (
                            <ArrowUp className="mr-0.5 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-0.5 h-3 w-3" />
                          )}
                          {Math.abs(sector.performance.ytd).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <Link href={`/sectors/${sector.id}`} className="w-full">
                      <Button size="sm" variant="outline" className="w-full">
                        View Companies
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Top Performing Companies */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Top Performing Companies by Sector</h2>
          
          {sortedSectors.slice(0, 3).map(sector => (
            <Card key={sector.id} className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: sector.color }}
                    />
                    <CardTitle>{sector.name}</CardTitle>
                  </div>
                  <Link href={`/sectors/${sector.id}`}>
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price (ZAR)</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sector.companies
                      .sort((a, b) => b.changePercent - a.changePercent)
                      .map(company => (
                        <TableRow key={company.symbol} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <Link href={`/stocks/${company.symbol}`} className="hover:underline">
                              {company.symbol}
                            </Link>
                          </TableCell>
                          <TableCell>{company.name}</TableCell>
                          <TableCell className="text-right">
                            R{company.price.toFixed(2)}
                          </TableCell>
                          <TableCell className={`text-right ${company.changePercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            <div className="flex items-center justify-end">
                              {company.changePercent >= 0 ? (
                                <ArrowUp className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowDown className="mr-1 h-3 w-3" />
                              )}
                              {Math.abs(company.changePercent).toFixed(2)}%
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Sector Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>About JSE Market Sectors</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              The Johannesburg Stock Exchange (JSE) categorizes listed companies into various sectors based on their 
              primary business activities. This classification helps investors identify and compare companies within 
              the same industry or economic sector.
            </p>
            <p className="mb-4">
              The JSE follows the Industry Classification Benchmark (ICB), which provides a detailed and comprehensive 
              structure for the categorization of companies. The ICB divides the market into industries, 
              supersectors, sectors, and subsectors, allowing for multi-level analysis.
            </p>
            <p>
              Understanding sector performance is crucial for diversification strategies and for identifying 
              investment opportunities based on economic trends. Different sectors often respond differently to 
              economic cycles, government policies, and global events.
            </p>
          </CardContent>
          <CardFooter className="border-t flex justify-between">
            <div className="text-xs text-muted-foreground">
              Data provided for informational purposes only.
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Learn More about Sector Analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}