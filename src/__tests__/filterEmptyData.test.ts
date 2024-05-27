import { filterEmptyData } from '../filterEmptyData';

describe('filterEmptyData', () => {
    it('should filter out undefined, null, empty string, and empty array values', () => {
        const input = {
            a: 'value',
            b: undefined,
            c: null,
            d: '',
            e: [],
            f: [1, 2, 3],
            g: 'undefined',
        };
        const expectedOutput = {
            a: 'value',
            f: [1, 2, 3],
        };
        expect(filterEmptyData(input)).toEqual(expectedOutput);
    });

    it('should return the same object if there are no empty values', () => {
        const input = {
            a: 'value',
            b: 123,
            c: true,
            d: [1, 2, 3],
        };
        expect(filterEmptyData(input)).toEqual(input);
    })
});
