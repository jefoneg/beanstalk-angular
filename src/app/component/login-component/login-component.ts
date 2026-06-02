import { Component } from '@angular/core';
import { GetStartedConstant } from '../../../constants/get-started.constant';
import { LoginConstant } from '../../../constants/login.constant';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeparatorEnum } from '../../../enums/separator.enum';
import { CommonConstant } from '../../../constants/common.constant';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.less',
})
export class LoginComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
  protected readonly LoginConstant = LoginConstant;
  protected isRegisterAccountClicked: boolean;
  protected loginFormGroup: FormGroup;
  protected isEmailInvalid: boolean;
  protected formErrorMessage: string;
  protected isFormGroupValid: boolean;

  /**
   * Constructs the LoginComponent.
   *
   * @param  {FormBuilder}  formBuilder  The form builde service.
   */
  constructor(private readonly formBuilder: FormBuilder) {}

  /**
   * Initializes data when on login route.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.initializeFormGroup();
    this.isRegisterAccountClicked = false;
    this.isFormGroupValid = true;
  }

  /**
   * Determines the state of the form group.
   *
   * @returns  {void}
   */
  protected onLoginAction(isRegister: boolean): void {
    this.isFormGroupValid = true;
    this.isRegisterAccountClicked = isRegister;
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
    this.isFormGroupValid = this.loginFormGroup.valid;

    if (!this.loginFormGroup.valid) {
      const controls: { [key: string]: AbstractControl<FormControl> } =
        this.loginFormGroup.controls;

      if (this.isRegisterAccountClicked) {
        this.determineRegisterFormErrorMessage(controls);
      } else {
        this.determineLoginFormErrorMessage(controls);
      }
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
   * Determines the form error message based on the given controls.
   *
   * @param   {Record<string, AbstractControl<FormControl>>} controls The controls of the form group.
   * @returns {void}
   */
  private determineLoginFormErrorMessage(controls: {
    [key: string]: AbstractControl<FormControl>;
  }): void {
    if (controls['email'].invalid) {
      this.setFormErrorMessage('email');
    } else if (controls['password'].invalid) {
      this.setFormErrorMessage('passwordLogin');
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

  /**
   * Sets the login hero texts based on the given mode.
   *
   * @param   {number} mode  The mode to set the hero texts for.
   * @returns {string}       The login hero text.
   */
  protected setLoginHeroTexts(mode: number): string {
    let paragraph: string = SeparatorEnum.EmptyString;

    if (CommonConstant.NUMERIC.ZERO === mode) {
      paragraph = !this.isRegisterAccountClicked ? LoginConstant.WELCOME_BACK : LoginConstant.JOIN;
    } else if (CommonConstant.NUMERIC.ONE === mode) {
      paragraph = !this.isRegisterAccountClicked
        ? LoginConstant.READY_FOR_ANOTHER_CUP
        : LoginConstant.START_DISCOVERING;
    } else if (CommonConstant.NUMERIC.TWO === mode) {
      paragraph = !this.isRegisterAccountClicked
        ? LoginConstant.LOGIN_TO_DISCOVER
        : SeparatorEnum.EmptyString;
    }

    return paragraph;
  }
}
