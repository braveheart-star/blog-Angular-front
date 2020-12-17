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

  getAllBloges(): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blog');
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('api/blog', blog);
  }

  deleteBlog(blogId: number): Observable<any> {
    return this.http.delete('api/blog/' + blogId);
  }

  updateBlog(blogId: number, blog: Blog): Observable<any> {
    return this.http.put('/api/blog/' + blogId, blog);
  }
}
