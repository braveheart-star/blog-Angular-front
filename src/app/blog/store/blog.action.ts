import { Blog } from './../model/blog.model';

export class BlogDto {
  title: string;
  description: string;
}

export class CreateBlog {
  static readonly type = '[Blog ] Add';

  constructor(public payload: BlogDto) {}
}

export class GetBlogs {
  static readonly type = '[Blog] Get';
}

export class UpdateBlog {
  static readonly type = '[Blog] Update';

  constructor(public payload: BlogDto, public id: number) {}
}

export class DeleteBlog {
  static readonly type = '[Blog] Delete';

  constructor(public id: number) {}
}
