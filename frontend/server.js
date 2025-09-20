import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4200;

// Serve Angular static files
app.use(express.static(path.join(__dirname, "dist/frontend/browser"))); 

// SPA fallback for Angular routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/frontend/browser/index.html"));
});

app.listen(PORT, () => {
  console.log(`Angular app is running on port ${PORT}`);
});
