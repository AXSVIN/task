const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const cors = require('cors');

const app = express();
<<<<<<< HEAD
app.use(cors());
=======


app.use(cors());

>>>>>>> 45c835d (Initial commit or backend update)
let latestResults = [];

async function fetchStockData(symbol, qty, purchase_price) {
  try {
    const quote = await yahooFinance.quoteSummary(symbol, {
      modules: ['price', 'summaryDetail'],
    });

    const cmp = quote.price?.regularMarketPrice || 0;
    const peRatio = quote.summaryDetail?.trailingPE || 'N/A';
    const exchange = quote.price?.exchange || 'N/A';

    const total_value = parseFloat((qty * cmp).toFixed(2));
    const total_invested = parseFloat((qty * purchase_price).toFixed(2));
    const profit_or_loss = parseFloat((total_value - total_invested).toFixed(2));

    return {
      symbol,
      exchange,
      cmp,
      pe_ratio: peRatio,
      qty,
      purchase_price,
      total_invested,
      total_value,
      profit_or_loss,
<<<<<<< HEAD
      portfolio_percent: 0
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
=======
      portfolio_percent: 0,
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
>>>>>>> 45c835d (Initial commit or backend update)
    return null;
  }
}

const stockInputs = [
<<<<<<< HEAD
  { symbol: 'AAPL', qty: 3, purchase_price: 180 },         
  { symbol: 'TCS.NS', qty: 2, purchase_price: 3700 },      
  { symbol: 'RELIANCE.NS', qty: 5, purchase_price: 2500 }, 
  { symbol: 'HDFCBANK.NS', qty: 8, purchase_price: 1600 },
  { symbol: 'LT.NS', qty: 4, purchase_price: 3000 },      
  { symbol: 'INFY.NS', qty: 6, purchase_price: 1500 },     
  { symbol: 'ICICIBANK.NS', qty: 10, purchase_price: 950 },
  { symbol: 'SBIN.NS', qty: 12, purchase_price: 600 },     
  { symbol: 'BAJFINANCE.NS', qty: 3, purchase_price: 7000 },
  { symbol: 'HINDUNILVR.NS', qty: 7, purchase_price: 2400 },
  { symbol: 'ITC.NS', qty: 88, purchase_price: 450 },      
  { symbol: 'WIPRO.NS', qty: 9, purchase_price: 400 },     
  { symbol: 'AXISBANK.NS', qty: 5, purchase_price: 950 },  
  { symbol: 'MARUTI.NS', qty: 2, purchase_price: 9200 },  
  { symbol: 'HCLTECH.NS', qty: 6, purchase_price: 1100 },  
  { symbol: 'NTPC.NS', qty: 20, purchase_price: 280 },     
  { symbol: 'JSWSTEEL.NS', qty: 96, purchase_price: 800 },  
  { symbol: 'TATASTEEL.NS', qty: 10, purchase_price: 120 },
  { symbol: 'GOOGL', qty: 1, purchase_price: 2800 }
];

async function updatePortfolio() {
=======
  { symbol: 'AAPL', qty: 3, purchase_price: 180 },
  { symbol: 'TCS.NS', qty: 2, purchase_price: 3700 },
  { symbol: 'RELIANCE.NS', qty: 5, purchase_price: 2500 },
  { symbol: 'HDFCBANK.NS', qty: 8, purchase_price: 1600 },
  { symbol: 'LT.NS', qty: 4, purchase_price: 3000 },
  { symbol: 'INFY.NS', qty: 6, purchase_price: 1500 },
  { symbol: 'ICICIBANK.NS', qty: 10, purchase_price: 950 },
  { symbol: 'SBIN.NS', qty: 12, purchase_price: 600 },
  { symbol: 'BAJFINANCE.NS', qty: 3, purchase_price: 7000 },
  { symbol: 'HINDUNILVR.NS', qty: 7, purchase_price: 2400 },
  { symbol: 'ITC.NS', qty: 88, purchase_price: 450 },
  { symbol: 'WIPRO.NS', qty: 9, purchase_price: 400 },
  { symbol: 'AXISBANK.NS', qty: 5, purchase_price: 950 },
  { symbol: 'MARUTI.NS', qty: 2, purchase_price: 9200 },
  { symbol: 'HCLTECH.NS', qty: 6, purchase_price: 1100 },
  { symbol: 'NTPC.NS', qty: 20, purchase_price: 280 },
  { symbol: 'JSWSTEEL.NS', qty: 96, purchase_price: 800 },
  { symbol: 'TATASTEEL.NS', qty: 10, purchase_price: 120 },
  { symbol: 'GOOGL', qty: 1, purchase_price: 2800 },
];

async function updatePortfolio() {
  // Increment quantity slightly every cycle (for demo effect)
>>>>>>> 45c835d (Initial commit or backend update)
  stockInputs.forEach(stock => {
    stock.qty = stock.qty >= 100 ? 1 : stock.qty + 1;
  });

  const results = await Promise.all(
<<<<<<< HEAD
    stockInputs.map(stock => fetchStockData(stock.symbol, stock.qty, stock.purchase_price))
=======
    stockInputs.map(stock =>
      fetchStockData(stock.symbol, stock.qty, stock.purchase_price)
    )
>>>>>>> 45c835d (Initial commit or backend update)
  );

  const totalPortfolioValue = results.reduce(
    (acc, stock) => acc + (stock?.total_value || 0),
    0
  );

  results.forEach(stock => {
    if (stock && totalPortfolioValue > 0) {
      stock.portfolio_percent = parseFloat(
        ((stock.total_value / totalPortfolioValue) * 100).toFixed(2)
      );
    }
  });

<<<<<<< HEAD
  latestResults = results;
}

setInterval(updatePortfolio, 15000);

updatePortfolio();

app.get('/portfolio', (req, res) => {
  res.json(latestResults);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
=======
  latestResults = results.filter(Boolean);
}

// Update every 15 seconds
setInterval(updatePortfolio, 15000);
updatePortfolio();

// API routes
app.get('/', (req, res) => {
  res.send('📈 Live Stock Portfolio Tracker Backend is running.');
});

app.get('/portfolio', (req, res) => {
  if (!latestResults.length) {
    return res.status(503).json({ message: 'Data is loading. Please try again.' });
  }
  res.json(latestResults);
});

// Use dynamic port for Render or default to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is live on port ${PORT}`);
>>>>>>> 45c835d (Initial commit or backend update)
});
