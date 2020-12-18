import { Blog } from './../model/blog.model';

export class CreateBlog {
  static readonly type = '[Blog ] Add';

  constructor(public payload: Blog) {}
}

export class GetBlogs {
  static readonly type = '[Blog] Get';
}

export class UpdateBlog {
  static readonly type = '[Blog] Update';

  constructor(public payload: Blog, public id: number) {}
}

export class DeleteBlog {
  static readonly type = '[Blog] Delete';

  constructor(public id: number) {}
}
