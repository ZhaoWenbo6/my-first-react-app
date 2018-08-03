# [ESLint](http://eslint.cn)

  
### 配置

ESLint官方文档非常全面，下面仅标注来源。

[Parser](http://eslint.cn/docs/user-guide/configuring#specifying-parser)，ESLint 默认使用Espree作为其解析器，项目中使用babel-eslint
```
  parser: 'babel-eslint',
```

[Environment](http://eslint.cn/docs/user-guide/configuring#specifying-environments)，环境定义了预定义的全局变量
```
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
```

[Extend](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)，一个配置文件可以被基础配置中的已启用的规则继承
[值来源](https://github.com/prettier/eslint-plugin-prettier)
```
  extends: ["plugin:prettier/recommended"],

```

[parserOptions](http://eslint.cn/docs/user-guide/configuring#specifying-parser-options)，ESLint 允许你指定你想要支持的 JavaScript 语言选项。
```
  parserOptions: {
    ecmaVersion: 6, //ECMA版本
    sourceType: 'module', //源码类型
    ecmaFeatures: {
      experimentalObjectRestSpread: true, //允许使用对象展开符|use experimental expression,
      jsx: true,
    },
  },
```

[plugins](http://eslint.cn/docs/user-guide/configuring#configuring-plugins)，ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
```
  plugins: ['react', 'flowtype','prettier'],
```

[settings](http://eslint.cn/docs/user-guide/configuring#adding-shared-settings)，ESLint 支持在配置文件添加共享设置。
[值来源](https://github.com/gajus/eslint-plugin-flowtype)
```
  flowtype: {
    onlyFilesWithFlowAnnotation: false,
  },
```

[rules](http://eslint.cn/docs/user-guide/configuring#configuring-rules)，ESLint 附带有大量的规则。
每个配置的解释的注释都在配置后面，如：

```
    'comma-style': [2, 'last'], //逗号的位置永远在句子的末尾
```

"off" 或 0 - 关闭规则

"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)

"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

有关prettier的请看同级目录下[prettier.md](./prettier.md/)
