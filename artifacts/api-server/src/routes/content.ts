import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";

const router: IRouter = Router();

const DATA_DIR = path.resolve(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// GET /api/content
router.get("/content", (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, "utf-8");
      return res.json(JSON.parse(data));
    }
    return res.status(404).json({ message: "No custom content saved yet" });
  } catch (error) {
    console.error("Failed to read site content:", error);
    return res.status(500).json({ error: "Failed to read content" });
  }
});

// POST /api/content
router.post("/content", (req, res) => {
  try {
    ensureDataDir();
    const content = req.body;
    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content payload" });
    }
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
    return res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Failed to save site content:", error);
    return res.status(500).json({ error: "Failed to save content" });
  }
});

// POST /api/content/reset
router.post("/content/reset", (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      fs.unlinkSync(CONTENT_FILE);
    }
    return res.json({ success: true, message: "Reset to default content" });
  } catch (error) {
    console.error("Failed to reset site content:", error);
    return res.status(500).json({ error: "Failed to reset content" });
  }
});

export default router;

