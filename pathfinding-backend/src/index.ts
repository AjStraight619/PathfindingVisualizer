import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

// Enable CORS for all routes
app.use(cors());

// To serve static files like HTML, CSS
app.use(express.static("public"));

// For parsing application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize multer storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("myFile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file was uploaded");
  }

  const fileExtension = file.originalname.split(".").pop() || "";

  if (!["js", "ts"].includes(fileExtension)) {
    return res.status(400).send("Invalid file type");
  }

  if (file.size > 1 * 1024 * 1024) {
    return res.status(400).send("File size too large");
  }

  console.log("File uploaded:", file);
  res.send("File uploaded");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
