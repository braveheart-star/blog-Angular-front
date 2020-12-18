import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Blog } from './../model/blog.model';
import {
  CreateBlog,
  DeleteBlog,
  GetBlogs,
  UpdateBlog,
} from './../store/blog.action';
import { BlogService } from './../services/blog.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export class BlogStateModel {
  blogs: Blog[];
  loaded: boolean;
}

@State<BlogStateModel>({
  name: 'blogs',
  defaults: {
    blogs: [],
    loaded: false,
  },
})
@Injectable()
export class BlogState {
  constructor(private blogService: BlogService, private router: Router) {}

  @Selector()
  static getBlogList(state: BlogStateModel) {
    return state.blogs;
  }

  @Selector()
  static areBlogsLoaded(state: BlogStateModel) {
    return state.loaded;
  }

  @Action(GetBlogs)
  getBlogs({ getState, setState }: StateContext<BlogStateModel>) {
    return this.blogService.getAllBlogs().pipe(
      tap((result) => {
        console.log('result from getblog', result);
        const state = getState();
        setState({
          ...state,
          blogs: result,
          loaded: true,
        });
      })
    );
  }

  @Action(CreateBlog)
  createBlog(
    { getState, patchState }: StateContext<BlogStateModel>,
    { payload }: CreateBlog
  ) {
    return this.blogService.createBlog(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          blogs: [...state.blogs, result],
        });
        this.router.navigateByUrl('/blogs');
      })
    );
  }

  @Action(DeleteBlog)
  deleteBlog(
    { getState, setState }: StateContext<BlogStateModel>,
    { id }: DeleteBlog
  ) {
    return this.blogService.deleteBlog(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.blogs.filter((item) => item.id !== id);
        setState({
          ...state,
          blogs: filteredArray,
        });
      })
    );
  }

  @Action(UpdateBlog)
  updateBlog(
    { getState, setState }: StateContext<BlogStateModel>,
    { payload, id }: UpdateBlog
  ) {
    return this.blogService.updateBlog(id, payload).pipe(
      tap((result) => {
        console.log('result from service, store', result);

        const state = getState();
        const blogList = [...state.blogs];
        const blogIndex = blogList.findIndex((item) => item.id === id);
        blogList[blogIndex] = result;

        setState({
          ...state,
          blogs: blogList,
        });
      })
    );
  }
}
