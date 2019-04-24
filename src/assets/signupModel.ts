export class SignupModel {

    constructor(
      public username: string,
      public password: string,
      public repeatPassword: string,
      public email: string,
      public region: string
    ) {  }
  
  }