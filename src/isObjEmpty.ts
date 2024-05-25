/**
 * 检查对象是否为空
 * @param  {object | null | undefined} obj 要检查的对象
 * @return {boolean} 是否为空
 */
export function isObjEmpty(obj: object | null | undefined): boolean {
    const { hasOwnProperty } = Object.prototype;

    if (obj == null) return true;

    if ((obj as any).length === 0) return true;

    if (typeof obj !== 'object') return true;

    if ((obj as any).length > 0) return false;

    return !Object.keys(obj).some(key => hasOwnProperty.call(obj, key));
}
