import express from "express";
import { LostIteam , FoundIteam} from "../Controllers/postController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/lost",verifyToken ,LostIteam);
router.post("/found",verifyToken, FoundIteam);
export default router;
