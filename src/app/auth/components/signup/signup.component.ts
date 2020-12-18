import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Register } from '../../store/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(submittedForm) {
    console.log('submittedForm', submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    this.store.dispatch(new Register(submittedForm.value));
  }
}
