import { ITag } from '@/shared/model/tag.model';

export interface IPost {
  id?: string;
  name?: string;
  tags?: ITag[];
}

export class Post implements IPost {
  constructor(public id?: string, public name?: string, public tags?: ITag[]) {}
}
