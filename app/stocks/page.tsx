"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronDown,
  Clock,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample stock data - In a real application, this would come from an API
const stocksData = [
  {
    symbol: "NPN",
    name: "Naspers Ltd",
    price: 2875.45,
    change: 42.18,
    changePercent: 1.49,
    marketCap: "965.2B",
    volume: "1.2M",
    sector: "Technology",
  },
  {
    symbol: "MTN",
    name: "MTN Group Ltd",
    price: 156.78,
    change: 6.58,
    changePercent: 4.2,
    marketCap: "295.1B",
    volume: "2.5M",
    sector: "Telecommunications",
  },
  {
    symbol: "SLM",
    name: "Sanlam Ltd",
    price: 65.42,
    change: -0.83,
    changePercent: -1.25,
    marketCap: "145.6B",
    volume: "1.7M",
    sector: "Financial Services",
  },
  {
    symbol: "SOL",
    name: "Sasol Ltd",
    price: 145.26,
    change: -4.12,
    changePercent: -2.8,
    marketCap: "92.3B",
    volume: "3.1M",
    sector: "Energy",
  },
  {
    symbol: "FSR",
    name: "FirstRand Ltd",
    price: 68.42,
    change: 0.37,
    changePercent: 0.54,
    marketCap: "384.1B",
    volume: "4.2M",
    sector: "Financial Services",
  },
  {
    symbol: "SBK",
    name: "Standard Bank Group Ltd",
    price: 187.35,
    change: 2.15,
    changePercent: 1.16,
    marketCap: "319.7B",
    volume: "1.8M",
    sector: "Financial Services",
  },
  {
    symbol: "BHP",
    name: "BHP Group Ltd",
    price: 448.92,
    change: -5.83,
    changePercent: -1.28,
    marketCap: "2.3T",
    volume: "950K",
    sector: "Basic Materials",
  },
  {
    symbol: "ANG",
    name: "AngloGold Ashanti Ltd",
    price: 315.76,
    change: 7.23,
    changePercent: 2.34,
    marketCap: "132.5B",
    volume: "1.5M",
    sector: "Basic Materials",
  },
  {
    symbol: "AGL",
    name: "Anglo American Plc",
    price: 546.21,
    change: -12.34,
    changePercent: -2.21,
    marketCap: "725.8B",
    volume: "2.1M",
    sector: "Basic Materials",
  },
  {
    symbol: "VOD",
    name: "Vodacom Group Ltd",
    price: 115.67,
    change: 1.28,
    changePercent: 1.12,
    marketCap: "174.2B",
    volume: "1.3M",
    sector: "Telecommunications",
  },
  {
    symbol: "RMB",
    name: "RMB Holdings Ltd",
    price: 28.45,
    change: 0.17,
    changePercent: 0.6,
    marketCap: "40.1B",
    volume: "820K",
    sector: "Financial Services",
  },
  {
    symbol: "SHP",
    name: "Shoprite Holdings Ltd",
    price: 214.33,
    change: 3.45,
    changePercent: 1.63,
    marketCap: "121.7B",
    volume: "950K",
    sector: "Consumer Defensive",
  },
  {
    symbol: "REM",
    name: "Remgro Ltd",
    price: 112.85,
    change: -1.27,
    changePercent: -1.11,
    marketCap: "64.3B",
    volume: "540K",
    sector: "Industrials",
  },
  {
    symbol: "BTI",
    name: "British American Tobacco Plc",
    price: 542.34,
    change: -8.72,
    changePercent: -1.58,
    marketCap: "1.2T",
    volume: "1.7M",
    sector: "Consumer Defensive",
  },
  {
    symbol: "CPI",
    name: "Capitec Bank Holdings Ltd",
    price: 1895.67,
    change: 28.43,
    changePercent: 1.52,
    marketCap: "219.5B",
    volume: "320K",
    sector: "Financial Services",
  },
  {
    symbol: "DSY",
    name: "Discovery Ltd",
    price: 142.78,
    change: 2.14,
    changePercent: 1.52,
    marketCap: "94.8B",
    volume: "680K",
    sector: "Financial Services",
  },
  {
    symbol: "MRP",
    name: "Mr Price Group Ltd",
    price: 178.93,
    change: -2.34,
    changePercent: -1.29,
    marketCap: "46.2B",
    volume: "520K",
    sector: "Consumer Cyclical",
  },
  {
    symbol: "WHL",
    name: "Woolworths Holdings Ltd",
    price: 62.47,
    change: 1.23,
    changePercent: 2.01,
    marketCap: "59.7B",
    volume: "1.1M",
    sector: "Consumer Cyclical",
  },
  {
    symbol: "MCG",
    name: "MultiChoice Group Ltd",
    price: 32.15,
    change: -0.45,
    changePercent: -1.38,
    marketCap: "14.2B",
    volume: "780K",
    sector: "Communication Services",
  },
  {
    symbol: "TBS",
    name: "Tiger Brands Ltd",
    price: 184.25,
    change: 2.15,
    changePercent: 1.18,
    marketCap: "35.1B",
    volume: "430K",
    sector: "Consumer Defensive",
  },
];

// Market sector categories
const sectors = Array.from(
  new Set(stocksData.map((stock) => stock.sector))
).sort();

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "marketCap", direction: "descending" });

  // Filter stocks based on search query and selected sector
  const filteredStocks = stocksData.filter((stock) => {
    const matchesSearch =
      searchQuery === "" ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector =
      selectedSector === null || stock.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  // Sort stocks based on current sort configuration
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (sortConfig.key === "marketCap") {
      // Convert market cap strings like "2.3T", "965.2B" to numeric values for sorting
      const aNumeric = parseMarketCap(a.marketCap);
      const bNumeric = parseMarketCap(b.marketCap);

      return sortConfig.direction === "ascending"
        ? aNumeric - bNumeric
        : bNumeric - aNumeric;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "ascending"
        ? aValue - bValue
        : bValue - aValue;
    }

    // For string values
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Utility function to convert market cap strings to numeric values
  function parseMarketCap(marketCap: string): number {
    const value = parseFloat(marketCap);

    if (marketCap.includes("T")) {
      return value * 1000000000000;
    } else if (marketCap.includes("B")) {
      return value * 1000000000;
    } else if (marketCap.includes("M")) {
      return value * 1000000;
    } else if (marketCap.includes("K")) {
      return value * 1000;
    }

    return value;
  }

  // Function to handle column sorting
  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Get sort icon for column headers
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
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
                <BreadcrumbPage>Stocks</BreadcrumbPage>
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
              <Badge variant="outline" className="bg-muted">
                JSE
              </Badge>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold">Johannesburg Stock Exchange</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Browse, search, and analyze stocks listed on the JSE. Get
              real-time prices, company information, and historical performance
              data for South Africa's premier stock market.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Market Indices Summary */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    JSE All Share
                  </div>
                  <div className="text-2xl font-bold">73,456.21</div>
                </div>
                <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <ArrowUp className="mr-1 h-3 w-3" /> 1.2%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    JSE Top 40
                  </div>
                  <div className="text-2xl font-bold">67,892.45</div>
                </div>
                <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <ArrowUp className="mr-1 h-3 w-3" /> 0.8%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    JSE Resources 10
                  </div>
                  <div className="text-2xl font-bold">42,567.89</div>
                </div>
                <Badge className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  <ArrowDown className="mr-1 h-3 w-3" /> 0.3%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    JSE Industrials 25
                  </div>
                  <div className="text-2xl font-bold">89,123.67</div>
                </div>
                <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <ArrowUp className="mr-1 h-3 w-3" /> 1.5%
                </Badge>
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
                    placeholder="Search by company name or symbol..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 flex-wrap md:flex-nowrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedSector || "All Sectors"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem
                      className={selectedSector === null ? "bg-muted" : ""}
                      onClick={() => setSelectedSector(null)}
                    >
                      All Sectors
                    </DropdownMenuItem>
                    {sectors.map((sector) => (
                      <DropdownMenuItem
                        key={sector}
                        className={selectedSector === sector ? "bg-muted" : ""}
                        onClick={() => setSelectedSector(sector)}
                      >
                        {sector}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Sort By
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleSort("marketCap")}
                      className={
                        sortConfig.key === "marketCap" ? "bg-muted" : ""
                      }
                    >
                      Market Cap
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("price")}
                      className={sortConfig.key === "price" ? "bg-muted" : ""}
                    >
                      Price
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("changePercent")}
                      className={
                        sortConfig.key === "changePercent" ? "bg-muted" : ""
                      }
                    >
                      % Change
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("volume")}
                      className={sortConfig.key === "volume" ? "bg-muted" : ""}
                    >
                      Volume
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="default">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market View Tabs */}
        <Tabs defaultValue="table" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex p-1 bg-muted/50 backdrop-blur rounded-xl">
            <TabsTrigger
              value="table"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              Table View
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
            >
              Cards View
            </TabsTrigger>
          </TabsList>

          {/* Table View */}
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {selectedSector
                        ? `${selectedSector} Stocks`
                        : "All JSE Stocks"}
                    </CardTitle>
                    <CardDescription>
                      Showing {sortedStocks.length} of {stocksData.length}{" "}
                      stocks
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-muted">
                    <Clock className="mr-2 h-3 w-3" />
                    Market{" "}
                    {new Date().getHours() >= 9 && new Date().getHours() < 17
                      ? "Open"
                      : "Closed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("symbol")}
                      >
                        <div className="flex items-center">
                          Symbol
                          {getSortIcon("symbol")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {getSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("price")}
                      >
                        <div className="flex items-center justify-end">
                          Price (ZAR)
                          {getSortIcon("price")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("changePercent")}
                      >
                        <div className="flex items-center justify-end">
                          Change
                          {getSortIcon("changePercent")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("marketCap")}
                      >
                        <div className="flex items-center justify-end">
                          Market Cap
                          {getSortIcon("marketCap")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort("volume")}
                      >
                        <div className="flex items-center justify-end">
                          Volume
                          {getSortIcon("volume")}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStocks.length > 0 ? (
                      sortedStocks.map((stock) => (
                        <TableRow
                          key={stock.symbol}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            <Link
                              href={`/stocks/${stock.symbol}`}
                              className="hover:text-emerald-600 hover:underline"
                            >
                              {stock.symbol}
                            </Link>
                          </TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell className="text-right">
                            R{stock.price.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              stock.changePercent >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            <div className="flex items-center justify-end">
                              {stock.changePercent >= 0 ? (
                                <ArrowUp className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowDown className="mr-1 h-3 w-3" />
                              )}
                              {Math.abs(stock.changePercent).toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            R{stock.marketCap}
                          </TableCell>
                          <TableCell className="text-right">
                            {stock.volume}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/stocks/${stock.symbol}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No stocks found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {sortedStocks.length} of {stocksData.length} stocks
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Cards View */}
          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedStocks.length > 0 ? (
                sortedStocks.map((stock) => (
                  <Link href={`/stocks/${stock.symbol}`} key={stock.symbol}>
                    <Card className="h-full hover:shadow-md transition-all duration-200 hover:border-emerald-500/50">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center">
                              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center mr-2">
                                {stock.symbol.charAt(0)}
                              </div>
                              {stock.symbol}
                            </CardTitle>
                            <CardDescription>{stock.name}</CardDescription>
                          </div>
                          <Badge variant="outline">{stock.sector}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-2xl font-bold">
                            R{stock.price.toFixed(2)}
                          </div>
                          <div
                            className={`flex items-center ${
                              stock.changePercent >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {stock.changePercent >= 0 ? (
                              <ArrowUp className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="mr-1 h-4 w-4" />
                            )}
                            <span>
                              {Math.abs(stock.changePercent).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">
                              Market Cap
                            </span>
                            <span className="font-medium">
                              R{stock.marketCap}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">
                              Volume
                            </span>
                            <span className="font-medium">{stock.volume}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40">
                  <p className="text-muted-foreground">
                    No stocks found matching your filters.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Insights Section */}
        <div className="grid gap-6 md:grid-cols-2 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Market Gainers</CardTitle>
              <CardDescription>Top performing JSE stocks today</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...stocksData]
                    .filter((stock) => stock.changePercent > 0)
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .slice(0, 5)
                    .map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <Link
                            href={`/stocks/${stock.symbol}`}
                            className="hover:text-emerald-600 hover:underline font-medium"
                          >
                            {stock.symbol}
                          </Link>
                        </TableCell>
                        <TableCell>R{stock.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-emerald-600">
                          <div className="flex items-center justify-end">
                            <ArrowUp className="mr-1 h-3 w-3" />
                            {stock.changePercent.toFixed(2)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Losers</CardTitle>
              <CardDescription>
                Poorest performing JSE stocks today
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...stocksData]
                    .filter((stock) => stock.changePercent < 0)
                    .sort((a, b) => a.changePercent - b.changePercent)
                    .slice(0, 5)
                    .map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <Link
                            href={`/stocks/${stock.symbol}`}
                            className="hover:text-emerald-600 hover:underline font-medium"
                          >
                            {stock.symbol}
                          </Link>
                        </TableCell>
                        <TableCell>R{stock.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-red-600">
                          <div className="flex items-center justify-end">
                            <ArrowDown className="mr-1 h-3 w-3" />
                            {Math.abs(stock.changePercent).toFixed(2)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Additional Market Info */}
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>JSE Market Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              The Johannesburg Stock Exchange (JSE) is the largest stock
              exchange in Africa. Located in Johannesburg, South Africa, it was
              established in 1887 during the first South African gold rush.
              Today, the JSE trades in a variety of securities including
              equities, bonds, derivatives, and houses some of Africa's largest
              companies.
            </p>
            <p className="mb-4">
              The JSE operates Monday through Friday, from 09:00 to 17:00 SAST
              (South African Standard Time), excluding public holidays. The
              pre-market trading session runs from 08:30 to 09:00 SAST, and the
              post-market trading session from 17:00 to 18:30 SAST.
            </p>
            <p>
              Major indices on the JSE include the JSE All Share Index (ALSI),
              which represents 99% of the full market capitalization of all
              eligible equities listed; the Top 40 Index, representing the 40
              largest companies by market capitalization; and various
              sector-specific indices.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between border-t">
            <div className="text-xs text-muted-foreground">
              Data provided for informational purposes only.
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Learn More About JSE
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
