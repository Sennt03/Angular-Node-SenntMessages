import { AbstractControl } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { map } from 'rxjs';

export class MyValidators {

  static matchPasswords(control: AbstractControl){
    const password = control.get('password').value
    const password2 = control.get('password2').value
    if(password !== password2){
        return {match_password: true}
    }

    return null
  }

  // Funciones para validaciones asincronas
  static validateUsername(service: AuthService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return validateAvaible(service, value, 'username')
    };
  }


  static validateEmail(service: AuthService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return validateAvaible(service, value, 'email')
    };
  }

  // Funcion que valida si un email es valido (validacion asincrona)
  static emailIsValid(service: UserService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.isValidEmal(value).pipe(map((res: any) => {
        const isValid = res.isValid;
        if (!isValid) {
          return {not_valid: true};
        }
        return null;
      }))
    };
  }

}

// Funcion de validacion ascincrona para username o email
function validateAvaible(service: AuthService, value, field: 'email' | 'username'){

  return service.validateAvaible(value, field)
  .pipe(
    map((response) => {
      const isAvailable = response.isAvailable;
      if (!isAvailable) {
        return {not_available: true};
      }
      return null;
    })
  );
}