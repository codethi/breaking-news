import postController from "@/controllers/PostController";
import authMiddleware from "@/middlewares/AuthMiddleware";
import { Router } from "express";

const postRouter = Router();

postRouter.get("/", postController.findAllPosts);
postRouter.get("/top", postController.topNews);
postRouter.get("/search", postController.searchPost);

postRouter.use(authMiddleware);
postRouter.post("/", postController.createPost);
postRouter.get("/:id", postController.findPostById);
postRouter.get("/byUserId", postController.findPostsByUserId);
postRouter.patch("/update/:id", postController.updatePost);
postRouter.delete("/delete/:id", postController.deletePost);
postRouter.patch("/:id/like", postController.likePost);
postRouter.patch("/:id/comment", postController.commentPost);
postRouter.patch("/:id/:idComment/comment", postController.deleteCommentPost);

export default postRouter;
