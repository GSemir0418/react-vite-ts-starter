### 1 项目搭建

- `pnpm create vite `

### 2 配置 sass

- `pnpm i sass`

- shared/reset.scss

```scss
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*::before,
*::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
}

button,
input {
  font: inherit;
}
```

- shared/vars.scss

```scss
:root {
  --text-color: red;
}
```

### 3 配置路由

- 安装`react-router-dom`

```bash
$ pnpm add react-router-dom
```

- src 下创建路由配置文件`src/config/routes`，利用 react 路由的懒加载——即对组件进行分割打包成多个 chunk 来减少一次性加载的资源大小，从而加快首屏渲染速度，提升用户体验

```ts
import { lazy } from "react";

const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../view/home")),
    name: "Home",
  },
  {
    path: "/home",
    component: lazy(() => import("../view/home")),
    name: "Home",
  },
  {
    path: "/page1",
    component: lazy(() => import("../view/page1")),
    name: "Page1",
  },
  ...
];
export default routes;
```

- 封装`router.tsx`作为路由文件入口。由于路由是以懒加载的形式渲染的，所以切换页面时可能会产生延迟，因此使用`Suspense`组件将路由组件包裹，并在 fallback 中声明懒加载组件加载完成前做的事，优化整个页面的交互
- 注意 Route 中的`component`属性改为了`element`

```tsx
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './config/routes'

const Router = () => {
  const myRoutes = routes.map(item => {
    return (
      <Route key={item.path} path={item.path} element={<item.component />} />
    )
  })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{myRoutes}</Routes>
    </Suspense>
  )
}

export default Router
```

- `App.tsx`，注意使用`HashRouter`或`BrowserRouter`组件包裹`Router`

```tsx
import Router from './router'
import { HashRouter, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Link to="/">Home Page</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>
        <Router />
      </HashRouter>
    </div>
  )
}

export default App
```

### 4 eslint 与 prettier 配置

- 安装 eslint 与 prettier

```bash
$ pnpm add -D @typescript-eslint/eslint-plugin eslint eslint-plugin-react @typescript-eslint/parser prettier
```

- `.eslintrc.js`

```js
module.exports = {
  // react17以上的版本，使用plugin:react/jsx-runtime
  extends: ['eslint:recommended', 'plugin:react/jsx-runtime'],
  // 代码运行环境
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
    ecmaVersion: 6,
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: [['@', './src']],
      },
    },
  },
  rules: {
    /*
     * 建议规则
     */
    // 必须使用全等
    eqeqeq: 2,
    // 不建议使用consolelog
    'no-console': 1,
    // 不建议使用alert
    'no-alert': 2,
    // 强制对多行注释使用特定风格，块注释或行注释
    // 'multiline-comment-style': 2,
    // 不建议使用不必要的分号
    'no-extra-semi': 2,
    // 不建议使用短符号进行类型转换（禁用隐式转换）
    'no-implicit-coercion': 2,
    // 不建议注释与代码在同一行
    'no-inline-comments': 2,
    // 不建议在三元操作数中间换行
    // 'no-nested-ternary': 2,
    // 不建议将变量初始化为undefined
    'no-undef-init': 2,
    // 不建议在有更简单的可替代的表达式时(||)使用三元操作符
    'no-unneeded-ternary': 2,
    // 不建议变量定义却不使用
    'no-unused-expressions': 2,
    // 不建议使用var
    'no-var': 2,
    // 推荐对象字面量简写语法
    'object-shorthand': 1,
    // 推荐回调函数使用箭头函数形式
    'prefer-arrow-callback': 1,
    // 优先使用对象与数组的解构语法
    'prefer-destructuring': 1,
    // 建议使用模板字符串而非字符串拼接
    'prefer-template': 2,
    // 在注释内容前建议添加空格
    'spaced-comment': 1,

    /*
     * 布局风格
     */
    // 在数组开括号后和闭括号前强制换行
    'array-bracket-newline': ['error', { multiline: true }],
    // 建议数组方括号中使用一致的空格？
    'array-bracket-spacing': 0,
    // 建议多项数据的最后一项保留逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 建议逗号前添加空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 箭头函数前后应有空格
    'arrow-spacing': 2,
    // 强制使用一致的空格，默认逗号放在数组元素、对象属性或变量声明之后
    'comma-style': 2,
    // 不建议在计算属性（obj[foo] || { [foo]: 1 }）中使用空格
    'computed-property-spacing': 2,
    // 强制在点号之前或之后换行
    // 'dot-location': ['error', 'object'],
    // 函数调用时，名称与括号之间不建议存在空格
    'func-call-spacing': 2,
    // 在迭代器函数名与*号之间是否存在空格
    /* 'generator-star-spacing': ['error', 'before'], */
    // 缩进为2
    indent: ['error', 2, { SwitchCase: 1 }],
    // jsx元素中的属性使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 对象的key和value之间要有空格
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 强制在关键字（else this function）前后使用一致的空格
    'keyword-spacing': ['error', { before: true }],
    // 允许注释周围存在空行
    'lines-around-comment': [
      'error',
      // 在对象字面量的开始位置、在块语句的结束位置允许注释
      { allowObjectStart: true, allowBlockStart: true },
    ],
    // 要求调用无参构造函数时带括号
    'new-parens': 'error',
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 'error',
    // 空格只允许一个
    'no-multi-spaces': 'error',
    // 不允许出现多个空行
    'no-multiple-empty-lines': 'error',
    // 行尾禁止出现空格
    'no-trailing-spaces': 'error',
    // 属性前（foo. bar）不允许出现空格
    'no-whitespace-before-property': 'error',
    // enforce consistent line breaks after opening and before closing braces
    // 'object-curly-newline': ['error', { multiline: true }],
    // 花括号前后要有空格
    'object-curly-spacing': ['error', 'always'],
    // 当代码块只有一条语句时，省略花括号
    curly: ['error', 'multi-or-nest'],
    // 换行时换行符放在操作符后面（即操作符后换行）
    'operator-linebreak': ['error', 'after'],
    // 建议对象的属性在各自的独立行
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ],
    // 在剩余和扩展运算符及其表达式之间不需要空格（... a）
    'rest-spread-spacing': ['error', 'never'],
    // 分号前无空格，分号后有空格（for循环）
    'semi-spacing': ['error', { before: false, after: true }],
    // 强制分号出现在行尾
    'semi-style': ['error', 'last'],
    // 要求块语句之前有空格（func() {}，try {}，if() {}）
    'space-before-blocks': 'error',
    // 函数圆括号之前是否存在空格
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    // 禁止圆括号内出现空格
    'space-in-parens': ['error', 'never'],
    // 要求操作符周围有空格（1 === 1）
    'space-infix-ops': 'error',
    // 要求一元操作符（new delete typeof ! ++）在之前或之后存在空格
    'space-unary-ops': [2, { words: true }],
    // 要求包裹正则表达式
    'wrap-regex': 2,
    // Enforce spacing around the * in yield* expressions
    /* 'yield-star-spacing': ['error', 'before'], */
  },
}
```

- `.prettierrc.js`

```js
module.exports = {
  // 对象花括号内部前后有空格
  bracketSpacing: true,
  // 缩进 2
  tabWidth: 2,
  // 句尾分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 最后一项后的逗号
  trailingComma: 'all',
  // 元素的‘>’单独一行
  bracketSameLine: false,
  arrowParens: 'avoid',
  // jsx中使用双引号
  jsxSingleQuote: false,
  stylelintIntegration: true,
  eslintIntegration: true,
}
```

### 5 husky 配置 github 提交代码规范

- 安装 husky

- > [Husky - Git hooks (typicode.github.io)](https://typicode.github.io/husky/#/?id=install)

```bash
$ pnpm add husky -D
# 初始化husky，将git hooks交由husky执行
$ npx husky install
husky - Git hooks installed
# 在package.json添加命令
$ npm set-script prepare "husky install"
# 会在每次pnpm install时自动执行，神奇呀！
```

- 安装 pre-commit，在 commit 之前（`git add`后），代码会自动判断暂存区的代码是否符合规范，并对暂存区指定文件进行格式化

- > [okonet/lint-staged: 🚫💩 — Run linters on git staged files (github.com)](https://github.com/okonet/lint-staged#examples)

```bash
# 自动格式化lint-staged
$ pnpm add lint-staged -D
$ npx husky add .husky/pre-commit "npx lint-staged"
husky - created .husky/pre-commit
# 提交一下
$ git add .husky/pre-commit
```

- 创建`.lintstagedrc.json`

```json
{
  "*.{js,jsx,ts,tsx}": ["npx prettier --write", "npx eslint --fix"],
  // 暂无stylelint
  "*.{css,less,scss}": ["npx prettier --write", "npx stylelint --fix"],
  "*.{json,md}": ["npx prettier --write"]
}
```

- 安装`commitlint`，在 pre-commit 之后运行，检查 commit 的内容

- > [Local setup (commitlint.js.org)](https://commitlint.js.org/#/guides-local-setup)

```bash
# 安装anglar的提交规范
$ pnpm add @commitlint/config-conventional @commitlint/cli -D
# 配置commitlint去使用conventional的配置
$ echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
# 添加commit-msg钩子，会在pre-commit之后运行，检查commit message的内容
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

### 6 stylelint 配置

- `pnpm i -D stylelint stylelint-config-standard postcss postcss-scss`

- .stylelintrc.js

```js
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
  },
}
```

### 7 axios 配置

- 安装

```bash
$ pnpm add axios
```

- 封装`(src/api/request.ts)`

```tsx
import { notification } from 'antd'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

class MyAxios {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 全局请求拦截
    this.instance.interceptors.request.use(
      config => config,
      error => error,
    )
    // 全局响应拦截
    this.instance.interceptors.response.use(
      res => res.data,
      error => {
        // 在响应拦截器中添加统一的错误处理
        const { response, request } = error
        if (response && response.status) {
          const errorText = codeMessage[response.status] || response.statusText
          const { status } = response
          const { responseURL: url } = request
          notification.open({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
          })
        } else if (!response) {
          notification.open({
            message: '网络错误',
            description: '您的网络发生异常，无法连接服务器',
          })
        }
        return response
      },
    )
  }

  // request作为原型方法继承给实例
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const myAxios = new MyAxios({
  // 根据环境变量改变前缀
  baseURL: '/api',
  timeout: 0,
  headers: {
    Authorization: `Bearer d38de888-cb73-4cf1-a335-d3f47312f148`,
  },
})

export default myAxios
```

- 开发环境`proxy`代理

```tsx
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://10.30.20.203:8080",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  ...
}
```

### 8 classnames

- `pnpm add classnames`

```tsx
import classnames from 'classnames'
import s from './About.module.scss'
const About = () => {
  return (
    <div className={classnames(s.wrapper, s.test_clns)}>This is About Page</div>
  )
}
export default About
```

- 修改 stylelint，支持蛇形命名(snake_case)

```js
rules: {
	indentation: 2,
	'no-descending-specificity': null,
	'selector-class-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
},
```
