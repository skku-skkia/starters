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
  authorId: string;
  boardId: number;
  likes: number;
  isPublic: boolean;
  isCommentingAllowed: boolean;
}
