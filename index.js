import { createServer } from "http";
import url from "url";
import path from "path";
import fs from "fs/promises";

const PORT = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    let filePath;
    if (req.method !== "GET") {
      throw new Error("Only get method are allowed");
    }
    if (req.url === "/") {
      filePath = path.join(__dirname, "public", "home.html");
    } else if (req.url === "/about") {
      filePath = path.join(__dirname, "public", "about.html");
    } else if (req.url === "/contact-me") {
      filePath = path.join(__dirname, "public", "contact-me.html");
    } else {
      filePath = path.join(__dirname, "public", "/404.html");
    }
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "content-type": "text/html" });
    res.write(data);
    res.end();
  } catch (e) {
    if (e.message === "Only get method are allowed") {
      res.writeHead(500, { "content-type": "text/plain" });
      res.write("Only Get methods are allowed");
      res.end();
    } else {
      res.write(console.log(e.message));
      res.end();
    }
  }
});

server.listen(5000, () => {
  console.log(`Server running on port ${PORT}`);
});
