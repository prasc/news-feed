export type PostType = {
    _id: string; // Use Mongoose's default _id
    content: string;
    createdAt?: Date;
    authorId?: number;
    likes?: number;
  };