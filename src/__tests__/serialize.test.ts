import { serialize } from '../serialize';

describe('serialize', () => {
  it('should serialize an object to a query string', () => {
    const data = { foo: 'bar', baz: 42 };
    const result = serialize(data);
    expect(result).toBe('foo=bar&baz=42');
  });

  it('should encode special characters', () => {
    const data = { 'a b': 'c d', 'e@f': 'g/h' };
    const result = serialize(data);
    expect(result).toBe('a%20b=c%20d&e%40f=g%2Fh');
  });

  it('should handle empty objects', () => {
    const data = {};
    const result = serialize(data);
    expect(result).toBe('');
  });

  it('should handle null and undefined values', () => {
    const data = { foo: null, bar: undefined };
    const result = serialize(data);
    expect(result).toBe('foo=null&bar=undefined');
  });
});
