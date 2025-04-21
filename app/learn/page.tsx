"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Check, 
  ChevronRight, 
  Clock, 
  FileText, 
  FolderOpen, 
  GraduationCap, 
  Play, 
  Search, 
  Star, 
  Tag,
  TrendingUp, 
  VideoIcon, 
  Zap
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

// Course and Article Data
const courses = [
  {
    id: "investing-basics",
    title: "JSE Investing Basics",
    description: "Learn the fundamentals of investing in the Johannesburg Stock Exchange",
    image: "/placeholder.jpg",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
    category: "Investing",
    instructor: "Sarah Ndlovu",
    rating: 4.8,
    enrolled: 1245,
    progress: 0,
    topics: [
      "Understanding the JSE",
      "Types of securities",
      "How to read stock charts",
      "Market orders",
      "Risk management",
      "Building a portfolio",
      "Investment strategies",
      "Common investing mistakes"
    ]
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Fundamentals",
    description: "Master chart patterns and technical indicators for better trading decisions",
    image: "/placeholder.jpg",
    level: "Intermediate",
    duration: "4 hours",
    lessons: 12,
    category: "Trading",
    instructor: "Michael Patel",
    rating: 4.7,
    enrolled: 982,
    progress: 0,
    topics: [
      "Chart types and timeframes",
      "Support and resistance",
      "Trend lines and channels",
      "Moving averages",
      "Oscillators and momentum indicators",
      "Volume analysis",
      "Chart patterns",
      "Fibonacci retracements",
      "Divergence trading",
      "Technical analysis strategies",
      "Risk management in trading",
      "Building a trading plan"
    ]
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis of SA Stocks",
    description: "Learn how to analyze company financials and make informed investment decisions",
    image: "/placeholder.jpg",
    level: "Intermediate",
    duration: "3 hours",
    lessons: 10,
    category: "Investing",
    instructor: "Themba Khumalo",
    rating: 4.9,
    enrolled: 856,
    progress: 0,
    topics: [
      "Financial statements overview",
      "Income statement analysis",
      "Balance sheet analysis",
      "Cash flow statement analysis",
      "Financial ratios",
      "Valuation metrics",
      "Industry analysis",
      "Economic indicators",
      "Company research process",
      "Making investment decisions"
    ]
  },
  {
    id: "etf-investing",
    title: "ETF Investing in South Africa",
    description: "A comprehensive guide to building wealth through Exchange-Traded Funds",
    image: "/placeholder.jpg",
    level: "Beginner",
    duration: "1.5 hours",
    lessons: 6,
    category: "Investing",
    instructor: "Lisa van der Merwe",
    rating: 4.6,
    enrolled: 1102,
    progress: 0,
    topics: [
      "ETF basics and benefits",
      "Types of ETFs available in SA",
      "Costs and tax implications",
      "Building an ETF portfolio",
      "Rebalancing strategies",
      "Common ETF mistakes to avoid"
    ]
  },
  {
    id: "forex-trading",
    title: "Forex Trading for SA Investors",
    description: "Understanding currency markets and forex trading strategies",
    image: "/placeholder.jpg",
    level: "Advanced",
    duration: "5 hours",
    lessons: 15,
    category: "Trading",
    instructor: "James Wilson",
    rating: 4.5,
    enrolled: 723,
    progress: 0,
    topics: [
      "Currency markets explained",
      "Major and minor currency pairs",
      "Understanding forex quotes",
      "Technical analysis for forex",
      "Fundamental analysis for forex",
      "Trading sessions and volatility",
      "Entry and exit strategies",
      "Position sizing",
      "Risk management techniques",
      "Trading psychology",
      "Developing a trading plan",
      "Demo trading",
      "Common forex trading mistakes",
      "Advanced forex strategies",
      "Long-term forex investing"
    ]
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning in South Africa",
    description: "Build a secure financial future with effective retirement strategies",
    image: "/placeholder.jpg",
    level: "Beginner",
    duration: "2.5 hours",
    lessons: 8,
    category: "Financial Planning",
    instructor: "Nomsa Dlamini",
    rating: 4.9,
    enrolled: 1376,
    progress: 0,
    topics: [
      "Retirement planning basics",
      "Retirement savings vehicles",
      "Pension vs. provident funds",
      "Tax-efficient retirement planning",
      "Investment strategies for retirement",
      "Retirement income planning",
      "Estate planning basics",
      "Common retirement planning mistakes"
    ]
  }
];

const articles = [
  {
    id: "jse-overview",
    title: "Complete Guide to the JSE",
    description: "Everything you need to know about the Johannesburg Stock Exchange",
    category: "Market Knowledge",
    author: "Financial Education Team",
    date: "April 15, 2025",
    readTime: "12 min",
    image: "/placeholder.jpg",
    featured: true,
    tags: ["JSE", "Stock Market", "Investing"]
  },
  {
    id: "rand-analysis",
    title: "South African Rand: Historical Performance and Outlook",
    description: "Analysis of ZAR performance against major currencies and future trends",
    category: "Currency",
    author: "Currency Research Team",
    date: "April 10, 2025",
    readTime: "8 min",
    image: "/placeholder.jpg",
    featured: false,
    tags: ["ZAR", "Currency", "Forex"]
  },
  {
    id: "tax-efficient",
    title: "Tax-Efficient Investing in South Africa",
    description: "Maximize your returns by minimizing tax implications on your investments",
    category: "Tax Planning",
    author: "Tax Advisory Team",
    date: "April 8, 2025",
    readTime: "10 min",
    image: "/placeholder.jpg",
    featured: true,
    tags: ["Tax", "Investing", "Financial Planning"]
  },
  {
    id: "dividend-stocks",
    title: "Top Dividend Stocks on the JSE",
    description: "Discover high-yielding dividend stocks for passive income generation",
    category: "Investing",
    author: "Equity Research Team",
    date: "April 5, 2025",
    readTime: "7 min",
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Dividends", "Stocks", "Income"]
  },
  {
    id: "market-cycles",
    title: "Understanding Market Cycles in South Africa",
    description: "How economic cycles affect the JSE and what it means for your investments",
    category: "Market Analysis",
    author: "Economic Research Team",
    date: "April 2, 2025",
    readTime: "11 min",
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Economy", "Market Cycles", "Analysis"]
  },
  {
    id: "beginner-mistakes",
    title: "5 Common Mistakes South African Beginner Investors Make",
    description: "Avoid these pitfalls to improve your investment returns",
    category: "Investing",
    author: "Financial Education Team",
    date: "March 29, 2025",
    readTime: "6 min",
    image: "/placeholder.jpg",
    featured: true,
    tags: ["Beginners", "Investing", "Mistakes"]
  },
  {
    id: "retirement-guide",
    title: "Complete Retirement Guide for South Africans",
    description: "From RAs to living annuities: Planning your retirement in South Africa",
    category: "Retirement",
    author: "Retirement Planning Team",
    date: "March 25, 2025",
    readTime: "15 min",
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Retirement", "Planning", "Finance"]
  },
  {
    id: "etf-comparison",
    title: "Comparing the Best ETFs in South Africa",
    description: "Analysis of performance, costs, and suitability of popular SA ETFs",
    category: "ETFs",
    author: "Investment Research Team",
    date: "March 20, 2025",
    readTime: "9 min",
    image: "/placeholder.jpg",
    featured: false,
    tags: ["ETFs", "Investing", "Comparison"]
  }
];

const glossaryTerms = [
  {
    term: "All-Share Index (ALSI)",
    definition: "The FTSE/JSE All-Share Index is a market capitalization-weighted index that tracks the performance of all companies listed on the JSE."
  },
  {
    term: "Bear Market",
    definition: "A market condition in which prices of securities fall 20% or more from recent highs amid widespread pessimism and negative investor sentiment."
  },
  {
    term: "Bull Market",
    definition: "A financial market of a group of securities in which prices are rising or are expected to rise. The term is most often used to refer to the stock market."
  },
  {
    term: "Dividend",
    definition: "A distribution of a portion of a company's earnings, decided by the board of directors, to its shareholders."
  },
  {
    term: "ETF (Exchange-Traded Fund)",
    definition: "An investment fund traded on stock exchanges, much like stocks, which holds assets such as stocks, commodities, or bonds."
  },
  {
    term: "FTSE/JSE Top 40 Index",
    definition: "An index of the 40 largest companies listed on the JSE, ranked by market capitalization."
  },
  {
    term: "JSE (Johannesburg Stock Exchange)",
    definition: "The largest stock exchange in Africa, located in Johannesburg, South Africa."
  },
  {
    term: "Market Capitalization",
    definition: "The total market value of a company's outstanding shares, calculated by multiplying the share price by the number of shares outstanding."
  },
  {
    term: "P/E Ratio (Price-to-Earnings Ratio)",
    definition: "A ratio for valuing a company that measures its current share price relative to its per-share earnings."
  },
  {
    term: "SENS (Stock Exchange News Service)",
    definition: "A service provided by the JSE that electronically publishes all company announcements and price-sensitive information."
  },
  {
    term: "STRATE",
    definition: "Share Transactions Totally Electronic, the licensed Central Securities Depository (CSD) for the electronic settlement of financial instruments in South Africa."
  },
  {
    term: "TFSAs (Tax-Free Savings Accounts)",
    definition: "Investment accounts in South Africa that allow individuals to earn investment income tax-free, subject to annual and lifetime contribution limits."
  },
  {
    term: "Volatility",
    definition: "A statistical measure of the dispersion of returns for a given security or market index, often measured using standard deviation."
  },
  {
    term: "Yield",
    definition: "The income return on an investment, such as the interest or dividends received from holding a particular security."
  },
  {
    term: "ZAR",
    definition: "The currency code for the South African Rand, the official currency of South Africa."
  }
];

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  
  // Filter articles based on search
  const filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           article.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Filter glossary terms based on search
  const filteredGlossaryTerms = glossaryTerms.filter(item => {
    return item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.definition.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const featuredArticles = articles.filter(article => article.featured);
  
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
                <BreadcrumbPage>Learn</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container py-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 mb-8">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Become a Better Investor
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Master the South African markets with our curated courses, articles, 
                and resources designed to help you make informed investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Articles
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat" />
          </div>
        </div>
        
        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="relative w-full md:w-auto md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses, articles, and terms..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === "investing" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("investing")}
            >
              Investing
            </Button>
            <Button 
              variant={selectedCategory === "trading" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("trading")}
            >
              Trading
            </Button>
            <Button 
              variant={selectedCategory === "financial planning" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("financial planning")}
            >
              Financial Planning
            </Button>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="mb-8">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
            <TabsTrigger value="courses">
              <GraduationCap className="mr-2 h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="articles">
              <FileText className="mr-2 h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="glossary">
              <BookOpen className="mr-2 h-4 w-4" />
              Glossary
            </TabsTrigger>
          </TabsList>
          
          {/* Courses Tab */}
          <TabsContent value="courses">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Search Results for "{searchQuery}"</h2>
                {filteredCourses.length === 0 && (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No courses found matching your search.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {filteredCourses.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      <Image 
                        src={course.image} 
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" className="gap-2">
                          <Play className="h-4 w-4" />
                          Start Learning
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        {course.level}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline">{course.category}</Badge>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{course.rating}</span>
                          <span className="text-muted-foreground ml-1">({course.enrolled})</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <FolderOpen className="h-3 w-3 mr-1" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarFallback className="text-xs bg-primary/10">
                              {course.instructor.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {course.instructor}
                        </div>
                      </div>
                      
                      {course.progress > 0 && (
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/learn/courses/${course.id}`}>
                          <span className="flex items-center">
                            {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {!searchQuery && selectedCategory === "all" && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="border-primary/30 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        Beginner Investor
                      </CardTitle>
                      <CardDescription>
                        Start your investment journey with the essential knowledge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {[1, 2, 3, 4].map((step) => (
                          <li key={step} className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                              {step}
                            </div>
                            <span className="text-sm">
                              {step === 1 && "JSE Investing Basics"}
                              {step === 2 && "Understanding Financial Statements"}
                              {step === 3 && "Introduction to Risk Management"}
                              {step === 4 && "Building Your First Portfolio"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Start This Path
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        Active Trader
                      </CardTitle>
                      <CardDescription>
                        Learn technical analysis and chart reading skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {[1, 2, 3, 4].map((step) => (
                          <li key={step} className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium">
                              {step}
                            </div>
                            <span className="text-sm">
                              {step === 1 && "Technical Analysis Fundamentals"}
                              {step === 2 && "Chart Patterns and Indicators"}
                              {step === 3 && "Risk Management for Traders"}
                              {step === 4 && "Developing a Trading Strategy"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Start This Path
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        Advanced Investor
                      </CardTitle>
                      <CardDescription>
                        Elevate your investment knowledge to professional level
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {[1, 2, 3, 4].map((step) => (
                          <li key={step} className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium">
                              {step}
                            </div>
                            <span className="text-sm">
                              {step === 1 && "Advanced Fundamental Analysis"}
                              {step === 2 && "Portfolio Construction & Optimization"}
                              {step === 3 && "Alternative Investments"}
                              {step === 4 && "Market Sentiment & Psychology"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Start This Path
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Articles Tab */}
          <TabsContent value="articles">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Search Results for "{searchQuery}"</h2>
                {filteredArticles.length === 0 && (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {!searchQuery && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured Articles</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {featuredArticles.slice(0, 3).map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="aspect-[16/9] relative bg-muted">
                        <Image 
                          src={article.image} 
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          {article.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center text-sm">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs">
                              {article.author.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{article.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/learn/articles/${article.id}`}>
                            Read Article
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-2">
              {(searchQuery ? filteredArticles : articles).map((article) => (
                <Card key={article.id} className="flex overflow-hidden">
                  <div className="hidden md:block w-32 relative bg-muted shrink-0">
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader className="p-4">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="mb-2">{article.category}</Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base line-clamp-1">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{article.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {article.date}
                      </div>
                      <Button variant="ghost" size="sm" asChild className="h-8">
                        <Link href={`/learn/articles/${article.id}`}>
                          Read Article
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
            
            {!searchQuery && (
              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Articles</Button>
              </div>
            )}
          </TabsContent>
          
          {/* Glossary Tab */}
          <TabsContent value="glossary">
            <Card>
              <CardHeader>
                <CardTitle>Financial Terms Glossary</CardTitle>
                <CardDescription>
                  Common terms and definitions used in South African financial markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchQuery && filteredGlossaryTerms.length === 0 && (
                  <div className="text-center py-8 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No terms found matching your search.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
                
                {(searchQuery ? filteredGlossaryTerms : glossaryTerms)
                  .sort((a, b) => a.term.localeCompare(b.term))
                  .map((item, index) => (
                    <div 
                      key={item.term} 
                      className={`py-4 ${index !== 0 ? "border-t" : ""}`}
                    >
                      <h3 className="font-medium mb-1">{item.term}</h3>
                      <p className="text-sm text-muted-foreground">{item.definition}</p>
                    </div>
                  ))
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Call-to-Action Section */}
        <div className="mt-12">
          <Card className="bg-muted/25">
            <CardHeader className="text-center pb-2">
              <CardTitle>Start Your Financial Education Journey Today</CardTitle>
              <CardDescription>
                Take the first step toward financial literacy and investment success
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Button size="lg" className="gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Enroll in a Course
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <VideoIcon className="h-5 w-5" />
                  Watch Free Tutorials
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6 pb-4">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Expert Instructors
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  South African Focus
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Beginner to Advanced
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  Certificate of Completion
                </li>
              </ul>
            </CardFooter>
          </Card>
        </div>
        
        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <VideoIcon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Short educational videos on key investing concepts</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">View Videos</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Downloadable Guides</CardTitle>
                <CardDescription>PDF resources for in-depth learning</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Browse Guides</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Webinars & Events</CardTitle>
                <CardDescription>Live educational sessions with market experts</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">View Schedule</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Tag className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Investment Tools</CardTitle>
                <CardDescription>Calculators and tools for investors</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">Explore Tools</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}