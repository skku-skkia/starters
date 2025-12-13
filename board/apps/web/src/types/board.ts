export interface Board {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: {
    id: string;
    email: string;
    username: string;
  };
  boardId: number;
  likes: number;
  isPublic: boolean;
  isCommentingAllowed: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  author: {
    id: string;
    email: string;
    username: string;
  };
  content: string;
  createdAt: string;
}
