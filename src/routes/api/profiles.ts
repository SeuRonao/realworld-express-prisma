import { Router } from "express";
import * as profile from "../../controllers/profileController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/:username", auth.optionalAuthenticate, profile.getProfile);

router.post("/:username/follow", auth.authenticate, profile.followProfile);

router.delete("/:username/follow", auth.authenticate, profile.unFollowProfile);

export default router;
