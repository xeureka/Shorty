const mongoose = require("mongoose");
const Urls = require("../models/url.model");

const expiredOldLinks = async () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - 7);

  try {
    const result = await Urls.deleteMany({
      createdAt: { $lt: expiratioinDate },
    });
    console.log(`${result.deletedCount} link deleted`);
  } catch (error) {
    console.error("Error deleting old links: ", error);
  }
};

module.exports = expiredOldLinks;
