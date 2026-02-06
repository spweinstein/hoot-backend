import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import Hoot from "../models/hoots.js";
import * as controllers from "../controllers/hoots.js";

const router = Router();

router.post("/", verifyToken, controllers.createHoot);

router.delete("/:hootId", verifyToken, controllers.deleteHoot);
