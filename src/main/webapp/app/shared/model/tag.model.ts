import { IPost } from '@/shared/model/post.model';

export interface ITag {
  id?: string;
  name?: string;
  posts?: IPost[];
}

export class Tag implements ITag {
  constructor(public id?: string, public name?: string, public posts?: IPost[]) {}
}
