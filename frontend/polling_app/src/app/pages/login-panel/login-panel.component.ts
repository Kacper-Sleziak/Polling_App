import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/shared-services/account.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
              private accountService: AccountService,
              private router: Router) {
    
    // E.g. when use backword in dashboard and redirect to login panel - we want logout account
    this.accountService.logoutAccount();
  }

  showPassword: boolean = false;

  loginForm : FormGroup = this.formBuilder.group(
    {
      email: [''],
      password: ['']
    }
  );

  ngOnInit(): void {
    // Set input validators
    this.loginForm.controls['email'].addValidators([Validators.email, Validators.required]);
    this.loginForm.controls['password'].addValidators([Validators.required]);
  }

  onLoginButtonClick(){
    // If form is valid
    if(this.loginForm.valid){
      // Send request
      this.accountService.postLogin(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .subscribe({
          // If success
          next: (account) => {
            this.accountService.setAuthorId(account.id);
            // Navigate to dashboard
            this.router.navigate(['dashboard']);
          },
          // If error
          error: () =>{
            if(document.getElementById('error-message') !== null){
              document.getElementById('error-message')!.innerHTML = "Hasło lub email jest niepoprawne!";
            }
          }

        }
      )
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
