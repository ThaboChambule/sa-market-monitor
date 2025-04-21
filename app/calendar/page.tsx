"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Clock, 
  Filter, 
  Grid, 
  Info, 
  Layers, 
  List,
  Search,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, isAfter, isBefore } from "date-fns"

type EventType = "Report" | "Meeting" | "Speech" | "Holiday" | "Release"
type EventImpact = "High" | "Medium" | "Low"

interface EconomicEvent {
  id: string
  title: string
  date: Date
  time: string
  type: EventType
  impact: EventImpact
  country: string
  description: string
  previous?: string
  forecast?: string
  actual?: string
}

// Sample economic calendar data
const economicEvents: EconomicEvent[] = [
  {
    id: "event-1",
    title: "SA CPI Data Release",
    date: addDays(new Date(), -3),
    time: "09:00",
    type: "Release",
    impact: "High",
    country: "ZA",
    description: "Monthly Consumer Price Index (CPI) data release by Statistics South Africa",
    previous: "5.4%",
    forecast: "5.2%",
    actual: "5.3%"
  },
  {
    id: "event-2",
    title: "SARB Interest Rate Decision",
    date: addDays(new Date(), -2),
    time: "14:00",
    type: "Meeting",
    impact: "High",
    country: "ZA",
    description: "South African Reserve Bank Monetary Policy Committee interest rate decision",
    previous: "8.25%",
    forecast: "8.25%",
    actual: "8.25%"
  },
  {
    id: "event-3",
    title: "SA GDP Growth Q1 2025",
    date: addDays(new Date(), 0),
    time: "11:30",
    type: "Release",
    impact: "High",
    country: "ZA",
    description: "Quarterly Gross Domestic Product (GDP) growth figures",
    previous: "0.9%",
    forecast: "1.1%"
  },
  {
    id: "event-4",
    title: "SARB Governor Speech",
    date: addDays(new Date(), 0),
    time: "14:00",
    type: "Speech",
    impact: "Medium",
    country: "ZA",
    description: "Speech by SARB Governor on monetary policy and economic outlook",
  },
  {
    id: "event-5",
    title: "National Budget Speech",
    date: addDays(new Date(), 2),
    time: "14:00",
    type: "Speech",
    impact: "High",
    country: "ZA",
    description: "Annual budget speech by the Minister of Finance",
  },
  {
    id: "event-6",
    title: "Balance of Trade",
    date: addDays(new Date(), 2),
    time: "10:00",
    type: "Release",
    impact: "Medium",
    country: "ZA",
    description: "Monthly trade balance figures showing difference between exports and imports",
    previous: "R6.4B",
    forecast: "R7.1B"
  },
  {
    id: "event-7",
    title: "Freedom Day",
    date: addDays(new Date(), 5),
    time: "All Day",
    type: "Holiday",
    impact: "Low",
    country: "ZA",
    description: "National public holiday - financial markets closed"
  },
  {
    id: "event-8",
    title: "Manufacturing PMI",
    date: addDays(new Date(), 6),
    time: "09:30",
    type: "Release",
    impact: "Medium",
    country: "ZA",
    description: "Absa Manufacturing Purchasing Managers' Index",
    previous: "52.8",
    forecast: "53.2"
  },
  {
    id: "event-9",
    title: "Unemployment Rate",
    date: addDays(new Date(), 8),
    time: "11:30",
    type: "Release",
    impact: "High",
    country: "ZA",
    description: "Quarterly unemployment figures by Statistics South Africa",
    previous: "32.6%",
    forecast: "32.4%"
  },
  {
    id: "event-10",
    title: "US Federal Reserve Rate Decision",
    date: addDays(new Date(), 4),
    time: "20:00",
    type: "Meeting",
    impact: "High",
    country: "US",
    description: "Federal Reserve Federal Open Market Committee interest rate decision",
    previous: "5.5%",
    forecast: "5.5%"
  },
  {
    id: "event-11",
    title: "ECB Rate Decision",
    date: addDays(new Date(), 7),
    time: "14:45",
    type: "Meeting",
    impact: "Medium",
    country: "EU",
    description: "European Central Bank interest rate decision",
    previous: "4.5%",
    forecast: "4.5%"
  },
  {
    id: "event-12",
    title: "SA Mining Production",
    date: addDays(new Date(), 9),
    time: "11:30",
    type: "Release",
    impact: "Medium",
    country: "ZA",
    description: "Monthly mining production data",
    previous: "1.8%",
    forecast: "2.0%"
  },
  {
    id: "event-13",
    title: "SA Retail Sales",
    date: addDays(new Date(), 10),
    time: "13:00",
    type: "Release",
    impact: "Medium",
    country: "ZA",
    description: "Monthly retail sales figures",
    previous: "0.7%",
    forecast: "0.9%"
  },
  {
    id: "event-14",
    title: "UK CPI Data",
    date: addDays(new Date(), 3),
    time: "10:00",
    type: "Release",
    impact: "Low",
    country: "GB",
    description: "UK Consumer Price Index monthly release",
    previous: "3.2%",
    forecast: "3.1%"
  },
];

export default function EconomicCalendarPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImpact, setSelectedImpact] = useState<EventImpact[]>(["High", "Medium", "Low"])
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["ZA", "US", "EU", "GB"])
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>(["Report", "Meeting", "Speech", "Holiday", "Release"])

  // Get start and end date based on current view
  const getViewDates = () => {
    if (view === "day") {
      return {
        startDate: date,
        endDate: date
      }
    } else if (view === "week") {
      const start = startOfWeek(date, { weekStartsOn: 1 }) // Start on Monday
      return {
        startDate: start,
        endDate: endOfWeek(date, { weekStartsOn: 1 })
      }
    } else {
      // Simple month implementation (showing next 30 days)
      return {
        startDate: date,
        endDate: addDays(date, 30)
      }
    }
  }

  const { startDate, endDate } = getViewDates()

  // Filter events based on date range, search query, and filters
  const filteredEvents = economicEvents.filter(event => {
    // Filter by date range
    const isInDateRange = (
      (view === "day" && isSameDay(event.date, date)) ||
      (view === "week" && 
        (isAfter(event.date, startDate) || isSameDay(event.date, startDate)) && 
        (isBefore(event.date, endDate) || isSameDay(event.date, endDate))) ||
      (view === "month" && 
        (isAfter(event.date, startDate) || isSameDay(event.date, startDate)) && 
        (isBefore(event.date, endDate) || isSameDay(event.date, endDate)))
    )

    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by importance
    const matchesImpact = selectedImpact.includes(event.impact)
    
    // Filter by country
    const matchesCountry = selectedCountries.includes(event.country)
    
    // Filter by event type
    const matchesType = selectedTypes.includes(event.type)
    
    return isInDateRange && matchesSearch && matchesImpact && matchesCountry && matchesType
  })

  // Sort by date and time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime()
    if (dateCompare !== 0) return dateCompare
    return a.time.localeCompare(b.time)
  })

  // Navigation functions
  const navigatePrevious = () => {
    if (view === "day") {
      setDate(prev => addDays(prev, -1))
    } else if (view === "week") {
      setDate(prev => subWeeks(prev, 1))
    } else {
      setDate(prev => addDays(prev, -30))
    }
  }

  const navigateNext = () => {
    if (view === "day") {
      setDate(prev => addDays(prev, 1))
    } else if (view === "week") {
      setDate(prev => addWeeks(prev, 1))
    } else {
      setDate(prev => addDays(prev, 30))
    }
  }

  // Get today's events
  const todaysEvents = economicEvents.filter(event => 
    isSameDay(event.date, new Date())
  ).sort((a, b) => a.time.localeCompare(b.time))

  // Get impact badge style
  const getImpactBadge = (impact: EventImpact) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    }
  }

  // Get event type badge style
  const getEventTypeBadge = (type: EventType) => {
    switch (type) {
      case "Report":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Meeting":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
      case "Speech":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Holiday":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
      case "Release":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
    }
  }

  // Get country flag emoji
  const getCountryFlag = (country: string) => {
    switch (country) {
      case "ZA":
        return "🇿🇦"
      case "US":
        return "🇺🇸"
      case "EU":
        return "🇪🇺"
      case "GB":
        return "🇬🇧"
      default:
        return "🏳️"
    }
  }

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
                <BreadcrumbPage>Economic Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Economic Calendar</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Track upcoming economic events, data releases, central bank meetings, and other financial announcements 
              that could impact the South African markets and global economy.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Select Date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    if (date) {
                      setDate(date)
                      setView("day")
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="ghost" size="icon" onClick={() => setDate(new Date())}>
              <Clock className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            {/* Calendar View Controls */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button 
                      variant={view === "day" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setView("day")}
                    >
                      Day
                    </Button>
                    <Button 
                      variant={view === "week" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setView("week")}
                    >
                      Week
                    </Button>
                    <Button 
                      variant={view === "month" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setView("month")}
                    >
                      Month
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="icon" onClick={navigatePrevious}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" onClick={() => setDate(new Date())}>Today</Button>
                    <Button variant="outline" size="icon" onClick={navigateNext}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="pb-2 border-b">
                  <h2 className="font-bold text-lg">
                    {view === "day" && format(date, "EEEE, MMMM d, yyyy")}
                    {view === "week" && `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`}
                    {view === "month" && `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d, yyyy")}`}
                  </h2>
                </div>
              </CardContent>
            </Card>
            
            {/* Filter and Search Controls */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Search events..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Impact Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          <Filter className="h-4 w-4" />
                          Impact
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Event Impact</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={selectedImpact.includes("High")}
                          onCheckedChange={(checked) => {
                            setSelectedImpact(checked 
                              ? [...selectedImpact, "High"] 
                              : selectedImpact.filter(i => i !== "High"))
                          }}
                        >
                          <Badge className={cn("mr-2", getImpactBadge("High"))}>High</Badge>
                          High Impact
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedImpact.includes("Medium")}
                          onCheckedChange={(checked) => {
                            setSelectedImpact(checked 
                              ? [...selectedImpact, "Medium"] 
                              : selectedImpact.filter(i => i !== "Medium"))
                          }}
                        >
                          <Badge className={cn("mr-2", getImpactBadge("Medium"))}>Med</Badge>
                          Medium Impact
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedImpact.includes("Low")}
                          onCheckedChange={(checked) => {
                            setSelectedImpact(checked 
                              ? [...selectedImpact, "Low"] 
                              : selectedImpact.filter(i => i !== "Low"))
                          }}
                        >
                          <Badge className={cn("mr-2", getImpactBadge("Low"))}>Low</Badge>
                          Low Impact
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Country Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          <Layers className="h-4 w-4" />
                          Countries
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Countries</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={selectedCountries.includes("ZA")}
                          onCheckedChange={(checked) => {
                            setSelectedCountries(checked 
                              ? [...selectedCountries, "ZA"] 
                              : selectedCountries.filter(c => c !== "ZA"))
                          }}
                        >
                          {getCountryFlag("ZA")} South Africa
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedCountries.includes("US")}
                          onCheckedChange={(checked) => {
                            setSelectedCountries(checked 
                              ? [...selectedCountries, "US"] 
                              : selectedCountries.filter(c => c !== "US"))
                          }}
                        >
                          {getCountryFlag("US")} United States
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedCountries.includes("EU")}
                          onCheckedChange={(checked) => {
                            setSelectedCountries(checked 
                              ? [...selectedCountries, "EU"] 
                              : selectedCountries.filter(c => c !== "EU"))
                          }}
                        >
                          {getCountryFlag("EU")} Euro Area
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedCountries.includes("GB")}
                          onCheckedChange={(checked) => {
                            setSelectedCountries(checked 
                              ? [...selectedCountries, "GB"] 
                              : selectedCountries.filter(c => c !== "GB"))
                          }}
                        >
                          {getCountryFlag("GB")} United Kingdom
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Event Type Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          <Grid className="h-4 w-4" />
                          Event Types
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Event Types</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={selectedTypes.includes("Release")}
                          onCheckedChange={(checked) => {
                            setSelectedTypes(checked 
                              ? [...selectedTypes, "Release"] 
                              : selectedTypes.filter(t => t !== "Release"))
                          }}
                        >
                          <Badge className={cn("mr-2", getEventTypeBadge("Release"))}>Data</Badge>
                          Data Releases
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedTypes.includes("Meeting")}
                          onCheckedChange={(checked) => {
                            setSelectedTypes(checked 
                              ? [...selectedTypes, "Meeting"] 
                              : selectedTypes.filter(t => t !== "Meeting"))
                          }}
                        >
                          <Badge className={cn("mr-2", getEventTypeBadge("Meeting"))}>Meeting</Badge>
                          Meetings
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedTypes.includes("Speech")}
                          onCheckedChange={(checked) => {
                            setSelectedTypes(checked 
                              ? [...selectedTypes, "Speech"] 
                              : selectedTypes.filter(t => t !== "Speech"))
                          }}
                        >
                          <Badge className={cn("mr-2", getEventTypeBadge("Speech"))}>Speech</Badge>
                          Speeches
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedTypes.includes("Holiday")}
                          onCheckedChange={(checked) => {
                            setSelectedTypes(checked 
                              ? [...selectedTypes, "Holiday"] 
                              : selectedTypes.filter(t => t !== "Holiday"))
                          }}
                        >
                          <Badge className={cn("mr-2", getEventTypeBadge("Holiday"))}>Holiday</Badge>
                          Market Holidays
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedTypes.includes("Report")}
                          onCheckedChange={(checked) => {
                            setSelectedTypes(checked 
                              ? [...selectedTypes, "Report"] 
                              : selectedTypes.filter(t => t !== "Report"))
                          }}
                        >
                          <Badge className={cn("mr-2", getEventTypeBadge("Report"))}>Report</Badge>
                          Reports
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Layout Toggle */}
                    <div className="hidden sm:flex rounded-md border">
                      <Button variant="ghost" size="sm" className="px-2.5">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2.5">
                        <Grid className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Calendar Events List */}
            <Card className="mt-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Economic Events</CardTitle>
                  <Badge variant="outline" className="bg-muted/30 font-normal">
                    {sortedEvents.length} events
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Date & Time</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead className="hidden md:table-cell">Previous</TableHead>
                      <TableHead className="hidden md:table-cell">Forecast</TableHead>
                      <TableHead className="hidden md:table-cell">Actual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEvents.length > 0 ? (
                      sortedEvents.map((event) => (
                        <TableRow key={event.id} className="group hover:bg-muted/40">
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="font-medium">{format(event.date, "EEE, d MMM")}</div>
                              <div className="text-sm text-muted-foreground">{event.time} SAST</div>
                              <div className="hidden sm:flex items-center gap-1.5 mt-1">
                                <span className="text-sm">{getCountryFlag(event.country)}</span>
                                <Badge className={getImpactBadge(event.impact)} variant="secondary">
                                  {event.impact}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div>
                                <span className="font-medium">{event.title}</span>
                                <Badge className={`ml-2 ${getEventTypeBadge(event.type)}`} variant="secondary">
                                  {event.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-medium">
                            {event.previous || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-medium">
                            {event.forecast || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {event.actual ? (
                              <span className={`font-medium ${
                                event.previous && event.actual > event.previous ? "text-emerald-600" : 
                                event.previous && event.actual < event.previous ? "text-red-600" : ""
                              }`}>
                                {event.actual}
                                {event.previous && event.actual > event.previous && <ArrowUp className="inline ml-1 h-3 w-3" />}
                                {event.previous && event.actual < event.previous && <ArrowDown className="inline ml-1 h-3 w-3" />}
                              </span>
                            ) : "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No events found for the selected criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div>
            {/* Today's Events */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today's Events</CardTitle>
                    <CardDescription>{format(new Date(), "EEEE, MMMM d, yyyy")}</CardDescription>
                  </div>
                  <Badge className={`${todaysEvents.length > 0 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-muted"}`}>
                    {todaysEvents.length} Events
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {todaysEvents.length > 0 ? (
                    todaysEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="p-3 border-b last:border-b-0 hover:bg-muted/40"
                      >
                        <div className="flex items-start gap-2">
                          <div className="bg-muted/70 rounded p-1.5 text-sm font-medium h-8 w-16 flex items-center justify-center">
                            {event.time}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <span className="text-sm">{getCountryFlag(event.country)}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getEventTypeBadge(event.type)} variant="secondary">
                                {event.type}
                              </Badge>
                              <Badge className={getImpactBadge(event.impact)} variant="secondary">
                                {event.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {event.description}
                            </p>
                            {(event.previous || event.forecast || event.actual) && (
                              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                {event.previous && (
                                  <div>
                                    <span className="text-muted-foreground">Previous:</span>
                                    <p className="font-medium">{event.previous}</p>
                                  </div>
                                )}
                                {event.forecast && (
                                  <div>
                                    <span className="text-muted-foreground">Forecast:</span>
                                    <p className="font-medium">{event.forecast}</p>
                                  </div>
                                )}
                                {event.actual && (
                                  <div>
                                    <span className="text-muted-foreground">Actual:</span>
                                    <p className={`font-medium ${
                                      event.previous && event.actual > event.previous ? "text-emerald-600" : 
                                      event.previous && event.actual < event.previous ? "text-red-600" : ""
                                    }`}>
                                      {event.actual}
                                      {event.previous && event.actual > event.previous && <ArrowUp className="inline ml-1 h-3 w-3" />}
                                      {event.previous && event.actual < event.previous && <ArrowDown className="inline ml-1 h-3 w-3" />}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>No events scheduled for today.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Important Upcoming Events */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Key Upcoming Events</CardTitle>
                <CardDescription>High-impact events in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {economicEvents
                  .filter(event => 
                    event.impact === "High" && 
                    isAfter(event.date, new Date()) &&
                    isBefore(event.date, addDays(new Date(), 7))
                  )
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="p-3 border-b last:border-b-0 hover:bg-muted/40">
                      <div className="flex items-start gap-2">
                        <div className="bg-muted/70 rounded p-1.5 text-xs font-medium h-12 w-16 flex flex-col items-center justify-center">
                          <span>{format(event.date, "d MMM")}</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{event.title}</h3>
                            <span className="text-sm">{getCountryFlag(event.country)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </CardContent>
            </Card>
            
            {/* Event Legend */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Event Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="mb-2 font-medium">Event Types</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getEventTypeBadge("Release")} variant="secondary">
                        Data Release
                      </Badge>
                      <Badge className={getEventTypeBadge("Meeting")} variant="secondary">
                        Meeting
                      </Badge>
                      <Badge className={getEventTypeBadge("Speech")} variant="secondary">
                        Speech
                      </Badge>
                      <Badge className={getEventTypeBadge("Holiday")} variant="secondary">
                        Holiday
                      </Badge>
                      <Badge className={getEventTypeBadge("Report")} variant="secondary">
                        Report
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="mb-2 font-medium">Market Impact</p>
                    <div className="flex gap-2">
                      <Badge className={getImpactBadge("High")} variant="secondary">
                        High Impact
                      </Badge>
                      <Badge className={getImpactBadge("Medium")} variant="secondary">
                        Medium Impact
                      </Badge>
                      <Badge className={getImpactBadge("Low")} variant="secondary">
                        Low Impact
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Calendar Information */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <CardTitle>About the Economic Calendar</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">What is the Economic Calendar?</h3>
                <p className="mb-4">
                  The economic calendar is a tool that tracks market-moving events across the global economy, 
                  with a focus on South African markets. These events include economic indicators, central bank 
                  announcements, government policies, and other financial news that can affect asset values.
                </p>
                <p>
                  Our calendar is designed to help you anticipate market movements and make informed trading decisions. 
                  Events are categorized by importance, with high-impact events typically causing the most significant 
                  market reactions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">How to Use the Calendar</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <span className="font-medium text-foreground">Monitor high-impact events</span>: 
                    Pay close attention to events labeled as "High Impact" as these typically have the greatest effect on markets.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Compare forecasts to actuals</span>: 
                    When actual data differs significantly from forecasts, markets often react strongly.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Plan your trading</span>: 
                    Be aware of upcoming announcements that might affect your investment positions.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Filter by country</span>: 
                    Focus on events from specific economies that are relevant to your trading strategy.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <div className="text-xs text-muted-foreground">
              All times are shown in South African Standard Time (SAST). Data is provided for informational purposes only.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}