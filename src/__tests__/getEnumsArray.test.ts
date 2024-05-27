import { getEnumsArray } from '../getEnumsArray';

// 定义一个测试用的枚举
enum Colors {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

describe('getEnumsArray', () => {
    it('should convert enum to array of text and value objects', () => {
        const result = getEnumsArray(Colors);
        expect(result).toEqual([
            { text: "RED", value: "Red" },
            { text: "GREEN", value: "Green" },
            { text: "BLUE", value: "Blue" }
        ]);
    });

    it('should return an empty array for an empty enum', () => {
        enum EmptyEnum {}
        const result = getEnumsArray(EmptyEnum);
        expect(result).toEqual([]);
    });
});
