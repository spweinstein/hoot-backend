import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import * as controllers from "../controllers/hoots.js";

const router = Router();

router.post("/", verifyToken, controllers.createHoot);
router.get("/", verifyToken, controllers.getHoots);
router.get("/:hootId", verifyToken, controllers.getHoot);
router.put("/:hootId", verifyToken, controllers.updateHoot);
router.delete("/:hootId", verifyToken, controllers.deleteHoot);
router.post("/:hootId/comments", verifyToken, controllers.createComment);

export default router;
