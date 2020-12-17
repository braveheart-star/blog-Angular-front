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

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blogs');
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('api/blogs', blog);
  }

  deleteBlog(blogId: number): Observable<any> {
    return this.http.delete('api/blogs/' + blogId);
  }

  updateBlog(blogId: number, blog: Blog): Observable<any> {
    return this.http.put('/api/blogs/' + blogId, blog);
  }
}
