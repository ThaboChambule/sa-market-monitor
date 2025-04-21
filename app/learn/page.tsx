"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { 
  ArrowRight, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Filter, 
  Loader2, 
  Search, 
  Share2,
  Star, 
  Tag, 
  User2 
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample educational content
const articles = [
  {
    id: "jse-intro",
    title: "Introduction to the JSE (Johannesburg Stock Exchange)",
    excerpt: "Learn about South Africa's primary stock exchange - its history, structure, and how it functions in the global market.",
    category: "Basics",
    author: "Sarah Ndlovu",
    authorRole: "Financial Analyst",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-04-15",
    readTime: 8,
    image: "/placeholder.jpg",
    featured: true,
    tags: ["JSE", "Stock Market", "Basics", "South Africa"]
  },
  {
    id: "understanding-topi",
    title: "Understanding the TOPI: Top 40 Index Explained",
    excerpt: "A comprehensive guide to the JSE Top 40 index - what it includes, how it's calculated, and why it matters to investors.",
    category: "Indices",
    author: "Thabo Molefe",
    authorRole: "Investment Strategist",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-04-10",
    readTime: 12,
    image: "/placeholder.jpg",
    featured: true,
    tags: ["TOPI", "Index", "JSE Top 40", "Investing"]
  },
  {
    id: "rand-volatility",
    title: "Navigating Rand Volatility: Strategies for Investors",
    excerpt: "How to protect your portfolio from currency fluctuations and potentially profit from movements in the South African Rand.",
    category: "Currency",
    author: "Lisa van der Merwe",
    authorRole: "Forex Specialist",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-04-08",
    readTime: 15,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["ZAR", "Forex", "Currency Risk", "Hedging"]
  },
  {
    id: "etf-investing-sa",
    title: "ETF Investing in South Africa: A Beginner's Guide",
    excerpt: "Everything you need to know about Exchange Traded Funds available on the JSE and how to include them in your investment strategy.",
    category: "ETFs",
    author: "John Dlamini",
    authorRole: "Portfolio Manager",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-04-05",
    readTime: 10,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["ETF", "Passive Investing", "Diversification", "JSE"]
  },
  {
    id: "tax-efficient-investing",
    title: "Tax-Efficient Investing in South Africa",
    excerpt: "Learn about Tax-Free Savings Accounts, Retirement Annuities, and other tax-advantaged investment vehicles available to South Africans.",
    category: "Tax",
    author: "Priya Naidoo",
    authorRole: "Tax Consultant",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-04-01",
    readTime: 14,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Tax", "TFSA", "RA", "Investment Planning"]
  },
  {
    id: "reading-financial-statements",
    title: "How to Read JSE Company Financial Statements",
    excerpt: "A step-by-step guide to understanding the balance sheet, income statement, and cash flow statement of South African listed companies.",
    category: "Analysis",
    author: "Michael Brown",
    authorRole: "Chartered Accountant",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-03-28",
    readTime: 18,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Financial Statements", "Analysis", "Fundamentals", "Investing"]
  },
  {
    id: "resources-sectors-sa",
    title: "Investing in South Africa's Resources Sector",
    excerpt: "An overview of the mining and resources companies listed on the JSE and the factors that influence their performance.",
    category: "Sectors",
    author: "Nomsa Khumalo",
    authorRole: "Mining Analyst",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-03-25",
    readTime: 11,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Mining", "Resources", "Commodities", "Gold"]
  },
  {
    id: "dividend-investing-jse",
    title: "Dividend Investing on the JSE",
    excerpt: "How to build a dividend-focused portfolio using JSE-listed shares and what to look for in dividend-paying companies.",
    category: "Strategy",
    author: "David Wilson",
    authorRole: "Income Strategist",
    authorAvatar: "/placeholder-user.jpg",
    date: "2025-03-20",
    readTime: 9,
    image: "/placeholder.jpg",
    featured: false,
    tags: ["Dividends", "Income", "Yield", "Investing"]
  }
];

const courses = [
  {
    id: "jse-fundamentals",
    title: "JSE Trading Fundamentals",
    description: "Master the basics of trading on the Johannesburg Stock Exchange",
    level: "Beginner",
    lessons: 12,
    duration: "6 weeks",
    instructor: "Thabo Molefe",
    instructorRole: "Investment Strategist",
    enrollments: 1245,
    rating: 4.8,
    image: "/placeholder.jpg",
    tags: ["JSE", "Trading", "Basics"],
    popular: true
  },
  {
    id: "sa-technical-analysis",
    title: "Technical Analysis for SA Markets",
    description: "Learn to analyze chart patterns specific to South African equities",
    level: "Intermediate",
    lessons: 18,
    duration: "8 weeks",
    instructor: "Lisa van der Merwe",
    instructorRole: "Technical Analyst",
    enrollments: 876,
    rating: 4.6,
    image: "/placeholder.jpg",
    tags: ["Technical Analysis", "Charts", "Trading"],
    popular: true
  },
  {
    id: "fundamental-analysis-sa",
    title: "Fundamental Analysis: South African Edition",
    description: "Value South African companies using local economic contexts and indicators",
    level: "Intermediate",
    lessons: 15,
    duration: "7 weeks",
    instructor: "Sarah Ndlovu",
    instructorRole: "Financial Analyst",
    enrollments: 692,
    rating: 4.7,
    image: "/placeholder.jpg",
    tags: ["Fundamental Analysis", "Valuation", "Investing"],
    popular: false
  },
  {
    id: "sa-macroeconomics",
    title: "South African Macroeconomics for Investors",
    description: "Understand how macroeconomic factors impact the JSE and your investments",
    level: "Advanced",
    lessons: 14,
    duration: "6 weeks",
    instructor: "Prof. Johannes van Rooyen",
    instructorRole: "Economist",
    enrollments: 543,
    rating: 4.9,
    image: "/placeholder.jpg",
    tags: ["Macroeconomics", "Economy", "Policy"],
    popular: false
  },
  {
    id: "sa-portfolio-construction",
    title: "Building a Resilient South African Portfolio",
    description: "Create and manage a diversified portfolio of JSE-listed assets",
    level: "Intermediate",
    lessons: 10,
    duration: "5 weeks",
    instructor: "Priya Naidoo",
    instructorRole: "Portfolio Manager",
    enrollments: 782,
    rating: 4.5,
    image: "/placeholder.jpg",
    tags: ["Portfolio", "Asset Allocation", "Risk Management"],
    popular: true
  },
  {
    id: "sa-etf-masterclass",
    title: "JSE ETF Masterclass",
    description: "Everything you need to know about Exchange Traded Funds on the JSE",
    level: "Beginner",
    lessons: 8,
    duration: "4 weeks",
    instructor: "Michael Brown",
    instructorRole: "ETF Specialist",
    enrollments: 924,
    rating: 4.7,
    image: "/placeholder.jpg",
    tags: ["ETF", "Passive", "Index"],
    popular: false
  }
];

const glossaryItems = [
  { term: "All Share Index (ALSI)", definition: "The main index of the JSE, representing approximately 99% of the full market capitalization of all eligible equities listed on the Main Board of the JSE." },
  { term: "Top 40 Index (TOPI)", definition: "An index of the 40 largest companies listed on the JSE, ranked by market capitalization." },
  { term: "SARB", definition: "The South African Reserve Bank, which is the central bank of South Africa responsible for monetary policy and financial stability." },
  { term: "JSE", definition: "Johannesburg Stock Exchange, the largest stock exchange in Africa and the main exchange for South African equities and bonds." },
  { term: "ZAR", definition: "The currency code for South African Rand, the official currency of South Africa." },
  { term: "STRATE", definition: "Share Transactions Totally Electronic - South Africa's central securities depository that manages the settlement of securities transactions." },
  { term: "Dual-Listed Company", definition: "A company that is listed on the JSE and at least one other foreign stock exchange." },
  { term: "SENS", definition: "Stock Exchange News Service - the JSE's real-time news dissemination service for company announcements." },
  { term: "Krugerrand", definition: "A South African gold coin, first minted in 1967, that is a popular investment vehicle for gold." },
  { term: "BEE", definition: "Black Economic Empowerment - a South African government program to increase participation of black citizens in the economy." },
  { term: "Repo Rate", definition: "The rate at which the SARB lends money to commercial banks; a key interest rate used for monetary policy." },
  { term: "FTSE/JSE", definition: "Refers to indices that are created and managed through a partnership between FTSE Russell and the JSE." },
  { term: "Equity", definition: "Ownership interest in a company in the form of shares." },
  { term: "Market Capitalization", definition: "The total value of a company's outstanding shares, calculated by multiplying the share price by the number of shares outstanding." },
  { term: "Dividend Yield", definition: "The annual dividend payment expressed as a percentage of the share price." },
  { term: "P/E Ratio", definition: "Price-to-Earnings ratio - a valuation metric calculated by dividing a company's share price by its earnings per share." },
  { term: "Bull Market", definition: "A market condition where share prices are rising or expected to rise, typically accompanied by investor optimism." },
  { term: "Bear Market", definition: "A market condition where share prices are falling or expected to fall, typically accompanied by investor pessimism." },
  { term: "TFSA", definition: "Tax-Free Savings Account - a South African investment vehicle that allows tax-free growth and withdrawals, subject to annual contribution limits." },
  { term: "Rand Hedge", definition: "A company listed on the JSE that earns a significant portion of its revenue in foreign currencies, providing protection against rand depreciation." }
];

const categories = [
  "All",
  "Basics",
  "Indices",
  "Currency",
  "ETFs",
  "Tax",
  "Analysis",
  "Sectors",
  "Strategy",
  "Technical Analysis",
  "Economics",
  "Trading",
  "Glossary"
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Filter glossary items based on search
  const filteredGlossary = glossaryItems.filter(item => {
    return searchQuery === "" ||
           item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.definition.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Market Education</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Expand your knowledge of South African markets with our educational resources, 
              courses, and financial glossary tailored for investors in the JSE and 
              local financial markets.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search" 
              placeholder="Search articles, courses, or terms..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{selectedCategory}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-64 overflow-auto">
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-muted" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="articles" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex p-1 bg-muted/50 backdrop-blur rounded-xl">
            <TabsTrigger value="articles" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Articles
              </div>
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Courses
              </div>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-lg transition-all">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Glossary
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* Articles Tab */}
          <TabsContent value="articles">
            {/* Featured Articles */}
            {searchQuery === "" && selectedCategory === "All" && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {articles
                    .filter(article => article.featured)
                    .map(article => (
                      <Link href={`/learn/articles/${article.id}`} key={article.id}>
                        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                          <div className="aspect-[16/9] bg-muted relative">
                            <Image 
                              src={article.image} 
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="rounded-full">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {article.readTime} min read
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={article.authorAvatar} />
                                  <AvatarFallback>{article.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <p className="font-medium">{article.author}</p>
                                  <p className="text-muted-foreground text-xs">{formatDate(article.date)}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost">
                                Read more
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  }
                </div>
              </div>
            )}
            
            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
                {searchQuery && <span className="text-muted-foreground text-lg ml-2">for "{searchQuery}"</span>}
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-muted-foreground">No articles found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map(article => (
                    <Link href={`/learn/articles/${article.id}`} key={article.id}>
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                        <div className="aspect-[16/9] bg-muted relative">
                          <Image 
                            src={article.image} 
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="rounded-full">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime} min read
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {article.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={article.authorAvatar} />
                              <AvatarFallback>{article.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{article.author}</p>
                              <p className="text-muted-foreground text-xs">{formatDate(article.date)}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses">
            {searchQuery === "" && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {courses
                    .filter(course => course.popular)
                    .map(course => (
                      <Link href={`/learn/courses/${course.id}`} key={course.id}>
                        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                          <div className="aspect-[16/9] bg-muted relative">
                            <Image 
                              src={course.image} 
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                              {course.level}
                            </div>
                          </div>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2">
                              {course.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="rounded-full text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                              {course.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{course.lessons} lessons</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback>{course.instructor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <p className="font-medium">{course.instructor}</p>
                                <p className="text-muted-foreground text-xs">{course.instructorRole}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))
                  }
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Courses"}
              </h2>
              
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-muted-foreground">No courses found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredCourses.map(course => (
                    <Link href={`/learn/courses/${course.id}`} key={course.id}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-muted relative">
                            <div className="aspect-square md:h-full">
                              <Image 
                                src={course.image} 
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded-md text-xs font-medium">
                              {course.level}
                            </div>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {course.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {course.description}
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Duration</span>
                                <span className="font-medium">{course.duration}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Lessons</span>
                                <span className="font-medium">{course.lessons}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Enrolled</span>
                                <span className="font-medium">{course.enrollments.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{course.instructor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{course.instructor}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">{course.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Beginner's Track */}
            {searchQuery === "" && (
              <div className="mt-12">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400">Start Your JSE Investment Journey</CardTitle>
                    <CardDescription>Take our structured learning path for beginners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-3/5">
                        <p className="mb-6">
                          New to investing in South African markets? Our beginner track guides you through the fundamentals of the JSE,
                          basic investment principles, and how to build your first portfolio with South African assets.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                              <span className="font-medium">1</span>
                            </div>
                            <div>
                              <p className="font-medium">JSE Foundations</p>
                              <p className="text-sm text-muted-foreground">Understanding the Johannesburg Stock Exchange</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                              <span className="font-medium">2</span>
                            </div>
                            <div>
                              <p className="font-medium">Investment Basics</p>
                              <p className="text-sm text-muted-foreground">Building blocks of a smart investment strategy</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                              <span className="font-medium">3</span>
                            </div>
                            <div>
                              <p className="font-medium">Creating Your First Portfolio</p>
                              <p className="text-sm text-muted-foreground">Step-by-step guide to building a diverse portfolio</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center">
                              <span className="font-medium">4</span>
                            </div>
                            <div>
                              <p className="font-medium">Risk Management & Tax Planning</p>
                              <p className="text-sm text-muted-foreground">Protecting and optimizing your investments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/5">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Track Progress</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Completion</span>
                                  <span className="font-medium">0%</span>
                                </div>
                                <Progress value={0} className="h-2" />
                              </div>
                              
                              <div className="pt-2">
                                <Button className="w-full">Start Learning Path</Button>
                              </div>
                              <p className="text-xs text-center text-muted-foreground">
                                12 lessons • 8 hours • Beginner friendly
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          {/* Glossary Tab */}
          <TabsContent value="glossary">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Financial Terms Glossary</CardTitle>
                  <Badge variant="outline">
                    {filteredGlossary.length} {filteredGlossary.length === 1 ? 'term' : 'terms'}
                  </Badge>
                </div>
                <CardDescription>South African-focused financial and investment terminology</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredGlossary.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No terms found matching your search.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredGlossary.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-lg">{item.term}</h3>
                        <p className="text-muted-foreground">{item.definition}</p>
                        {index < filteredGlossary.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Newsletter Section */}
        <Card className="mt-12 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/50 dark:to-slate-900/50">
          <CardContent className="pt-6 pb-8 px-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Stay Informed on SA Markets</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter for weekly insights on the JSE, South African economy, 
                  and investment opportunities. Get market analysis and educational content 
                  delivered to your inbox.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col gap-3">
                <Input type="email" placeholder="Your email address" />
                <Button>Subscribe to Newsletter</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}