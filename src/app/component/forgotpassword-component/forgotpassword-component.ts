import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiService } from "../../service/api-service";
import { LoginService } from "../../service/login-service";
import { ForgotPasswordService } from "../../service/forgot-password.service";
import { CommonConstant } from "../../../constants/common.constant";
import { LoginConstant } from "../../../constants/login.constant";
import { SeparatorEnum } from "../../../enums/separator.enum";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../enums/routes.enum";
import { ForgotPasswordPayload } from "../../../modes/payload.model";

@Component({
  selector: "app-forgotpassword-component",
  imports: [ReactiveFormsModule],
  templateUrl: "./forgotpassword-component.html",
  styleUrl: "./forgotpassword-component.less",
})
export class ForgotpasswordComponent {
  protected forgotPasswordForm: FormGroup;
  protected newPasswordForm: FormGroup;
  protected readonly LoginConstant = LoginConstant;

  /**
   * Constructs the ForgotpasswordComponent.
   *
   * @param {FormBuilder}           formBuilder            The form builder.
   * @param {ApiService}            apiService             The API service.
   * @param {LoginService}          loginService           The login service.
   * @param {ForgotPasswordService} forgotPasswordService  The forgot password service.
   * @param {Router}                router                 The router service responsible for routing.
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    protected readonly loginService: LoginService,
    protected readonly forgotPasswordService: ForgotPasswordService,
    private readonly router: Router
  ) {}

  /**
   * An angular lifecycle hook that is called after the component is initialized.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeNewPasswordForm();
  }

  /**
   * Initializes the forgot password form group.
   *
   * @returns {void}
   */
  private initializeFormGroup(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [SeparatorEnum.EmptyString, [Validators.required, Validators.email]],
    });
  }

  /**
   * Initializes the new password form group.
   *
   * @returns {void}
   */
  private initializeNewPasswordForm(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: [
        SeparatorEnum.EmptyString,
        [Validators.required, Validators.minLength(CommonConstant.PASSWORD_LENGTH)],
      ],
    });
  }

  /**
   * Handles the submission of the forgot password form.
   *
   * @returns {void}
   */
  protected onSubmitEmail(): void {
    if (this.forgotPasswordForm.invalid) {
      this.loginService.setSignalMessage(LoginConstant.LOGIN_ERROR_MESSAGES["email"]);

      return;
    }

    this.forgotPasswordService.setButtonState(true);
    const { email } = this.forgotPasswordForm.value;
    const payload = new ForgotPasswordPayload(false, email, SeparatorEnum.EmptyString);

    this.apiService.postForgotPassword(payload).subscribe({
      next: () => {
        this.forgotPasswordService.setButtonState(false);
        this.loginService.setSignalMessage(SeparatorEnum.EmptyString);
        this.forgotPasswordService.setEmailValidity(true);
      },
      error: (error) => {
        this.forgotPasswordService.setButtonState(false);
        this.loginService.setSignalMessage(error.error.error);
        this.forgotPasswordService.setEmailValidity(false);
      },
    });
  }

  /**
   * Handles the submission of the new password form.
   *
   * @returns {void}
   */
  protected onSubmitNewPassword(): void {
    if (this.newPasswordForm.invalid) {
      this.loginService.setSignalMessage(LoginConstant.LOGIN_ERROR_MESSAGES["passwordLogin"]);

      return;
    }

    this.forgotPasswordService.setButtonState(true);
    const { password } = this.newPasswordForm.value;
    const payload = new ForgotPasswordPayload(true, this.forgotPasswordForm.value.email, password);

    this.apiService.postForgotPassword(payload).subscribe({
      next: (data) => {
        this.forgotPasswordService.setButtonState(false);
        this.loginService.setSignalMessage(data.data.message);
        this.router.navigate([RoutesEnum.Login]);
      },
      error: (error) => {
        this.forgotPasswordService.setButtonState(false);
        this.loginService.setSignalMessage(error.error.error);
      },
    });
  }

  protected onLoginAction(): void {
    this.router.navigate([RoutesEnum.Login]);
  }
}
