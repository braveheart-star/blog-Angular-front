export interface Credentials {
  email: string;
  password: string;
}

// export namespace Auth {
export class Register {
  static type = '[Auth] Register';
  constructor(public payload: Credentials) {}
}

export class Login {
  static type = '[Auth] Login';
  constructor(public payload: Credentials) {}
}

export class Logout {
  static type = '[Auth] Logout';
}
// }
