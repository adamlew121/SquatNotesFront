export class User {
  constructor(param: { password: string; surname: string; sex: string; name: string; dateOfBirth: Date; login: string; email: string }) {
  }

  id: number;
  name: string;
  email: string;
  surname: string;
  login: string;
  password: string;
  dateOfBirthday: Date;
  sex: string;
}
