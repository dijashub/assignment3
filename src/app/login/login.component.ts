import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    username = new FormControl();
    password = new FormControl();
    loginForm : FormGroup;
  submitMessage : string;

  @ViewChild(FormGroupDirective)
  formGroupDirective : FormGroupDirective;
  
  
 constructor(private formBuilder : FormBuilder, private authService : AuthenticationService, private routerService : RouterService){

  this.loginForm = this.formBuilder.group({
    username : ['',Validators.compose([Validators.required,Validators.minLength(5)])],
    password : ['',Validators.compose([Validators.required,Validators.minLength(5)])]
  })

 }
 ngOnInit(){

}
    loginSubmit() {
      this.authService.authenticateUser(this.loginForm.value).subscribe( res =>{
        //  console.log(res);
            this.authService.setBearerToken(res['token']);
            this.submitMessage = '';
        
            //Route To Dashboard
            this.routerService.routeToDashboard();
         },
      err =>{
        // console.log(err.error.message);
        // this.submitMessage = 'Unauthorized'
        if (err.status === 403) {
          this.submitMessage = err.error.message;
        } else {
          this.submitMessage = err.message;
        }
      })
     
     
      //this.formGroupDirective.resetForm();
    }
}
