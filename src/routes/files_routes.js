import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import uploadExcel from "../controllers/excelfile_controllers.js";

const router = Router();

router.post(
  "/upload/excelFile",
  upload.single("usersExcelFile"),
  async (req, res) => {
    uploadExcel(req, res);
  }
);

export default router;
