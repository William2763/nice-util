// utils/autoExport.ts
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // 获取当前文件的路径
const __dirname = dirname(__filename); // 获取当前文件的目录路径

const srcDir = path.resolve(__dirname, './src'); // 假设 `src` 文件夹在根目录下

const generateExport = () => {
  const files = fs.readdirSync(srcDir);
  let exportStatements = '';

  files.forEach((file) => {
    const filePath = path.join(srcDir, file);
    const stat = fs.statSync(filePath);

    // 只处理 .ts 或 .js 文件
    if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.js'))) {
      const moduleName = path.basename(file, path.extname(file));
      // 不导出index.ts和隐藏文件
      if (moduleName !== 'index' && !file.startsWith('.')) {
        exportStatements += `export * from './${moduleName}';\n`;
      }
    }
  });

  return exportStatements;
};

const exportContent = generateExport();
fs.writeFileSync(path.resolve(srcDir, 'index.ts'), exportContent);

console.log('index.ts file has been updated with automatic exports.');