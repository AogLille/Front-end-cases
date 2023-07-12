const fs = require('fs')
const ts = require('typescript')

// 声明要检测的声明文件路径
const declarationFilePath = '../dist/dts/index.d.ts'

// 读取声明文件内容
let declarationContent = fs.readFileSync(declarationFilePath, 'utf8')

// 解析声明文件
const sourceFile = ts.createSourceFile(declarationFilePath, declarationContent, ts.ScriptTarget.Latest, true)

// 存储已经存在的声明
const existingDeclarations = new Set()
let newContent = []

// 遍历声明文件的语法树
function traverseNode(node) {
	if (ts.isModuleDeclaration(node) || ts.isImportDeclaration(node) || ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isInterfaceDeclaration(node)) {
		// 获取声明的名称
		const name = node.name ? node.name.text : ''
		// 检查该名称是否已经存在
		if (!existingDeclarations.has(name)) {
			// 如果不存在，则将该声明节点添加至需要渲染的语法句数组
			const start = node.getStart(sourceFile)
			const end = node.getEnd()
			newContent.push(declarationContent.substring(start, end))
			existingDeclarations.add(name)
		} else {
			// 如果存在，则直接进行下一步
			return
		}
	}
	// 遍历子节点
	ts.forEachChild(node, traverseNode)
}

// 开始遍历语法树
traverseNode(sourceFile)

// 将内容覆盖原文件
fs.writeFileSync(declarationFilePath, newContent.join('\r\n'))
