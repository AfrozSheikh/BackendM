import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

// basic file filter (optional)
function fileFilter(req, file, cb) {
  // e.g. sirf images allow:
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter });

router.post("/single", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No file uploaded");
      err.statusCode = 400;
      throw err;
    }

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
