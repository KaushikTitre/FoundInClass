import express from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { getData ,fetchAllData} from "../Controllers/getData.js";

const router = express.Router();
router.get("/data",verifyToken, getData);
router.get("/alldata",fetchAllData);
export default router;
