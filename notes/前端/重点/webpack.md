[学习网站](http://www.imooc.com/article/291219?block_id=tuijian_wz)

## 概念

四个核心概念：
1. 入口（entry）
2. 输出（output）
3. loader
4. 插件（plugins）

### 1. 入口 

#### 1.1 基础概念

指定 webpack 由哪个模块作为项目构建的开始。  

通过配置`entry`属性，指定一个或多个起点，默认值`./src`。

```js
module.exports = {
    entry: './path/leo/file.js'
}
```

#### 1.2 核心知识

##### 1.2.1 单文件入口

用法：`entry: string | Array<string>`

当`entry`中没有配置入口的文件对象的名称，默认使用的是`main`的名称，输出的就是`mian.js`,即
```js
// 默认情况
module.exports = {
    entry: './path/leo/file.js'
};
// 配置单个入口
const config = {
    entry: {
        main: './path/leo/file.js'
    }
}
```

可以看出，实际上**默认情况**知识**配置单个入口**的简写模式。

另外，**文件路径**我们也可以传入一个数组，就会将多个依赖文件一起注入：
```js
const config = {
    entry: {
        main: ['./path/leo/file.js', './path/leo/index.js', './path/leo/server.js']
    }
}
```

##### 1.2.2 多文件入口
用法：`entry: {[entryChunkName: string]: string|Array<string>}`

多个文件**完全分离**，**相互独立**（每个 bundle 中都有一个 webpack 引导(bootstrap)），常见于只有一个入口的单页面应用。
```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

### 2. 出口

#### 2.1 基础概念

指定 webpack 最终输出的文件输出位置和文件名等信息。

通过配置`output`属性，指定输出位置和文件名，默认输出位置`./dist`

两个属性：
- `path`：输出的目录的绝对路径
- `filename`：输出的文件名称

```js
const path = require('path')
module.exports = {
    entry: './path/leo/file.js',
    output: {
        path: path.resolve(__diename,'dist'),
        filename: 'leo-webpack.bundle.js'
    }
}
```

#### 2.2 核心知识

##### 2.2.1 使用占位符来为没个文件命名，保证名称唯一

```js
output: {
    path: path.resolve(__diename, 'dist'),
    filename: '[name].js'
}
```

##### 2.2.2 使用CDN和资源hash

```js
output: {
    path: '/home/proj/cdn/assets/[hash]',
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```
### 3. loader

#### 3.1 基础概念

让 webpack 能处理非JS文件，在`import`或`加载`模块时预处理文件。

通过配置 loader 两个属性来实现：
- `test`属性，用来标记处应该被对应的loader进行转换的某个或多个文件
- `ust`属性，表示转换时要用哪个loader

```js
const path = require('path')
const config = {
    output: {
        filename: 'leo-webpack.bundle.js'
    },
    module: {
        rules: [
            {test:/\.txt$/, use:'raw-loader'}
        ]
    }
}
module.exports = config;
```

#### 3.2 核心知识

##### 3.2.1 安装并使用loader

如安装一个`css-loader`和`ts-loader`使得 webpack 可以加载 CSS 文件，或者将`typescript`转换成`javascript`

```js
npm install --save-dev css-loader ts-loader
```

使用：
```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {test: /\.css$/, use: 'css-loader'},
            {test: /].ts$/, use: 'ts-loader'}
        ]
    }
}
```

##### 3.2.2 使用loader的三种方式

- 配置（推荐）：在 webpack.config.js 文件中指定 loader

指定多个loader：
```js
module: {
    rules: {
        {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    }
} 
```

- 内联：在每个 import 语句中显式指定 loader

可以在 `import` 语句或任何等效于 import 的方式中指定 loader，使用 ! 将多个 loader 分开，每个部分都是相对于当前目录的解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

**尽可能使用 module.rules，减少代码量，并且在出错时，更快地调试和定位 loader 中的问题。**

- CLI：在shell命令中指定它们

`webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'`

##### 3.2.3 loader加载顺序

loader 会从数组的最后一个开始，往前一个一个加载：

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {test: /\.css$/, use:['style-loader', 'css-loader']}
        ]
    }
}
```

##### 3.2.4 loader 特性

- loader 支持链式传递
能够对资源使用流水线（pipeline）。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个loader。在最后一个loader，返回webpack所预期的 JavaScript。
- loader 可以是同步的，可以的是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接受查询参数。用于对loader传递参数。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 packjson.json 里定义一个loader字段。
- 插件（plugin）可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

### 4. 插件

#### 4.1 基础概念

让 webpack 能够执行更多任务，能**优化和压缩**，到**重新定义环境中的变量**，非常强大。

插件目的在于解决 loader 无法实现的其他事。

使用时，只需要`require`它，并添加到`plugins`数组，通过`new`实例化即可：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]};

module.exports = config;
```

#### 4.2 核心知识

**原理剖析**：  
webpack插件是一个具有`apply`属性的 JavaScript 对象，`属性`会被`webpack complier`调用，并且`complier`对象可**在整个编译生命周期访问**。

```js
// ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

compiler hook 的 `tap` 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中复用。

**用法**：

由于插件得意携带**参数/选项**，你必须在`webpack`配置中，向`plugins`属性传入`new`实例。

**配置**：
```js
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/leo/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### 5. 模式
通过配置`mode`参数，指定当前的开发模式，有`development`和`production`两个值：

```js
module.exports = {
    mode: 'production'
}
```
也可以通过 CLI 参数传递：
```js
webpack --mode=production
```

| 选项 | 描述 |
|--- |--- |
| development | 会将 **process.env.NODE_ENV** 的值设为 **development**。启用 **NamedChunksPlugin** 和 **NamedModulesPlugin**。 |
| production | 会将 **process.env.NODE_ENV** 的值设为 **production**。启用 **FlagDependencyUsagePlugin**, **FlagIncludedChunksPlugin**, **ModuleConcatenationPlugin**, **NoEmitOnErrorsPlugin**, **OccurrenceOrderPlugin**, **SideEffectsFlagPlugin** 和 **UglifyJsPlugin**。 |

**记住，只设置 NODE_ENV，则不会自动设置 mode。**

## 配置

