#!/usr/bin/env node

const color = require('cli-color')
const pkg = require('../package')
// 从顶层 index.js 里面拿到 lib 下面模块暴露的方法
const query = require('..').query
const update = require('..').update

// 输出结果到命令行窗口
function printResult(v) {
    update(v).then(dists => {
        const results = query(dists)
        console.log(color.blue(results))
        process.exit()
    })
}

function printVersion() {
    console.log(color.bold('ltsn ' + pkg.version))
    process.exit()
}

// 一些命令的帮助提示
function printHelp(code) {
    const lines = [
        '',
        '  Usage:',
        '    ltsn [8]',
        '',
        '  Options:',
        '    -v, --version             print the version of vc',
        '    -h, --help                display this message',
        '',
        '  Examples:',
        '    $ ltsn 8',
        ''
    ]

    console.log(lines.join('\n'))
    process.exit(code || 0)
}

// 包的入口函数，里面对参数做剪裁处理，拿到入参并给予
// 不同入参的处理逻辑
function main(argv) {
    if (!argv || !argv.length) {
        printHelp(1)
    }

    const getArg = function () {
        let args = argv.shift()

        args = args.split('=')
        if (args.length > 1) {
            argv.unshift(args.slice(1).join('='))
        }
        return args[0]
    }

    let arg

    while (argv.length) {
        arg = getArg()
        switch (arg) {
            case '-v':
            case '-V':
            case '--version':
                printVersion()

                break
            case '-h':
            case '-H':
            case '--help':
                printHelp()

                break
            default:
                printResult(arg)

                break
        }
    }

}

// 启动程序就开始执行主函数
main(process.argv.slice(2))

module.exports = main

/**
 * #!/usr/bin/env node
 * 加上 #! 这里是定义当前脚本的执行环境是用 Node 执行
 * 安装包以后我们希望它可以像一个二进制一样来执行
 */
