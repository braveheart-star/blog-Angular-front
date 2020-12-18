import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// http client
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// service
import { BlogService } from './services/blog.service';

// components
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';

@NgModule({
  declarations: [CreateBlogComponent, BlogsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    // in memory web api
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],

  providers: [BlogService],
  exports: [CreateBlogComponent, BlogsListComponent],
})
export class BlogModule {}
