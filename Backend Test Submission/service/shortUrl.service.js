import { ShortURL } from "../model/shortUrlModel.js";

export const generateShortcode = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz12345678";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createShortUrl = async ({ url, validity, shortcode }) => {
  let code = shortcode || generateShortcode();
  const expiryDate = new Date(Date.now() + validity * 60000);

  let existing = await ShortURL.findOne({ shortcode: code });
  if (existing) {
    if (shortcode) {
      throw { status: 409, message: "Shortcode already exists." };
    } else {
      do {
        code = generateShortcode();
        existing = await ShortURL.findOne({ shortcode: code });
      } while (existing);
    }
  }

  const short = new ShortURL({ url, shortcode: code, expiry: expiryDate });
  await short.save();

  return {
    shortLink: `http://localhost:3001/${code}`,
    expiry: expiryDate.toISOString()
  };
};



export const getOriginalUrl = async (code) => {
  const record = await ShortURL.findOne({ shortcode: code });
  if (!record) {
    throw { status: 404, message: "Shortcode not found." };
  }

  if (new Date() > record.expiry) {
    throw { status: 410, message: "Shortcode has expired." };
  }

  return record.url;
};
