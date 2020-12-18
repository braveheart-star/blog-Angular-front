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

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthState } from './auth/store/auth.state';
import { AuthGuard } from './guards/auth.guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
const routes = [
  {
    path: 'blogs',
    component: BlogsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BlogModule,
    AuthModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([BlogState, AuthState]),
    // NgxsModule.forRoot([AuthState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
