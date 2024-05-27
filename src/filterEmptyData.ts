/**
 * 过滤空数据
 * @param  {Record<string, any>} data 数据对象
 * @return {Record<string, any>}      过滤后的数据对象
 */
export function filterEmptyData(data: Record<string, any>): Record<string, any> {
    if (!data) return data;
    const filterData = { ...data };
    Object.keys(filterData).forEach((key) => {
        const value = filterData[key];
        if (
            value === 'undefined' ||
            value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
        ) {
            delete filterData[key];
        }
    });
    return filterData;
}
