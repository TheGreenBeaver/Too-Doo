import { getPathRegex, pathExists } from './routing';
import { applyToOneOrMany } from './misc';


function forEachFixture(fn, testCases) {
  testCases.forEach(testCase => {
    expect(fn(testCase.input)).toEqual(testCase.expected);
  });
}

describe('Util', () => {
  describe('Routing', () => {
    it('Should calculate path regex', () => {
      const testCases = [
        {
          input: '/simple/path',
          expected: /^\/simple\/path$/
        },
        {
          input: '/with/one/:param',
          expected: /^\/with\/one\/[^/]+$/
        },
        {
          input: '/with/:two/:params',
          expected: /^\/with\/[^/]+\/[^/]+$/
        },
        {
          input: '/with/:optional(\\d{4})/:param?',
          expected: /^\/with\/\d{4}\/?[^/]*$/
        },
        {
          input: '/with/optional/:pattern(\\W{3})?',
          expected: /^\/with\/optional\/?(\W{3})?$/
        }
      ];
      forEachFixture(getPathRegex, testCases);
    });

    it('Should check path existence', () => {
      const testCases = [
        { input: '/', expected: false },
        { input: '/to_dos', expected: true },
        { input: '/to_dos/432', expected: true },
        { input: '/to_dos/fdsa', expected: false },
        { input: '/to_dos/new', expected: true }
      ];
      forEachFixture(pathExists, testCases);
    });
  });

  describe('Misc', () => {
    it('Should apply callback to one or many targets', () => {
      const fn = str => str.toUpperCase();

      const singleTarget = applyToOneOrMany('str', fn);
      expect(singleTarget).toBe('STR');

      const multiTarget = applyToOneOrMany(['str', 'txt', 'line'], fn);
      expect(multiTarget).toEqual(['STR', 'TXT', 'LINE']);
    });
  });
});