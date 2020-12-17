import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Blog } from '../../model/blog.model';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetBlogs, DeleteBlog, UpdateBlog } from '../../store/blog.action';
import { BlogState } from '../../store/blog.state';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
})
export class BlogsListComponent implements OnInit {
  @Select(BlogState.getBlogList) blogs$: Observable<Blog[]>;

  @Select(BlogState.areBlogsLoaded) blogsLoaded$;

  blogToBeUpdated: Blog;
  isUpdateActivated = false;
  blogsLoadedSub: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.blogsLoadedSub = this.blogsLoaded$
      .pipe(
        tap((loaded) => {
          if (!loaded) {
            this.store.dispatch(new GetBlogs());
          }
        })
      )
      .subscribe((value) => {
        console.log('blog loaded', value);
      });
  }

  ngOnDestroy() {
    this.blogsLoadedSub.unsubscribe();
  }

  deleteBlog(blodId: number) {
    this.store.dispatch(new DeleteBlog(blodId));
  }

  showUpdateForm(blog: Blog) {
    this.blogToBeUpdated = { ...blog };
    this.isUpdateActivated = true;
  }

  updateBlog(updateForm) {
    this.store.dispatch(
      new UpdateBlog(updateForm.value, this.blogToBeUpdated.id)
    );

    this.isUpdateActivated = false;
    this.blogToBeUpdated = null;
  }
}
