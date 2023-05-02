import { PostInput } from "@/Types/PostInput";
import PostService from "@/services/PostService";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, banner, text } = req.body as PostInput;
    const { _id: userId } = res.locals.user;

    const post = await PostService.createPost(
      {
        title,
        banner,
        text,
      },
      userId
    );

    return res.status(httpStatus.CREATED).send({ post });
  } catch (e) {
    next(e);
  }
}

async function findAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, offset } = req.query;
    const currentUrl = req.baseUrl;

    const posts = await PostService.findAllPosts(
      Number(limit),
      Number(offset),
      currentUrl
    );

    return res.send(posts);
  } catch (e) {
    next(e);
  }
}

async function topNews(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await PostService.topNews();
    return res.send(post);
  } catch (e) {
    next(e);
  }
}

async function searchPost(req: Request, res: Response, next: NextFunction) {
  const { title } = req.query as Record<string, string>;

  try {
    const posts = await PostService.searchPost(title);
    return res.send(posts);
  } catch (e) {
    next(e);
  }
}

async function findPostById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const post = await PostService.findPostById(id);
    return res.send(post);
  } catch (e) {
    next(e);
  }
}

async function findPostsByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { _id } = res.locals.user;
  try {
    const posts = await PostService.findPostsByUserId(_id);
    return res.send(posts);
  } catch (e) {
    next(e);
  }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
  const { title, banner, text } = req.body as PostInput;
  const { id: postId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const postUpdated = await PostService.updatePost(
      { title, banner, text },
      postId,
      userId
    );

    return res.send(postUpdated);
  } catch (e) {
    next(e);
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id: postId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    await PostService.deletePost(postId, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (e) {
    next(e);
  }
}

async function likePost(req: Request, res: Response, next: NextFunction) {
  const { id: postId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const message = await PostService.likePost(postId, userId);
    return res.send(message);
  } catch (e) {
    next(e);
  }
}

async function commentPost(req: Request, res: Response, next: NextFunction) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const { _id: userId } = res.locals.user;

  try {
    const messageReturn = await PostService.commentPost(
      postId,
      message,
      userId
    );

    return res.send(messageReturn);
  } catch (e) {
    next(e);
  }
}

async function deleteCommentPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId, idComment } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const message = await PostService.deleteCommentPost(
      postId,
      userId,
      idComment
    );

    return res.send(message);
  } catch (e) {
    next(e);
  }
}

export default {
  createPost,
  findAllPosts,
  topNews,
  searchPost,
  findPostById,
  findPostsByUserId,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  deleteCommentPost,
};
