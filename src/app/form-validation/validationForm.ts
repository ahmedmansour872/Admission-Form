import { AbstractControl } from "@angular/forms";

export function checkDigit(control:AbstractControl){

  if(control.value.match(/[0-9]/g)){
    return {invalidName:true}
  }
  return null
}
