import express from "express";
import {
  createShortUrlController,
  redirectShortcodeController
} from "../controller/shortUrlController.js";

const router = express.Router();



router.post("/shorturls", createShortUrlController);
router.get("/:shortcode", redirectShortcodeController);

export default router;
