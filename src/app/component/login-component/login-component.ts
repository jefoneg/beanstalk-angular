import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CommonConstant } from "../../../constants/common.constant";
import { GetStartedConstant } from "../../../constants/get-started.constant";
import { LoginConstant } from "../../../constants/login.constant";
import { RoutesEnum } from "../../../enums/routes.enum";
import { SeparatorEnum } from "../../../enums/separator.enum";
import { ApiService } from "../../service/api-service";
import { LoginService } from "../../service/login-service";
import { LoginPayload } from "../../../modes/payload.model";
import { StorageService } from "../../service/storage/storage.service";
import { SessionKeyConstant } from "../../../constants/session-key.constant";

@Component({
  selector: "app-login-component",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login-component.html",
  styleUrl: "./login-component.less",
})
export class LoginComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
  protected readonly LoginConstant = LoginConstant;
  protected loginFormGroup: FormGroup;
  protected formErrorMessage: string;
  protected isFormGroupValid: boolean;
  protected isOnSubmit: boolean;
  protected formSucessMessage: string;

  /**
   * Constructs the LoginComponent.
   *
   * @param  {FormBuilder}    formBuilder    The form builde service.
   * @param  {ApiService}     apiService     Service for api related functions.
   * @param  {Router}         router         Router related services.
   * @param  {LoginService}   loginService   Service for login related functions.
   * @param  {StorageService} storageService Service for storage related functions.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly router: Router,
    protected readonly loginService: LoginService,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Initializes data when on login route.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.storageService.clear();
    this.initializeFormGroup();
    this.isFormGroupValid = true;
    this.formSucessMessage = this.loginService.signalMessage$();
  }

  /**
   * Determines the navigation to other pages after an action.
   *
   * @param    {boolean}  isForgotPassword  An action whether the it redirects to forgot password or not.
   * @returns  {void}
   */
  protected onLoginAction(isForgotPassword?: boolean): void {
    this.isFormGroupValid = true;
    this.router.navigate([isForgotPassword ? RoutesEnum.ForgotPassword : RoutesEnum.Register]);
  }

  /**
   * Initializes the form group for the login form.
   *
   * @returns  {void}
   */
  protected initializeFormGroup(): void {
    this.loginFormGroup = this.formBuilder.group({
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
    this.formErrorMessage = SeparatorEnum.EmptyString;
    this.isOnSubmit = true;
    this.isFormGroupValid = this.loginFormGroup.valid;
    this.apiService.setLoaderVisibility(true);

    if (!this.loginFormGroup.valid) {
      const controls: { [key: string]: AbstractControl<FormControl> } =
        this.loginFormGroup.controls;

      this.determineLoginFormErrorMessage(controls);

      this.isOnSubmit = false;
    } else {
      const { email, password } = this.loginFormGroup.value;
      const payload = new LoginPayload(email, password);

      this.apiService.postLogin(payload).subscribe({
        next: (data) => {
          this.isOnSubmit = false;
          this.router.navigate([RoutesEnum.Home]);
          this.storageService.setItem(SessionKeyConstant.EMAIL, data.data.email);
          this.apiService.setLoaderVisibility(false);
        },
        error: (error) => {
          this.loginService.setSignalMessage(error?.error?.message);
          this.isOnSubmit = false;
          this.apiService.setLoaderVisibility(false);
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
  private determineLoginFormErrorMessage(controls: {
    [key: string]: AbstractControl<FormControl>;
  }): void {
    if (controls["email"].invalid) {
      this.setFormErrorMessage("email");
    } else if (controls["password"].invalid) {
      this.setFormErrorMessage("passwordLogin");
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
