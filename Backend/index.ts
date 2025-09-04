import express from "express";
import cors from "cors";
import { connectRedis } from "./utils/redis";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  await connectRedis();
  res.json({ status: "OK", message: "Working Fine !" });
});
app.post('/api/shorty', async (req, res) => {
  const { longUrl } = req.body;

  // Validate input
  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required' });
  }

  try {
    const client = await connectRedis();
    const shortKey = uuidv4().substring(0, 8); // Use shorter key for URLs

    // Store the mapping in Redis with expiration (e.g., 30 days)
    await client.setEx(`shorturl:${shortKey}`, 60 * 60 * 24 * 30, longUrl);

    // Also store reverse mapping if you want to prevent duplicate long URLs
    await client.set(`longurl:${Buffer.from(longUrl).toString('base64')}`, shortKey);

    const shortUrl = `${req.protocol}://${req.get('host')}/${shortKey}`;

    res.status(201).json({
      shortKey,
      shortUrl,
      longUrl,
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a GET endpoint to redirect short URLs
app.get('/:shortKey', async (req, res) => {
  try {
    const client = await connectRedis();
    const longUrl = await client.get(`shorturl:${req.params.shortKey}`);

    if (!longUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(longUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = Bun.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server connected at PORT ${PORT}`);
});
