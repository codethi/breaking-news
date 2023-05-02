import { PostInput } from "@/Types/PostInput";
import Post, { IPost } from "@/schemas/PostSchema/PostMongoSchema";

function createPost({ title, banner, text }: PostInput, userId: string) {
  return Post.create({ title, banner, text, user: userId });
}

function findAllPosts(offset: number, limit: number) {
  return Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user")
    .exec();
}

function topNews() {
  return Post.findOne().sort({ _id: -1 }).populate("user");
}

function findPostById(id: string) {
  return Post.findById(id).populate("user");
}

function countPosts() {
  return Post.countDocuments();
}

function searchPost(title: string) {
  return Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findPostsByUserId(id: string) {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updatePost({ title, banner, text }: PostInput, postId: string) {
  return Post.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    }
  );
}

function deletePost(id: string) {
  return Post.findOneAndDelete({ _id: id });
}

function likes(postId: string, userId: string) {
  return Post.findOneAndUpdate(
    {
      _id: postId,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDelete(postId: string, userId: string) {
  return Post.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );
}

function comments(postId: string, message: string, userId: string) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Post.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function deleteComments(postId: string, userId: string, idComment: string) {
  return Post.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createPost,
  findAllPosts,
  topNews,
  findPostById,
  searchPost,
  findPostsByUserId,
  updatePost,
  deletePost,
  likes,
  likesDelete,
  comments,
  deleteComments,
  countPosts,
};
