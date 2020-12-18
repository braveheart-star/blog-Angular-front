import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login } from '../../store/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    this.store.dispatch(new Login(submittedForm.value));
  }
}
