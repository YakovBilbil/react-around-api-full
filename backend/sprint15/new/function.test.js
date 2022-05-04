const sayHello = require('./function');
/*test('What the function under test should do', () => {
  // expected output depending on the input
});*/

test('Creates a greeting', () => {
    expect(sayHello('Lera', 'Jackson')).toBe('Hello, Lera Jackson!');
});



/*
npm install --save-dev cross-env

/* add after name in package.json

"jest": {
        "testEnvironment": "jest-environment-node",
        "transform": {}
    },

    */
/* run:
    node --experimental-vm-modules node_modules/jest/bin/jest.js

    in BASH
    */