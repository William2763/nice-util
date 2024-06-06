import { isEqual } from '../isEqual';

describe('isEqual', () => {
    it('should return true for equal objects', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 2 } };
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
        const obj3 = { a: 1, b: { c: 2 } };
        const obj4 = { a: 1, b: { c: 3 } };
        expect(isEqual(obj3, obj4)).toBe(false);
    });

    it('should return true for equal arrays', () => {
        const arr1 = [1, 2, [3, 4]];
        const arr2 = [1, 2, [3, 4]];
        expect(isEqual(arr1, arr2)).toBe(true);
    });

    it('should return false for different arrays', () => {
        const arr3 = [1, 2, [3, 4]];
        const arr4 = [1, 2, [3, 5]];
        expect(isEqual(arr3, arr4)).toBe(false);
    });

    it('should return true for equal primitive values', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual('hello', 'hello')).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
    });

    it('should return false for different primitive values', () => {
        expect(isEqual(1, 2)).toBe(false);
        expect(isEqual('hello', 'world')).toBe(false);
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(null, undefined)).toBe(false);
    });
});