import { Router } from "express";
import { getTags } from "../../controllers/tagsController";

const router = Router();

router.get("/", getTags);

export default router;
