import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonConstant } from '../../../constants/common.constant';
import { GetStartedConstant } from '../../../constants/get-started.constant';
import { LoginConstant } from '../../../constants/login.constant';
import { RoutesEnum } from '../../../enums/routes.enum';
import { SeparatorEnum } from '../../../enums/separator.enum';
import { RegisterPayload } from '../../../modes/payload.model';
import { ApiService } from '../../service/api-service';
import { LoginService } from '../../service/login-service';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.less',
})
export class RegisterComponent {
  protected readonly emptyString = SeparatorEnum.EmptyString;
  protected readonly GetStartedConstant = GetStartedConstant;
  protected readonly LoginConstant = LoginConstant;
  protected loginFormGroup: FormGroup;
  protected isFormGroupValid: boolean;
  protected isOnSubmit: boolean;
  protected formErrorMessage: string;

  /**
   * Constructs the LoginComponent.
   *
   * @param  {FormBuilder}  formBuilder  The form builde service.
   * @param  {ApiService}   apiService   Service for api related functions.
   * @param  {Router}       router       Router related services.
   * @param  {LoginService} loginService Service for login related functions.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly router: Router,
    protected readonly loginService: LoginService,
  ) {}

  /**
   * Initializes data when on login route.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.initializeFormGroup();
    this.isFormGroupValid = true;
  }

  /**
   * Determines the state of the form group.
   *
   * @returns  {void}
   */
  protected onLoginAction(): void {
    this.isFormGroupValid = true;
    this.loginService.setSignalMessage(SeparatorEnum.EmptyString);
    this.router.navigate([RoutesEnum.Login]);
  }

  /**
   * Initializes the form group for the login form.
   *
   * @returns  {void}
   */
  protected initializeFormGroup(): void {
    this.loginFormGroup = this.formBuilder.group({
      firstName: [SeparatorEnum.EmptyString, Validators.required],
      lastName: [SeparatorEnum.EmptyString, Validators.required],
      email: [SeparatorEnum.EmptyString, [Validators.required, Validators.email]],
      password: [
        SeparatorEnum.EmptyString,
        [Validators.required, Validators.minLength(CommonConstant.PASSWORD_LENGTH)],
      ],
    });
  }

  /**
   * Actions to be taken when the form is submitted.
   *
   * @returns  {void}
   */
  protected onSubmit(): void {
    this.isOnSubmit = true;
    this.isFormGroupValid = this.loginFormGroup.valid;

    if (!this.loginFormGroup.valid) {
      const controls: { [key: string]: AbstractControl<FormControl> } =
        this.loginFormGroup.controls;

      this.determineRegisterFormErrorMessage(controls);

      this.isOnSubmit = false;
    } else {
      const { email, firstName, lastName, password } = this.loginFormGroup.value;
      const payload = new RegisterPayload(email, firstName, lastName, password);

      this.apiService.postRegister(payload).subscribe({
        next: (response: any) => {
          this.isOnSubmit = false;
          this.loginService.setSignalMessage(response?.data?.message);
          this.router.navigate([RoutesEnum.Login]);
        },
        error: (error) => {
          this.formErrorMessage = SeparatorEnum.EmptyString;
          this.loginService.setSignalMessage(error?.error?.errorMessage);
          this.isOnSubmit = false;
        },
      });
    }
  }

  /**
   * Determines the form error message based on the given controls.
   *
   * @param   {Record<string, AbstractControl<FormControl>>} controls The controls of the form group.
   * @returns {void}
   */
  private determineRegisterFormErrorMessage(controls: {
    [key: string]: AbstractControl<FormControl>;
  }): void {
    if (controls['firstName'].invalid) {
      this.setFormErrorMessage('firstName');
    } else if (controls['lastName'].invalid) {
      this.setFormErrorMessage('lastName');
    } else if (controls['email'].invalid) {
      this.setFormErrorMessage('email');
    } else if (controls['password'].invalid) {
      this.setFormErrorMessage('password');
    }
  }

  /**
   * Sets the form error message based on the given message.
   *
   * @param   {string} message  The error message to set.
   * @returns {void}
   */
  private setFormErrorMessage(message: string): void {
    this.formErrorMessage = LoginConstant.LOGIN_ERROR_MESSAGES[message];
  }
}
