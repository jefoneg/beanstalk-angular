export class LoginConstant {
  public static readonly WELCOME_BACK = `Welcome back to `;
  public static readonly READY_FOR_ANOTHER_CUP = `Ready for another great cup?`;
  public static readonly LOGIN_TO_DISCOVER = `Log in to discover cafes and share your coffee moments. ✨`;
  public static readonly LOGIN = `Login`;
  public static readonly EMAIL = `Email`;
  public static readonly PASSWORD = `Password`;
  public static readonly NEW = `New here?`;
  public static readonly SIGN_UP = `Create an account`;
  public static readonly NAME = `First Name`;
  public static readonly LAST_NAME = `Last Name`;
  public static readonly REGISTER = `Register`;
  public static readonly LOGIN_SVG = `/illustrations/coffee-cup2.svg`;
  public static readonly LOGIN_SVG_ALT = `coffee-cup`;
  public static readonly ALREADY_HAVE_ACCOUNT = `Already have an account?`;
  public static readonly JOIN = `Join`;
  public static readonly START_DISCOVERING = `Discover cafes. Share reviews. Save your favorites. 🌈`;
  public static readonly REGISTER_SVG = `/illustrations/coffee-cup3.svg`;
  public static readonly FORGOT_PASSWWORD = `Set your new password`;
  public static readonly FORGOT_PASSWORD_MESSAGE = `Did you forgot your password?`

  public static readonly LOGIN_ERROR_MESSAGES: { [key: string]: string } = {
    firstName: 'First name is required.',
    lastName: 'Last name is required.',
    email: 'Email is invalid.',
    password: 'Password is invalid.',
    passwordLogin: 'Password characters should be more than 6.',
  };
}
