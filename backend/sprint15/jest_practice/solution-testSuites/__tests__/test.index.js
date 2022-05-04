const { isValidEmail, isValidPassword, validateUserInput } = require('../index.js');

// This data must pass the validation
const dataValid = { email: 'bob@yandex.com', password: '1amAp0k3m0n%'  };

// This data must fail the validation
const dataInvalidPassword = { email: 'bob@yandex.com', password: '123456' };
const dataInvalidEmail = { email: 'bob', password: '1amAp0k3m0n%'  };
const dataInvalidCredentials = { email: 'bob', password: '12345'  };

// Write tests here

describe('Validation of user data', () => {
  it('#isValidEmail should check that the email is valid', () => {
    expect(isValidEmail(dataValid.email)).toBeTruthy();
    expect(isValidEmail(dataInvalidEmail.email)).toBeFalsy();
  });

  it('#isValidPassword should check that the password is valid', () => {
    expect(isValidPassword(dataValid.password)).toBeTruthy();
    expect(isValidPassword(dataInvalidPassword.password)).toBeFalsy();
  });

  it('#validateUserInput should return `message` if the data is correct, without returning an error', () => {
    expect(validateUserInput(dataValid).isValidated).toBeTruthy();
    expect(validateUserInput(dataValid).error).toBeNull();
    expect(validateUserInput(dataValid).message).toBe('User created successfully');
  });

  it('#validateUserInput should return an email error if the email is incorrect', () => {
    expect(validateUserInput(dataInvalidEmail).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidEmail).error).toBe('Wrong email');
    expect(validateUserInput(dataInvalidEmail).message).toBeNull();
  });

  it('#validateUserInput should return a password error if the password is incorrect', () => {
    expect(validateUserInput(dataInvalidPassword).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidPassword).error).toBe('Wrong password');
    expect(validateUserInput(dataInvalidPassword).message).toBeNull();
  });

  it('#validateUserInput should return an incorrect data error if all data is incorrect', () => {
    expect(validateUserInput(dataInvalidCredentials).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidCredentials).error).toBe('Incorrect data');
    expect(validateUserInput(dataInvalidCredentials).message).toBeNull();
  });
});