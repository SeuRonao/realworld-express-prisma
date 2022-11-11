import { Router } from "express";
import * as articles from "../../controllers/articlesController";
import * as comments from "../../controllers/commentsController";
import * as validator from "../../middleware/articlesValidator";
import commentCreateValidator from "../../middleware/commentsValidator/commentCreateValidator";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get(
  "/",
  auth.optionalAuthenticate,
  validator.articlesListValidator,
  articles.articlesList
);

router.get(
  "/feed",
  auth.authenticate,
  validator.articlesFeedValidator,
  articles.articlesFeed
);

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

router.post(
  "/:slug/comments",
  auth.authenticate,
  commentCreateValidator,
  comments.createComment
);

router.get("/:slug/comments", auth.optionalAuthenticate, comments.getComments);

router.delete(
  "/:slug/comments/:id([0-9]+)",
  auth.authenticate,
  comments.deleteComment
);

router.post("/:slug/favorite", auth.authenticate, articles.articlesFavorite);

router.delete(
  "/:slug/favorite",
  auth.authenticate,
  articles.articlesUnFavorite
);

export default router;
