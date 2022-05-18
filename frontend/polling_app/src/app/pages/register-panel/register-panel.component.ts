import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/shared-services/account.service';


@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, 
              private accountService: AccountService,
              private router: Router) {

    // E.g. when use backword in dashboard and redirect to register panel - we want logout account
    this.accountService.logoutAccount();
  }

  registerForm : FormGroup = this.formBuilder.group(
    {
      companyName: [''],
      email: [''],
      password: [''],
      password2: ['']
    }
  );

  errorMessage: string = '';
  
  ngOnInit(): void {
    // Set input validators
    this.registerForm.controls['companyName'].addValidators([Validators.required]);
    this.registerForm.controls['email'].addValidators([Validators.email, Validators.required]);
    this.registerForm.controls['password'].addValidators([Validators.required, Validators.minLength(9)]);
    this.registerForm.controls['password2'].addValidators([Validators.required, Validators.minLength(9)]);
  }

  onRegisterButtonClick(){

    // Check that passwords are same
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['password2'].value ){

      // Set errors
      // this.registerForm.controls['password'].setErrors({'notSame' : true});
      this.registerForm.controls['password2'].setErrors({'notSame' : true});
    }

    // If form is valid
    if(this.registerForm.valid){
    // Send request
    this.accountService.postRegister( this.registerForm.controls['companyName'].value, 
                                      this.registerForm.controls['email'].value, 
                                      this.registerForm.controls['password'].value, 
                                      this.registerForm.controls['password2'].value)
      .subscribe({

        // If success
        next: (account) => {
          // Set author id
          this.accountService.setAuthorId(account.id);
          // Navigate to dashboard
          this.router.navigate(['dashboard']);
        },
        // If error
        error: ({error}) =>{

          if(error.company_name !== undefined){
            // Company name exist
            this.errorMessage = "Podany nazwa firmy już istnieje!";
          } 
          else if(error.email !== undefined){
            // Email exist
            this.errorMessage = "Podany email już istnieje!";
          }
          else if(error.password !== undefined){
            // Two options: 1.Password does't have min 9 signs, 2.Passwords are different
            // We will fix this at frontend side to reduce requests 
            // but for sure we will show this message when something will go wrong with password
            this.errorMessage = "Hasło nie spełnia kryteriów!";
          }
          else{
            this.errorMessage = "Nieznany błąd. Skontaktuj się z nami.";
          }

          // Print to console all errors with register form
          console.error(error);

        }
      })
    }
  }

}
