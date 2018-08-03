# [lint-staged](https://github.com/okonet/lint-staged)

> Run linters against staged git files and don't let 💩 slip into your code base!

### [安装](https://github.com/okonet/lint-staged#installation-and-setup)

> npm install --save-dev lint-staged husky

#### [husky](https://github.com/typicode/husky)

> 🐶 Git hooks made easy

> Husky can prevent bad commit, push and more 🐶 woof!

### 流程

当你做一次commit提交时，husky会触发git hook中的precommit脚本。先做eslint检查、然后再格式化代码，成功后会触发[commitlint](https://github.com/marionebl/commitlint)脚本去检测提交信息。
成功后才会提交到git本地仓库。
