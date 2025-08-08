const Urls = require("../models/url.model");
const generateRandomUrl = require("../utils/genrateUrl");

exports.createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    let shortCode = generateRandomUrl();

    while (true) {
      shortCode = generateRandomUrl();
      let collison = await Urls.findOne({ shortUrl: shortCode });

      if (!collison) {
        break;
      }
    }

    let url = new Urls({
      longUrl,
      shortUrl: shortCode,
    });

    await url.save();
    res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
  } catch (error) {
    res.status(500).json("server error");
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Urls.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.json("no url foudn").status(403);
    }

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json("server error");
  }
};
