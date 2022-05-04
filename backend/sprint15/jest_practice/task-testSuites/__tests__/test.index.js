const { isValidEmail, isValidPassword, validateUserInput } = require('../index.js');

// We've already added some test data for your convenience, but you can use your own
const dataValid = { email: 'bob@yandex.com', password: '1amAp0k3m0n%'  };
const dataInvalidPassword = { email: 'bob@yandex.com', password: '123456' };
const dataInvalidEmail = { email: 'bob', password: '1amAp0k3m0n%'  };
const dataInvalidCredentials = { email: 'bob', password: '12345'  };

// Write tests here