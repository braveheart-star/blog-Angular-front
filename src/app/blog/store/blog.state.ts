import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Blog } from './../model/blog.model';
import {
  AddBlog,
  DeleteBlog,
  GetBloges,
  UpdateBlog,
} from './../store/blog.action';
import { BlogService } from './../services/blog.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class BlogStateModel {
  bloges: Blog[];
  loaded: boolean;
}

@State<BlogStateModel>({
  name: 'bloges',
  defaults: {
    bloges: [],
    loaded: false,
  },
})
export class BlogState {
  constructor(private blogService: BlogService, private router: Router) {}

  @Selector()
  static getBlogList(state: BlogStateModel) {
    return state.bloges;
  }

  @Selector()
  static areBlogesLoaded(state: BlogStateModel) {
    return state.loaded;
  }

  @Action(GetBloges)
  getCourses({ getState, setState }: StateContext<BlogStateModel>) {
    return this.blogService.getAllBloges().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          bloges: result,
          loaded: true,
        });
      })
    );
  }

  @Action(DeleteBlog)
  deleteCourse(
    { getState, setState }: StateContext<BlogStateModel>,
    { id }: DeleteBlog
  ) {
    return this.blogService.deleteBlog(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.bloges.filter((item) => item.id !== id);
        setState({
          ...state,
          bloges: filteredArray,
        });
      })
    );
  }

  @Action(UpdateBlog)
  updateCourse(
    { getState, setState }: StateContext<BlogStateModel>,
    { payload, id }: UpdateBlog
  ) {
    return this.blogService.updateBlog(id, payload).pipe(
      tap((result) => {
        const state = getState();
        const blogList = [...state.bloges];
        const blogIndex = blogList.findIndex((item) => item.id === id);
        blogList[blogIndex] = result;

        setState({
          ...state,
          bloges: blogList,
        });
      })
    );
  }

  @Action(AddBlog)
  addTodo(
    { getState, patchState }: StateContext<BlogStateModel>,
    { payload }: AddBlog
  ) {
    return this.blogService.createBlog(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          bloges: [...state.bloges, result],
        });
        this.router.navigateByUrl('/bloges');
      })
    );
  }
}
