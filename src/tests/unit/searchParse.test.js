import searchParse from '../../utils/searchParse';

describe('searchParse', () => {
  test('It should return a string', () => {
    const result = searchParse('test');
    expect(typeof result).toBe('string');
  });

  test('It should return a string separated with commas if the supply is only separated with commas', () => {
    const result = searchParse('Tokyo,Basketball');
    expect(result).toBe('Tokyo,Basketball');
  });

  test('It should return a string separated with commas if the supply is separated with commas and spaces', () => {
    const result = searchParse('Tokyo, Basketball');
    expect(result).toBe('Tokyo,Basketball');
  });

  test('It should accept and parse strings with multiple spaces', () => {
    const result = searchParse('Tokyo,         Basketball');
    expect(result).toBe('Tokyo,Basketball');
  });

  test('It should accept and parse strings with multiple commas', () => {
    const result = searchParse('Tokyo,    ,,,     ,Basketball');
    expect(result).toBe('Tokyo,,,,,Basketball');
  });

  test('It should return an empty string if the supply is an empty string', () => {
    const result = searchParse('');
    expect(result).toBe('');
  });
});