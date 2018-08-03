# [Prettier](https://github.com/prettier/prettier)

> Prettier is an opinionated code formatter

### [安装](https://prettier.io/docs/en/install.html)

注意区分全局安装和本地安装的区别，配置文件等问题。

### [配置文件](https://prettier.io/docs/en/configuration.html)

配置文件为yaml或json或js。

### [.prettierrc](/../prettierrc/)
换行长度：默认为80.
```
  printWidth: 100 
```
**指定使用哪个分析器，默认为babylon**
```
  parser: babylon
```
__此处注意parser的值__

> 之前为了解析flowType中的流改为flow，prettier不识别@装饰器，引发bug

使用单双引号的问题，默认为false
```
  singleQuote: true
```
结尾打印逗号，默认为none
```
trailingComma: "es5"
```
