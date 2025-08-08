import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword required' });

  try {
    const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://www.amazon.com/',
        }
    });
    
    console.log(response.data);

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const items = [];

    document.querySelectorAll('.s-result-item[data-asin]').forEach(item => {
      const title = item.querySelector('h2 span')?.textContent?.trim() || '';
      const rating = item.querySelector('.a-icon-alt')?.textContent?.trim() || '';
      const reviews = item.querySelector('.a-size-base.s-underline-text')?.textContent?.trim() || '';
      const img = item.querySelector('img.s-image')?.src || '';
      if (title) {
        items.push({ title, rating, reviews, img });
      }
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Scraper API running on port ${PORT}`));