export const getFileExtension = (filename: string): string => {
    // 处理路径，提取纯文件名（兼容 Windows 和 Unix 路径）
    const basename = filename.split(/[\\/]/).pop() || '';
  
    // 查找最后一个点号的位置
    const lastDotIndex = basename.lastIndexOf('.');
  
    // 排除无效情况：无点号、点号在开头、点号在末尾
    if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === basename.length - 1) {
      return '';
    }
  
    // 返回点号后的后缀名（转为小写可根据需求调整）
    return basename.slice(lastDotIndex + 1).toLowerCase();
}