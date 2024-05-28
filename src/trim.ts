/**
 * 去除字符串空格
 * @param str 要处理的字符串
 * @param position 去除空格的位置 ('before' 表示前面，'after' 表示后面，'both' 表示前后，'all' 表示所有)，默认为 'all'
 * @returns 处理后的字符串
 */
export function trim(str: string, position: 'before' | 'after' | 'both' | 'all' = 'all'): string {
    const type = Object.prototype.toString.call(str).slice(8, -1);
    if (type !== 'String') return str;
    let result = '';
    switch (position) {
        case 'before': // 前
            result = str.replace(/(^\s*)/g, '');
            break;
        case 'after': // 后
            result = str.replace(/(\s*$)/g, '');
            break;
        case 'both': // 前后
            result = str.replace(/(^\s*)|(\s*$)/g, '');
            break;
        default:
            // 所有
            result = str.replace(/\s*/g, '');
    }
    return result;
}
