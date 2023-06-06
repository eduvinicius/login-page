import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: FormGroup;
  isSubmitting: boolean = false;
  showValidation: boolean = false;
  wrongUserInfo: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    get email(): AbstractControl {
      return this.loginForm.get('email')!
    }

    get password(): AbstractControl {
      return this.loginForm.get('password')!
    }

    onSubmit(): void {

      if (this.loginForm.invalid) {
        this.showValidation = true
        setTimeout(() => {
          this.showValidation = false
        }, 2000)
        return;
      }

      const email: string = this.loginForm.get('email')?.value;
      const password: string = this.loginForm.get('password')?.value;

      this.authService.login(email, password);

      this.authService.isAuthenticatedGetter.subscribe((data) => {
        if ( data ) {
          this.isSubmitting = true;
          setTimeout(() => this.isSubmitting = false, 2000);
          this.wrongUserInfo = false;
        } else {
          this.wrongUserInfo = true;
        }
      });

      this.loginForm.reset();
    }
}

