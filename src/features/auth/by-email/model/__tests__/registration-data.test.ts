import { describe, it, expect } from 'vitest';

import { RegistrationData } from '../registration-data';

describe('RegistrationData', () => {
  it('RegistrationData 인스턴스를 생성할 수 있다.', () => {
    const email = 'test@email.com';
    const password = 'password';

    const registrationData = new RegistrationData({ email, password });

    expect(registrationData).toBeInstanceOf(RegistrationData);
  });

  it('유효한 email은 @와 .을 포함해야 한다.', () => {
    const validEmail = 'test@email.com';
    const invalidEmail1 = 'test@emailcom';
    const invalidEmail2 = 'testemail.com';
    const password = 'password';

    const validRegistrationData = new RegistrationData({
      email: validEmail,
      password,
    });
    const invalidRegistrationData1 = new RegistrationData({
      email: invalidEmail1,
      password,
    });
    const invalidRegistrationData2 = new RegistrationData({
      email: invalidEmail2,
      password,
    });

    expect(validRegistrationData.isValidEmail()).toBe(true);
    expect(invalidRegistrationData1.isValidEmail()).toBe(false);
    expect(invalidRegistrationData2.isValidEmail()).toBe(false);
  });

  it('유효한 password는 8자 이상이어야 한다.', () => {
    const email = 'test@email.com';
    const validPassword = '12345678';
    const invalidPassword = '1234567';

    const validRegistrationData = new RegistrationData({
      email,
      password: validPassword,
    });
    const invalidRegistrationData = new RegistrationData({
      email,
      password: invalidPassword,
    });

    expect(validRegistrationData.isValidPassword()).toBe(true);
    expect(invalidRegistrationData.isValidPassword()).toBe(false);
  });
});
