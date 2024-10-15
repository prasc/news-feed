export type PostType = {
    id: number;
    content: string;
    createdAt?: Date;
    authorId?: number;
    likes?: number;
  };