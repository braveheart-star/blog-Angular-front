import { Blog } from '../model/blog.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../auth/store/auth.state';

@Injectable()
export class BlogService {
  http: HttpClient;
  headers: Object;

  constructor(http: HttpClient, store: Store) {
    this.http = http;
    store.select(AuthState.getAccessToken).subscribe((value) => {
      this.headers = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${value}`),
      };
    });
  }

  private blogsUrl = 'http://localhost:4000/api/blog';

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl, this.headers);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, blog, this.headers);
  }

  deleteBlog(blogId: number): Observable<any> {
    console.log('blog id here', blogId);
    return this.http.delete(this.blogsUrl + '/' + blogId, this.headers);
  }

  updateBlog(payload: any): Observable<any> {
    console.log('updateBlog id here', payload);

    return this.http.put(this.blogsUrl, payload, this.headers);
  }
}
