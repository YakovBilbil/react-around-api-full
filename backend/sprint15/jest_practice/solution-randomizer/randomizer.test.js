const randomizer = require('./randomizer');

it('Generates random numbers between 10 and 80 (not inclusive)', () => {
  expect(typeof randomizer()).toBe('number');
  expect(randomizer()).toBeGreaterThan(10);
  expect(randomizer()).toBeLessThan(80);
});
