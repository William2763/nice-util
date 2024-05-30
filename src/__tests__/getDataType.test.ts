import { getDataType } from '../getDataType';

describe('getDataType function', () => {
    test('should return "String" for string input', () => {
        expect(getDataType('hello')).toBe('String');
    });

    test('should return "Number" for number input', () => {
        expect(getDataType(123)).toBe('Number');
    });

    test('should return "Boolean" for boolean input', () => {
        expect(getDataType(true)).toBe('Boolean');
    });

    test('should return "Object" for object input', () => {
        expect(getDataType({})).toBe('Object');
    });

    test('should return "Array" for array input', () => {
        expect(getDataType([])).toBe('Array');
    });

    test('should return "Function" for function input', () => {
        expect(getDataType(() => {})).toBe('Function');
    });

    test('should return "Null" for null input', () => {
        expect(getDataType(null)).toBe('Null');
    });

    test('should return "Undefined" for undefined input', () => {
        expect(getDataType(undefined)).toBe('Undefined');
    });

    test('should return "Date" for date input', () => {
        expect(getDataType(new Date())).toBe('Date');
    });

    test('should return "RegExp" for regular expression input', () => {
        expect(getDataType(/test/)).toBe('RegExp');
    });

    test('should return "Symbol" for symbol input', () => {
        expect(getDataType(Symbol())).toBe('Symbol');
    });
});
