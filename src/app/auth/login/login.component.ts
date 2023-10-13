import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBulider : FormBuilder) { }

  ngOnInit(): void {
  }

  initializeForm() {
    this.loginForm = this.formBulider.group({
        email: ['', Validators.compose([Validators.required])],
        password:  ['', Validators.compose([Validators.required])],
    })
  }

  onSubmit() {}
}
