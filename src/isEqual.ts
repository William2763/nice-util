/**
 * 判断两个对象是否相等
 * @param obj1 第一个对象
 * @param obj2 第二个对象
 * @returns 如果两个对象相等则返回 true，否则返回 false
 */
export const isEqual = (obj1: any, obj2: any): boolean => {
    const type1 = typeof obj1;
    const type2 = typeof obj2;

    // 如果类型不同直接返回false
    if (type1 !== type2) {
        return false;
    }

    // 如果是基本数据类型直接比较值
    if (type1 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    // 获取对象属性名数组
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 如果属性数量不同直接返回false
    if (keys1.length !== keys2.length) {
        return false;
    }

    // 递归比较对象属性值
    for (const key of keys1) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (!isEqual(value1, value2)) {
            return false;
        }
    }

    return true;
};