import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "..", 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
});

// Route to fetch news from the API
app.get('/api/news', async (req, res) => {
  const { query, pageNo } = req.query;

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&page=${pageNo}&apiKey=${apiKey}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});