/**
 * 序列化数据
 * @param  {Record<string, any>} data 数据对象
 * @return {string}                   URL用数据
 */
export function serialize(data: Record<string, any>): string {
    return Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
}
