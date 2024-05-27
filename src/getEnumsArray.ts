/**
 * 通过枚举获取数组
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          数组
 */
export function getEnumsArray<T extends Record<string, string | number>>(enumObj: T): { text: string | number; value: string }[] {
    return Object.keys(enumObj).map(function (key) {
        return {
            text: enumObj[key as keyof T],
            value: key,
        };
    });
}
