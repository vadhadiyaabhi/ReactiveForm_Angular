import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/MyService/register.service';
import { PasswordValidator } from 'src/app/Shared/password.validator';
import { forbiddenNameValidator } from 'src/app/Shared/username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hide: boolean = true;
  public radioSelect: boolean = false;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private registrationService: RegisterService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9@#&_\*\.]*[^\s][a-zA-Z0-9@#&_\*\.]$'), forbiddenNameValidator(/password/), forbiddenNameValidator(/username/)]],
      firstname: ['', [Validators.required, Validators.pattern('[^\\s][a-zA-Z][a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('[^\\s][a-zA-Z][a-zA-Z]+$')]],
      mobile: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9]{1}[0-9]{9}$')]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.email]],
      email: [''],
      subscribed: [false],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,14}')]],
      confPass: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      }),
      moreAddress: this.fb.array([])
  
    }, { validator : PasswordValidator } );

    this.registrationForm.get('subscribed').valueChanges
      .subscribe(checkedValue => {
        // const email = this.registrationForm.get('email');
        console.log(checkedValue);
        if(checkedValue){
          console.log("checked");
          this.email.setValidators([Validators.required,Validators.email]);
        } else {
          console.log("unchecked");
          this.email.clearValidators();
        }
        this.email.updateValueAndValidity();
        
      });
  }

  get firstname(){
    return this.registrationForm.get('firstname');
  }
  get lastname(){
    return this.registrationForm.get('lastname');
  }
  get username(){
    return this.registrationForm.get('username');
  }
  get mobile(){
    return this.registrationForm.get('mobile');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confPass(){
    return this.registrationForm.get('confPass');
  }
  get gender(){
    return this.registrationForm.get('gender');
  }
  get birthdate(){
    return this.registrationForm.get('birthdate');
  }
  get street(){
    return this.registrationForm.get('street');
  }
  get city(){
    return this.registrationForm.get('city');
  }
  get postalCode(){
    return this.registrationForm.get('postalCode');
  }
  get moreAddress(){
    return this.registrationForm.get('moreAddress') as FormArray;
  }

  // extraAddress = 

  addMoreAddress(){
    this.moreAddress.push(new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('')
    }))
  }

  // ^[a-zA-Z0-9@#&_\*\.]*[^\s][a-zA-Z0-9@#&_\*\.]$

  

  onSubmit(){
    if(this.registrationForm.get('gender')?.value === ''){
      this.radioSelect = true;
    }
    else{
      // console.log("Success ", this.registrationForm.value);
      // console.log("Success ", this.registrationForm.get('email').value);
      this.registrationService.Register(this.registrationForm.value)
        .subscribe(
          res => console.log("Success! ", res),
          err => console.log("Error!! ", err)
        );
    }
  }

}
