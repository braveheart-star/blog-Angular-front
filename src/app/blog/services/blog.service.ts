import { Blog } from '../model/blog.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private blogsUrl = 'http://localhost:4000/api/blog';

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, blog);
  }

  deleteBlog(blogId: number): Observable<any> {
    return this.http.delete(this.blogsUrl + blogId);
  }

  updateBlog(blogId: number, blog: Blog): Observable<any> {
    console.log('update blog', blogId, blog);
    return this.http.put(this.blogsUrl + blogId, blog);
  }
}
