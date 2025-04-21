# MzansiMarkets

## 📋 Table of Contents

- [About the Project](#about-the-project)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## 🚀 About the Project

MzansiMarkets is a comprehensive financial market intelligence platform focused specifically on South African markets. The platform provides investors, analysts, and financial professionals with real-time data, custom analytics, and expert insights to make informed investment decisions.

![MzansiMarkets Screenshot](./public/images/mzansimarkets-dashboard.png)

### ✨ Features

- **Real-time Market Data**: Live tracking of JSE indexes, equities, bonds, and commodities
- **Interactive Charts**: Visualize market trends with customizable charts and technical indicators
- **Market Insights**: Expert analysis and reports on market movements and economic factors
- **Portfolio Tracking**: Monitor your investments and track performance against benchmarks
- **Watchlists**: Create personalized watchlists for your favorite securities
- **Economic Calendar**: Stay updated with important economic events and announcements
- **Mobile Responsive**: Access market data on any device, anywhere
- **Dark/Light Mode**: Toggle between viewing modes for comfortable usage

### 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) - JavaScript charting library
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [APIs]: 
  - JSE Market Data API
  - South African Reserve Bank API
  - Financial News API

## 💻 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn

```bash
# Check Node.js version
node -v

# Update npm to the latest version
npm install npm@latest -g
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/ThaboChambule/mzansimarkets.git
cd mzansimarkets
```

2. Install packages

```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. Create a `.env.local` file in the root and add your API keys:

```
NEXT_PUBLIC_MARKET_DATA_API_KEY=your_api_key_here
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
```

4. Start the development server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Usage

### Dashboard
The dashboard provides an overview of key market indicators, recent performance, and important news. Use the filters to customize the information displayed.

### Market Analysis
Access detailed market analysis by navigating to specific sectors or securities. Apply technical indicators and adjust time frames to gain deeper insights.

### Portfolio Management
Track your investments by adding securities to your portfolio. View performance metrics and generate reports for your investment strategy.

### API Integration
For developers, MzansiMarkets offers API endpoints for integrating market data into your own applications. See the API documentation for details.

## 🗺️ Roadmap

- [x] Real-time JSE data integration
- [x] Interactive chart components
- [x] Responsive design implementation
- [x] Market news aggregation
- [ ] User authentication and profiles
- [ ] Portfolio management tools
- [ ] Advanced technical analysis indicators
- [ ] Mobile app development
- [ ] AI-powered market predictions
- [ ] Community features and forums

See the [open issues](https://github.com/ThaboChambule/mzansimarkets/issues) for a list of proposed features and known issues.

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Thabo Chambule - [@thabochambule](https://twitter.com/thabochambule) - thabo@example.com

Project Link: [https://github.com/ThaboChambule/mzansimarkets](https://github.com/ThaboChambule/mzansimarkets)

## 🙏 Acknowledgements

- [JSE](https://www.jse.co.za/) - For market data resources
- [South African Reserve Bank](https://www.resbank.co.za/) - For economic indicators
- [Vercel](https://vercel.com/) - For hosting and deployment
- [Icons8](https://icons8.com/) - For additional icons and illustrations
- All contributors who have helped this project grow

---

⭐ If you found this project helpful, please give it a star on GitHub! ⭐
