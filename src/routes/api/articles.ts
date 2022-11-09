import { Router } from "express";
import * as articles from "../../controllers/articlesController";
import * as validator from "../../middleware/articlesValidator";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", function (_req, res) {
  res.sendStatus(501);
});

router.get("/feed", function (_req, res) {
  res.sendStatus(501);
});

router.get("/:slug", auth.optionalAuthenticate, articles.articlesGet);

router.post(
  "/",
  auth.authenticate,
  validator.articlesCreateValidator,
  articles.articlesCreate
);

router.put(
  "/:slug",
  auth.authenticate,
  validator.articlesUpdateValidator,
  articles.articlesUpdate
);

router.delete("/:slug", auth.authenticate, articles.articlesDelete);

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
