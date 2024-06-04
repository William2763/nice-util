## nice tool

> a set of nice tools


## usage

`bash
yarn add nice-util -S
`

`javascript
// 导入函数
import { trim } from 'nice-util';

// 测试字符串
const testString = '   Hello, world!   ';

// 去除字符串前面的空格
const trimmedBefore = trim(testString, 'before');
console.log(trimmedBefore); // 输出: 'Hello, world!   '

// 去除字符串后面的空格
const trimmedAfter = trim(testString, 'after');
console.log(trimmedAfter); // 输出: '   Hello, world!'

// 去除字符串前后的空格
const trimmedBoth = trim(testString, 'both');
console.log(trimmedBoth); // 输出: 'Hello, world!'

// 去除字符串中所有的空格
const trimmedAll = trim(testString, 'all');
console.log(trimmedAll); // 输出: 'Hello,world!'
`
