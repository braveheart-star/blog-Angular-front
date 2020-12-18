import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Blog } from '../../model/blog.model';
import * as uuid from 'uuid';
import { CreateBlog } from '../../store/blog.action';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(submittedForm) {
    console.log('submittedForm', submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const blog: Blog = {
      title: submittedForm.value.title,
      description: submittedForm.value.description,
    };
    this.store.dispatch(new CreateBlog(blog));
  }
}
