import { Component, Inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sending-polls-dialog',
  templateUrl: './sending-polls-dialog.component.html',
  styleUrls: ['./sending-polls-dialog.component.css']
})
export class SendingPollsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pollSlug: string}, private formBuilder: FormBuilder) { }

  emails : string[] = []

  emailForm : FormGroup = this.formBuilder.group(
    {
      email: ['']
    }
  );

  ngOnInit(): void {
    this.emailForm.controls['email'].addValidators([Validators.email]);
  };

  onAddRecipient(): void{
    console.log("elo");
    
  };

  addEmail(){
    // // Custom error
    // if(this.emailForm.controls['email'].value === ''){
    //   this.emailForm.controls['email'].setErrors({empty: 'true'});
    // }
    
    let email = this.emailForm.controls['email'].value;
    // Add the email only when valid and not empty
    if(this.emailForm.valid && email !== ''){

      // Check that the email exist
      let filteredArray = this.emails.filter((e) => {
        if(e === email) return true;
        return false;
      })

      console.log(filteredArray);
      if(filteredArray.length == 0){
        this.emails.push(email);
      }
      // else{
      //   this.emailForm.controls['email'].setErrors({exist: 'true'});
      // }

    }
    
  }

  onDelete(emailToRemove : string){
    this.emails = this.emails.filter((email)=>{
      if(email === emailToRemove) return false;
      return true;
    })
  }

  // getEmailErrorMessage(): string{
  //   if(this.emailForm.controls['email'].hasError('empty')){
  //     return "Nie wprowadzono maila";
  //   }
  //   if(this.emailForm.controls['email'].hasError('email')){
  //     return "Email jest niepoprawny";
  //   }
  //   return "";
  // }

}
