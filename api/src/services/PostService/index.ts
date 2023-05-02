import { PostInput } from "@/Types/PostInput";
import { notFoundError, unauthorizedError } from "@/errors";
import PostRepository from "@/repositories/PostRepository";
import { IPost } from "@/schemas/PostSchema/PostMongoSchema";
import { ObjectId } from "mongodb";

async function createPost({ title, banner, text }: PostInput, userId: string) {
  const post = await PostRepository.createPost({ title, banner, text }, userId);

  return post;
}

async function findAllPosts(limit: number, offset: number, currentUrl: string) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const posts = await PostRepository.findAllPosts(offset, limit);
  const total = await PostRepository.countPosts();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  posts.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: posts.map((post: IPost) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function topNews() {
  const post = await PostRepository.topNews();

  if (!post) throw notFoundError();

  return {
    post: {
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    },
  };
}

async function searchPost(title: string) {
  const foundPosts = await PostRepository.searchPost(title);

  return {
    foundPosts: foundPosts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findPostById(id: string) {
  const post = await PostRepository.findPostById(id);

  if (!post) throw notFoundError();

  return {
    id: post._id,
    title: post.title,
    banner: post.banner,
    text: post.text,
    likes: post.likes,
    comments: post.comments,
    name: post.user.name,
    username: post.user.username,
    avatar: post.user.avatar,
  };
}

async function findPostsByUserId(userId: string) {
  const posts = await PostRepository.findPostsByUserId(userId);

  return {
    postsByUser: posts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function updatePost(
  { title, banner, text }: PostInput,
  postId: string,
  userId: string
) {
  const post = await PostRepository.findPostById(postId);

  if (post.user._id != new ObjectId(userId)) throw unauthorizedError();

  const postUpdated = await PostRepository.updatePost(
    { title, banner, text },
    postId
  );

  return postUpdated;
}

async function deletePost(postId: string, userId: string) {
  const post = await PostRepository.findPostById(postId);

  if (!post) throw notFoundError();

  if (post.user._id != new ObjectId(userId)) throw unauthorizedError();

  await PostRepository.deletePost(postId);
}

async function likePost(postId: string, userId: string) {
  const post = await PostRepository.findPostById(postId);
  if (!post) throw notFoundError();

  const postLiked = await PostRepository.likes(postId, userId);

  if (postLiked.ok) {
    await PostRepository.likesDelete(postId, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentPost(postId: string, message: string, userId: string) {
  await PostRepository.comments(postId, message, userId);
  return { message: "Comment successfully completed!" };
}

const deleteCommentPost = async (
  postId: string,
  userId: string,
  idComment: string
) => {
  await PostRepository.deleteComments(postId, userId, idComment);

  return { message: "Comment successfully removed" };
};

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
