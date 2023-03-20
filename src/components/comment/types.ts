export interface Comment {
  id: number;
  postId: number;
  content: string;
  dateCreated: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
}