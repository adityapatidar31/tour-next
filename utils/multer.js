const multer = require("multer");
const path = require("path");

// 1. Storage in memory (so multer does not save to disk)
const storage = multer.memoryStorage();

// 2. Filter only jpeg images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg or .jpeg files are allowed"), false);
  }
};

// 3. Final multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
});

module.exports = upload;
