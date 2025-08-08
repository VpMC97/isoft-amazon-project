import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

// Configuración del servidor Express
const app = express();
app.use(cors());

// Endpoint principal para scraping de Amazon
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword required' });

  try {
    console.log(`Scraping for keyword: ${keyword}`);
    
    // Realizar petición HTTP a Amazon con headers que simulan un navegador real
    const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://www.amazon.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 10000 // Timeout para evitar bloqueos
    });
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response length: ${response.data.length}`);

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const items = [];

    // Intentar diferentes selectores para productos
    const productSelectors = [
      '.s-result-item[data-asin]',
      '[data-component-type="s-search-result"]',
      '.sg-col-inner .s-result-item'
    ];

    let products = [];
    for (const selector of productSelectors) {
      products = document.querySelectorAll(selector);
      if (products.length > 0) {
        break; // Usar el primer selector que encuentre productos
      }
    }

    products.forEach((item, index) => {
      try {
        const title = item.querySelector('h2 span')?.textContent?.trim() || '';
        const rating = item.querySelector('.a-icon-alt, .a-icon-star-small')?.textContent?.trim() || null;
        const reviews = item.querySelector('.a-size-base.s-underline-text, .a-size-base')?.textContent?.trim() || '';
        const img = item.querySelector('img')?.src || null;
        const priceElement = item.querySelector('.a-price-whole, .a-price .a-offscreen, .a-price-range');
        const price = priceElement?.textContent?.trim() || '';

        // Filtrar elementos que no son productos reales
        const isValidProduct = 
          title && title.length > 10 &&
          img &&
          img !== null &&
          !img.includes('data:image/svg+xml') && // Excluir cualquier SVG
          price && price.length > 0 && 
          !title.toLowerCase().includes('sponsored') && 
          !title.toLowerCase().includes('advertisement') &&
          !title.toLowerCase().includes('check each product page') &&
          !title.toLowerCase().includes('price and other details');

        // Agregar producto al array si pasa todas las validaciones
        if (isValidProduct) {
          items.push({ title, rating, reviews, img, price });
        }
      } catch (err) {
        console.error(`Error parsing product ${index}:`, err.message);
      }
    });
    
    res.json(items);
  } catch (err) {
    console.error('Scraping error:', err.message);
    res.status(500).json({ 
      error: 'Scraping failed', 
      details: err.message,
      suggestion: 'Amazon may have blocked the request. Try again later.'
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Scraper API running on port ${PORT}`));