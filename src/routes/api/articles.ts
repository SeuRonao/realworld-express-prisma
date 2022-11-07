import { Router } from "express";
import {
  articlesCreate,
  articlesDelete,
  articlesGet,
  articlesUpdate,
} from "../../controllers/articlesController";
import {
  articlesCreateValidator,
  articlesUpdateValidator,
} from "../../middleware/articlesValidator";
import {
  authenticate,
  optionalAuthenticate,
} from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", function (_req, res) {
  res.sendStatus(501);
});

router.get("/feed", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug", optionalAuthenticate, articlesGet);

router.post("/", authenticate, articlesCreateValidator, articlesCreate);

router.put("/:slug", authenticate, articlesUpdateValidator, articlesUpdate);

router.delete("/:slug", authenticate, articlesDelete);

router.post("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug/comments", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug/comments/:id", function (_req, res) {
  res.sendStatus(501);
});

router.post("/:slug/favorite", function (_req, res) {
  res.sendStatus(501);
});

router.delete("/:slug/favorite", function (_req, res) {
  res.sendStatus(501);
});

export default router;
