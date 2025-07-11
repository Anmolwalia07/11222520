import { createShortUrl, getOriginalUrl } from "../service/shortUrl.service.js";
import { Log } from "../middleware/log.js";

export const createShortUrlController = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== "string") {
      await Log("backend", "error", "handler", "Invalid or missing URL in request body");
      return res.status(400).json({ error: "Invalid or missing URL." });
    }

    await Log("backend", "info", "handler", `Request to create short URL: url=${url}, shortcode=${shortcode || "auto-generated"}, validity=${validity}m`);

    const result = await createShortUrl({ url, validity, shortcode });

    await Log("backend", "info", "handler", `Short URL created: ${result.shortLink} (expires: ${result.expiry})`);

    res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal server error.";

    await Log("backend", "error", "handler", `Failed to create short URL: ${message}`);

    res.status(status).json({ error: message });
  }
};

export const redirectShortcodeController = async (req, res) => {
  try {
    const { shortcode } = req.params;

    await Log("backend", "info", "handler", `Redirect request for shortcode: ${shortcode}`);

    const originalUrl = await getOriginalUrl(shortcode);

    await Log("backend", "info", "handler", `Redirecting to original URL: ${originalUrl} for shortcode: ${shortcode}`);

    res.redirect(originalUrl);
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal server error.";

    await Log("backend", "error", "handler", `Redirect failed for shortcode ${req.params.shortcode}: ${message}`);

    res.status(status).json({ error: message });
  }
};
