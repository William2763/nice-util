import { isObjEmpty } from '../isObjEmpty';

describe('isObjEmpty', () => {
  it('should return true for null', () => {
    expect(isObjEmpty(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isObjEmpty(undefined)).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(isObjEmpty({})).toBe(true);
  });

  it('should return false for non-empty object', () => {
    expect(isObjEmpty({ a: 1 })).toBe(false);
  });

  it('should return true for non-object types', () => {
    expect(isObjEmpty(123 as any)).toBe(true);
    expect(isObjEmpty('abc' as any)).toBe(true);
    expect(isObjEmpty(true as any)).toBe(true);
  });

  it('should handle objects with length property correctly', () => {
    expect(isObjEmpty({ length: 0 })).toBe(true);
    expect(isObjEmpty({ length: 1 })).toBe(false);
  });
});
