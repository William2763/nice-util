import { trim } from '../trim';

describe('trim function', () => {
    test('should trim leading spaces', () => {
        expect(trim('   hello', 'before')).toBe('hello');
    });

    test('should trim trailing spaces', () => {
        expect(trim('hello   ', 'after')).toBe('hello');
    });

    test('should trim both leading and trailing spaces', () => {
        expect(trim('   hello   ', 'both')).toBe('hello');
    });

    test('should trim all spaces', () => {
        expect(trim(' h e l l o ', 'all')).toBe('hello');
    });

    test('should handle empty string correctly', () => {
        expect(trim('', 'both')).toBe('');
    });

    test('should handle non-string input', () => {
        expect(trim(123 as any, 'both')).toBe(123);
    });

    test('should handle invalid position', () => {
        expect(trim('hello', 'invalid' as any)).toBe('hello');
    });

    test('should handle no position specified', () => {
        expect(trim('   hello   ')).toBe('hello');
    });
});
