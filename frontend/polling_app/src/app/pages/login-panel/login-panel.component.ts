import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  loginForm : FormGroup = this.formBuilder.group(
    {
      email: [''],
      password: ['']
    }
  );

  ngOnInit(): void {
    this.loginForm.controls['email'].addValidators([Validators.email]);
  }

  onLoginButtonClick(){
    console.log("elo");
    
  }

}
