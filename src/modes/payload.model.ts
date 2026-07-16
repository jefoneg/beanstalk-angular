export class LoginPayload {
    constructor(public email: string, public password: string) {}
}

export class RegisterPayload {
    constructor(public email: string, public firstname: string, public lastname: string, public password: string) {}
}

export class ForgotPasswordPayload {
    constructor(public isForgotPassword: boolean, public email: string, public newPassword: string) {}
}