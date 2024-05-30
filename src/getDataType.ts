/**
 * 获取数据类型
 * @param target 要检查类型的目标值
 * @returns 目标值的数据类型字符串
 */
export const getDataType = (target: any): string => {
    return Object.prototype.toString.call(target).slice(8, -1);
};
