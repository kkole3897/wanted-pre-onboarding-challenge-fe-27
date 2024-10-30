export class RegistrationData {
  public email: string;
  public password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  public isValidEmail(): boolean {
    const requiredCharacters = ['@', '.'];

    return requiredCharacters.every((character) =>
      this.email.includes(character)
    );
  }

  public isValidPassword(): boolean {
    return this.password.length >= 8;
  }

  public isValid(): boolean {
    return this.isValidEmail() && this.isValidPassword();
  }
}
