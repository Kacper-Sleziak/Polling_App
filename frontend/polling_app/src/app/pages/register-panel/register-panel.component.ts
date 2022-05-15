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
    this.registerForm.controls['password'].addValidators([Validators.required]);
    this.registerForm.controls['password2'].addValidators([Validators.required]);
  }

  onRegisterButtonClick(){
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
          this.accountService.setAuthorId(account.id);
          // Navigate to dashboard
          this.router.navigate(['dashboard']);
        },
        // If error
        error: ({error}) =>{
          // if(error.email.length){
          //   console.warn(error.email[0]);
          // }
          
          if(error.company_name !== null && (error.email !== null)){
            this.errorMessage = "Podany nazwa firmy i email już istnieją!";
            // document.getElementById('error-message')!.innerText = "Podany nazwa firmy i email już istnieją!";
            console.log(error.company_name);
          }

          if(error.email !== null){
            this.errorMessage = "Podany email już istnieje!";
            // document.getElementById('error-message')!.innerText = "Podany email już istnieje!";
            console.log(error.email);
          }

          if(error.company_name !== null){
            this.errorMessage = "Podany nazwa firmy już istnieje!";
            // document.getElementById('error-message')!.innerText = "Podany nazwa firmy już istnieje!";
            console.log(error.company_name);
          } 

          console.log(error);

        }
      })
    }
  }
}
