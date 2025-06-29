import React, { useEffect, useState } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';

const PortfolioTable = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('http://localhost:3000/portfolio');
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredPortfolio = portfolio.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-black min-h-screen text-gray-300">
      
     
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        
        <h1 className="text-3xl font-bold text-light-400">
          📈 PORTFOLIO
        </h1>

       
        <div className="flex items-center gap-4">
  <a href="https://github.com/AXSVIN" target="_blank" rel="noopener noreferrer">
    <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
      <Github className="w-6 h-6 text-gray-300 hover:text-white" />
    </div>
  </a>
  <a href="https://www.instagram.com/axxsvin?utm_source=qr&igsh=aGQ3bG1oYXRrYzdq" target="_blank" rel="noopener noreferrer">
    <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
      <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500" />
    </div>
  </a>
  <a href="https://www.linkedin.com/in/ashwin-raja-m-6baa351a8/" target="_blank" rel="noopener noreferrer">
    <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
      <Linkedin className="w-6 h-6 text-gray-300 hover:text-blue-500" />
    </div>
  </a>
</div>


        
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-80 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse shadow-lg">
          <thead className="bg-black text-white sticky top-0 z-10">
            <tr>
              <th className="border border-gray-700 p-2">Particulars</th>
              <th className="border border-gray-700 p-2">Purchase Price</th>
              <th className="border border-gray-700 p-2">Quantity (Qty)</th>
              <th className="border border-gray-700 p-2">Investment</th>
              <th className="border border-gray-700 p-2">Portfolio %</th>
              <th className="border border-gray-700 p-2">NSE/BSE</th>
              <th className="border border-gray-700 p-2">CMP</th>
              <th className="border border-gray-700 p-2">Present Value</th>
              <th className="border border-gray-700 p-2">Gain/Loss</th>
              <th className="border border-gray-700 p-2">P/E Ratio</th>
            </tr>
          </thead>
          <tbody>
            {filteredPortfolio.length > 0 ? (
              filteredPortfolio.map((stock, index) => (
                <tr
                  key={index}
                  className="bg-black hover:bg-gray-700 transition"
                >
                  <td className="border border-gray-700 p-2">{stock.symbol}</td>
                  <td className="border border-gray-700 p-2">{stock.purchase_price.toFixed(2)}</td>
                  <td className="border border-gray-700 p-2">{stock.qty}</td>
                  <td className="border border-gray-700 p-2">{stock.total_invested.toFixed(2)}</td>
                  <td
                    className={`border border-gray-700 p-2 font-bold ${
                      stock.portfolio_percent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stock.portfolio_percent.toFixed(2)}%
                  </td>
                  <td className="border border-gray-700 p-2">{stock.exchange}</td>
                  <td className="border border-gray-700 p-2">{stock.cmp.toFixed(2)}</td>
                  <td className="border border-gray-700 p-2">{stock.total_value.toFixed(2)}</td>
                  <td
                    className={`border border-gray-700 p-2 font-bold ${
                      stock.profit_or_loss >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stock.profit_or_loss.toFixed(2)}
                  </td>
                  <td className="border border-gray-700 p-2">{stock.pe_ratio}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-gray-400 p-4">
                  No matching stocks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;
