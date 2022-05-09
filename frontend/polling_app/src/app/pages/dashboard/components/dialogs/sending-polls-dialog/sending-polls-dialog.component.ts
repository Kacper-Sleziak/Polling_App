import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Email } from 'src/app/models/dashboard-models/email';
import { MailService } from 'src/app/services/dashboard-services/mail.service';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-sending-polls-dialog',
  templateUrl: './sending-polls-dialog.component.html',
  styleUrls: ['./sending-polls-dialog.component.css']
})
export class SendingPollsDialogComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: {pollSlug: string}, 
                private formBuilder: FormBuilder, 
                private mailService: MailService,
                private snackBar: MatSnackBar) {}

  emails : string[] = []
  isSubject: boolean = false;
  isRecipient: boolean = false;

  emailForm : FormGroup = this.formBuilder.group(
    {
      email: ['']
    }
  );

  messageForm : FormGroup = this.formBuilder.group(
    {
      subject: [''],
      message: ['']
    }
  );

  ngOnInit(): void {
    this.emailForm.controls['email'].addValidators([Validators.email]);
    this.messageForm.controls['subject'].addValidators([Validators.required]);
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
      this.isRecipient = true;
    }

  }

  onDeleteEmail(emailToRemove : string){
    // Delete email from array
    this.emails = this.emails.filter((email)=>{
      if(email === emailToRemove) return false;
      return true;
    })

    // Check that the array is empty -> if so we can't sent the poll
    if(this.emails.length == 0) this.isRecipient = false;
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

  onSubjectChange(value : any): void{
    if(value.target.value !== '') this.isSubject = true;
    else this.isSubject = false;
  }

  onSendPoll(){
    let subject: string = this.messageForm.controls['subject'].value;
    let message: string = this.messageForm.controls['message'].value;

    this.mailService.postMail(new Email(subject, message, this.data.pollSlug, this.emails));
    this.openSnackBar();
  }

  // Open snackbar function
  openSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 1000,
      horizontalPosition: 'end',
      panelClass: 'custom-snack-bar'
    });
  }

}
