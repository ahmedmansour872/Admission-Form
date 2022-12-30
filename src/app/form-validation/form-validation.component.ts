import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { checkDigit } from './validationForm';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {

  validationForm:FormGroup;

  availabe:boolean=false
  birthDate:boolean=false
  fullName:string=''
  constructor(private fb:FormBuilder){

    this.validationForm=this.fb.group({
      fullName:this.fb.group({
        firstName:['',[checkDigit,Validators.required,Validators.minLength(4),Validators.max(15)]],

        lastName:['',[checkDigit,Validators.required,Validators.minLength(4),Validators.max(15)]]
      }),

      address:this.fb.group({
        city:'',
        street:''
      }),

      position:['',checkDigit],

      phoneNumber:['',[Validators.minLength(11),Validators.maxLength(11),Validators.pattern(/[\d]/)]],

      email:['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/)]],

      expectedSalary:['',[Validators.pattern(/[\d]/),Validators.maxLength(7)]],

      availabilityDate:'',

      dateOfBirth:'',

      maritalStatus:'Single',

      file:''
    })

    this.validationForm.valueChanges.subscribe(value=>{
      if(isNaN(value.phoneNumber)){
        this.validationForm.patchValue({
          phoneNumber:value.phoneNumber.replace(/[\D]/,"")
        })
      }

      if(isNaN(value.expectedSalary)){
        this.validationForm.patchValue({
          expectedSalary:value.expectedSalary.replace(/[\D]/,"")
        })
      }

      let date=new Date(this.validationForm.get('availabilityDate')?.value).getFullYear()

      if (date>2030)
        this.availabe=true
      else this.availabe=false

      let Birth=new Date(this.validationForm.get('dateOfBirth')?.value).getFullYear()

      let dateNow=new Date().getFullYear()

      if (Birth>dateNow)
        this.birthDate=true
      else this.birthDate=false

    })
  }


  get firstName(){
    return this.validationForm.get('fullName')?.get('firstName')
  }

  get LastName(){
    return this.validationForm.get('fullName')?.get('lastName')
  }

  get position(){
    return this.validationForm.get('position')
  }

  get phoneNumber(){
    return this.validationForm.get('phoneNumber')
  }

  get expectedSalary(){
    return this.validationForm.get('expectedSalary')
  }

  get email(){
    return this.validationForm.get('email')
  }

  get avlableDate(){
    return this.validationForm.get('availabilityDate')
  }

  get dateOfBirth(){
    return this.validationForm.get('dateOfBirth')
  }

  clicked(e:any){
    e.target.nextElementSibling.children[1].click()
  }

  move(e:any){
    e.target.nextElementSibling.style.cssText=`
    top: -22px;
    left: 0px;
    font-size: 16px;`
  }

  checkEmpty(e:any){
    if(e.target.value=='')
      e.target.nextElementSibling.style.cssText=`
        top: 10px;
        left: 10px;
        font-size: 20px;`
  }

  onSubmit(){
    this.fullName=`Hello ${this.firstName?.value} ${this.LastName?.value} for website Digital Bond`

    setTimeout(() => {
      location.reload()
    }, 4000);
  }

}
