import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// ngxs store
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { BlogModule } from './blog/blog.module';
import { CreateBlogComponent } from './blog/components/create-blog/create-blog.component';
import { BlogsListComponent } from './blog/components/blogs-list/blogs-list.component';
import { BlogState } from './blog/store/blog.state';

import { AppComponent } from './app.component';

const routes = [
  {
    path: 'blogs',
    component: BlogsListComponent,
  },
  { path: 'create-blog', component: CreateBlogComponent },
  { path: '**', redirectTo: 'blogs' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([BlogState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BlogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
