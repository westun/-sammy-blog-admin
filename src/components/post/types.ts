import {Author} from './../author/types';

export interface Post {
  id: number;
  authorId: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  dateCreated: string;
  author: Author | undefined | null;
}