import Link from "next/link";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Clock, 
  Globe, 
  TrendingUp, 
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Imported components
import { MarketOverview } from "@/components/market-overview";
import { CurrencyConverter } from "@/components/currency-converter";
import { StockTable } from "@/components/stock-table";
import { MarketNews } from "@/components/market-news";
import { CurrencyChart } from "@/components/currency-chart";
import { HeroSection } from "@/components/hero-section";
import { MarketPulse } from "@/components/market-pulse";
import { AnimatedCounter } from "@/components/animated-counter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/90">
      {/* Top notification bar */}
      <div className="w-full bg-emerald-600 text-white py-1 px-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center text-xs sm:text-sm">
            <Clock className="mr-2 h-3 w-3" />
            <span>Market Hours: 09:00 - 17:00 SAST</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs sm:text-sm hover:underline flex items-center">
              <Globe className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">Global Markets</span>
            </a>
            <a href="#" className="text-xs sm:text-sm hover:underline">Help Center</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <TrendingUp className="h-7 w-7 text-emerald-500" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
              MzansiMarkets
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group flex items-center">
                Markets
                <ChevronDown className="ml-1 h-4 w-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>Market Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="#stocks" className="flex w-full">JSE Stocks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#currency" className="flex w-full">Currency Exchange</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex w-full">Commodities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex w-full">Indices</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group flex items-center">
                Research
                <ChevronDown className="ml-1 h-4 w-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem>
                  <Link href="#news" className="flex w-full">Market News</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex w-full">Analysis Reports</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex w-full">Economic Calendar</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Header right side */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search markets..."
                className="pl-8 w-52 focus-visible:ring-emerald-500 bg-muted/40"
              />
            </div>
            
            <div className="hidden md:flex items-center text-sm font-medium">
              <Clock className="mr-1 h-4 w-4 text-emerald-500" />
              <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>

            <Button variant="outline" size="icon" className="relative hidden md:flex">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 text-sm"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>

            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section with enhanced styling */}
        <section className="relative bg-gradient-to-b from-emerald-50 to-background dark:from-emerald-950/20 dark:to-background py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-0 -top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
          </div>
          <div className="container relative z-10">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300">
                  South Africa's Premier Market Intelligence
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Smart Decisions.</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
                    Better Returns.
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-md">
                  Real-time analytics and insights for South African markets. Stay ahead of trends with comprehensive data and expert analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                    Get Started
                  </Button>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                    View Markets <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl" />
                  <Card className="backdrop-blur bg-white/90 dark:bg-gray-900/90 border border-emerald-500/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-emerald-500" />
                        JSE Market Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">JSE All Share</div>
                            <div className="text-2xl font-bold">73,456.21</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 mb-1">
                              <ArrowUp className="mr-1 h-3 w-3" /> +1.2%
                            </Badge>
                            <div className="text-xs text-muted-foreground">Today</div>
                          </div>
                        </div>
                        <div className="w-full h-16 bg-muted/40 rounded-md flex items-end overflow-hidden">
                          {[0.6, 0.8, 0.5, 0.7, 0.9, 0.75, 0.85, 0.95, 0.7, 0.8, 0.9, 1].map((height, i) => (
                            <div
                              key={i}
                              className="bg-emerald-500 h-full w-full"
                              style={{ height: `${height * 100}%`, opacity: 0.7 + (i * 0.025) }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market stats bar */}
        <section className="border-y bg-muted/30 dark:bg-muted/10">
          <div className="container py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">JSE All Share</span>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">73,456.21</span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <ArrowUp className="mr-1 h-3 w-3" /> +1.2%
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">USD/ZAR</span>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">18.45</span>
                  <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    <ArrowUp className="mr-1 h-3 w-3" /> +0.23%
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Gold (ZAR)</span>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">34,567.89</span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <ArrowUp className="mr-1 h-3 w-3" /> +0.5%
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Trading Volume</span>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">2.7B</span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <ArrowUp className="mr-1 h-3 w-3" /> +4.2%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-8">
            {/* Section title */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Market Overview</h2>
              <p className="text-muted-foreground">Comprehensive insights into South African markets.</p>
            </div>

            {/* Market overview component */}
            <MarketOverview />

            {/* Market pulse and snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="md:col-span-2 overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Market Pulse</CardTitle>
                      <CardDescription>Real-time market activity visualization</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      <ArrowDown className="mr-1 h-3 w-3" /> Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <MarketPulse />
                </CardContent>
                <CardFooter className="bg-muted/30 py-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Market Snapshot</CardTitle>
                      <CardDescription>Today's key figures</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">JSE All Share</span>
                      <div className="text-right">
                        <AnimatedCounter value={73456.21} prefix="" decimals={2} className="font-bold text-lg" />
                        <div className="flex items-center justify-end text-xs text-emerald-500">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          <span>+1.2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">USD/ZAR</span>
                      <div className="text-right">
                        <AnimatedCounter value={18.45} prefix="" decimals={2} className="font-bold text-lg" />
                        <div className="flex items-center justify-end text-xs text-red-500">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          <span>+0.23%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Gold (ZAR)</span>
                      <div className="text-right">
                        <AnimatedCounter value={34567.89} prefix="" decimals={2} className="font-bold text-lg" />
                        <div className="flex items-center justify-end text-xs text-emerald-500">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          <span>+0.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trading Volume</span>
                      <div className="text-right">
                        <AnimatedCounter value={2.7} prefix="" suffix="B" decimals={1} className="font-bold text-lg" />
                        <div className="flex items-center justify-end text-xs text-emerald-500">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          <span>+4.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center bg-muted/30 py-3">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Detailed Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Tabs section with enhanced styling */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Market Analysis</h2>
              
              <Tabs defaultValue="stocks" className="mt-6">
                <TabsList className="w-full md:w-auto grid grid-cols-3 p-1 bg-muted/50 backdrop-blur rounded-xl">
                  <TabsTrigger
                    value="stocks"
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all px-6"
                  >
                    JSE Stocks
                  </TabsTrigger>
                  <TabsTrigger
                    value="currency"
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all px-6"
                  >
                    Currency
                  </TabsTrigger>
                  <TabsTrigger
                    value="news"
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all px-6"
                  >
                    Market News
                  </TabsTrigger>
                </TabsList>
                
                {/* Stocks Tab Content */}
                <TabsContent value="stocks" className="space-y-6 mt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">JSE All Share</CardTitle>
                        <BarChart3 className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">73,456.21</div>
                        <div className="flex items-center text-sm text-emerald-500">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          <span>+1.2%</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top 40</CardTitle>
                        <BarChart3 className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">67,892.45</div>
                        <div className="flex items-center text-sm text-emerald-500">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          <span>+0.8%</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resources 10</CardTitle>
                        <BarChart3 className="h-4 w-4 text-red-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">42,567.89</div>
                        <div className="flex items-center text-sm text-red-500">
                          <ArrowDown className="mr-1 h-4 w-4" />
                          <span>-0.3%</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Industrials 25</CardTitle>
                        <BarChart3 className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">89,123.67</div>
                        <div className="flex items-center text-sm text-emerald-500">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          <span>+1.5%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Enhanced stock table with header section */}
                  <Card className="overflow-hidden border border-emerald-500/20">
                    <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle>Top JSE Stocks</CardTitle>
                          <CardDescription>Performance of leading South African stocks</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Search stocks..." 
                            className="w-full sm:w-40 h-8 text-xs"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                Filter <ChevronDown className="ml-1 h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Gainers</DropdownMenuItem>
                              <DropdownMenuItem>Losers</DropdownMenuItem>
                              <DropdownMenuItem>Most Active</DropdownMenuItem>
                              <DropdownMenuItem>By Sector</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <StockTable />
                    </CardContent>
                    <CardFooter className="flex justify-between bg-muted/30 py-3 px-6">
                      <div className="text-xs text-muted-foreground">
                        Showing 10 of 100 stocks
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View All Stocks
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Currency Tab Content */}
                <TabsContent value="currency" className="space-y-6 mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-1 overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>ZAR Exchange Rates</CardTitle>
                            <CardDescription>South African Rand against major currencies</CardDescription>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Live</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">US</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">USD/ZAR</span>
                                <p className="text-xs text-muted-foreground">US Dollar</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">18.45</span>
                              <span className="ml-2 text-xs text-red-500 flex items-center">
                                <ArrowUp className="h-3 w-3 mr-1 animate-pulse" />
                                0.23%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">EU</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">EUR/ZAR</span>
                                <p className="text-xs text-muted-foreground">Euro</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">19.87</span>
                              <span className="ml-2 text-xs text-red-500 flex items-center">
                                <ArrowUp className="h-3 w-3 mr-1 animate-pulse" />
                                0.18%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">GB</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">GBP/ZAR</span>
                                <p className="text-xs text-muted-foreground">British Pound</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">22.65</span>
                              <span className="ml-2 text-xs text-emerald-500 flex items-center">
                                <ArrowDown className="h-3 w-3 mr-1 animate-pulse" />
                                0.12%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-red-100 text-red-600 text-xs">CN</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">CNY/ZAR</span>
                                <p className="text-xs text-muted-foreground">Chinese Yuan</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">2.68</span>
                              <span className="ml-2 text-xs text-red-500 flex items-center">
                                <ArrowUp className="h-3 w-3 mr-1 animate-pulse" />
                                0.35%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-yellow-100 text-yellow-600 text-xs">JP</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">JPY/ZAR</span>
                                <p className="text-xs text-muted-foreground">Japanese Yen</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">0.12</span>
                              <span className="ml-2 text-xs text-red-500 flex items-center">
                                <ArrowUp className="h-3 w-3 mr-1 animate-pulse" />
                                0.08%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/30 py-3 flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Last updated: {new Date().toLocaleTimeString()}
                        </span>
                        <Link href="#" className="text-xs text-emerald-600 hover:underline">View historical data</Link>
                      </CardFooter>
                    </Card>

                    <Card className="col-span-1 overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Currency Converter</CardTitle>
                            <CardDescription>Calculate exchange rates in real-time</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <CurrencyConverter />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle>ZAR Historical Performance</CardTitle>
                          <CardDescription>South African Rand exchange rate trends</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                USD/ZAR <ChevronDown className="ml-1 h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>USD/ZAR</DropdownMenuItem>
                              <DropdownMenuItem>EUR/ZAR</DropdownMenuItem>
                              <DropdownMenuItem>GBP/ZAR</DropdownMenuItem>
                              <DropdownMenuItem>CNY/ZAR</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                1 Month <ChevronDown className="ml-1 h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>1 Week</DropdownMenuItem>
                              <DropdownMenuItem>1 Month</DropdownMenuItem>
                              <DropdownMenuItem>3 Months</DropdownMenuItem>
                              <DropdownMenuItem>1 Year</DropdownMenuItem>
                              <DropdownMenuItem>5 Years</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 h-80">
                      <CurrencyChart />
                    </CardContent>
                    <CardFooter className="bg-muted/30 py-3 flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Data sourced from South African Reserve Bank
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Download Data
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* News Tab Content */}
                <TabsContent value="news" className="mt-6">
                  <Card className="overflow-hidden border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle>Market News</CardTitle>
                          <CardDescription>Latest updates from South African financial markets</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Search news..." 
                            className="w-full sm:w-40 h-8 text-xs"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                Filter <ChevronDown className="ml-1 h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>All News</DropdownMenuItem>
                              <DropdownMenuItem>JSE</DropdownMenuItem>
                              <DropdownMenuItem>Currency</DropdownMenuItem>
                              <DropdownMenuItem>Commodities</DropdownMenuItem>
                              <DropdownMenuItem>Economic</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <MarketNews />
                    </CardContent>
                    <CardFooter className="bg-muted/30 py-3 flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Showing 6 of 24 news items
                      </span>
                      <Button variant="outline" size="sm" className="text-xs">
                        View All News
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="py-16 bg-gradient-to-b from-emerald-50 to-background dark:from-emerald-950/20 dark:to-background">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300 mb-4">
                  About MzansiMarkets
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Your Partner for South African Market Intelligence</h2>
                <p className="text-muted-foreground mb-6">
                  MzansiMarkets provides comprehensive, real-time data and analysis for investors interested in South African financial markets. Our platform delivers actionable insights to help you make informed investment decisions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-700 dark:text-emerald-300">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Market Leading Data</h3>
                      <p className="text-sm text-muted-foreground">Real-time information from the Johannesburg Stock Exchange and global currency markets.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-700 dark:text-emerald-300">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Analytical Tools</h3>
                      <p className="text-sm text-muted-foreground">Customizable charts, technical indicators, and comparison tools to analyze market trends.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-700 dark:text-emerald-300">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Local Expertise</h3>
                      <p className="text-sm text-muted-foreground">South African market specialists providing contextual analysis and insights.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Learn More About Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl" />
                <Card className="backdrop-blur bg-white/90 dark:bg-gray-900/90 border border-emerald-500/20 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Sign up for a free trial and see how MzansiMarkets can transform your investment strategy.
                    </p>
                    <div className="space-y-4">
                      <Input placeholder="Your Name" />
                      <Input placeholder="Email Address" type="email" />
                      <Input placeholder="Phone Number (Optional)" type="tel" />
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Start Free Trial
                      </Button>
                    </div>
                    <div className="mt-4 text-center text-xs text-muted-foreground">
                      No credit card required. 14-day free trial.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with enhanced styling */}
      <footer className="bg-gray-50 dark:bg-gray-900/50 border-t">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
                <span className="text-lg font-bold">MzansiMarkets</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your comprehensive source for South African market intelligence and financial data.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Markets</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    JSE Stocks
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Currency Exchange
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Commodities
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Fixed Income
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Market Indices
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Market News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learning Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Economic Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Analyst Reports
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Press Kit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 MzansiMarkets. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}