const textContainer = document.querySelector('.text-container')
const textElem = document.querySelector('.text')
const cursor = document.querySelector('.cursor')

/**
 * 自动追加文字
 */
async function autoAppend() {
	function delay(duration) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, duration)
		})
	}
	function transfer(text) {
		return `<p>${text}</p>`
	}
	const content = 'adshasdhakjshdlkahsdklahdkadlkjaskdjakdjlka'
	for (let i = 0; i < content.length; i++) {
		let text = content.slice(0, i)
		let result = transfer(text)
		textElem.innerHTML = result
		updateCursor() // 更新光标位置
		await delay(100)
	}
}
autoAppend()
/**
 * 获取最后一个文本节点
 * @param {*} node
 * @returns
 */
function getLastTextNode(node) {
	if (node.nodeType === Node.TEXT_NODE) {
		return node
	}
	const children = node.childNodes
	for (let i = children.length - 1; i >= 0; i--) {
		const child = children[i]
		const textNode = getLastTextNode(child)
		if (textNode) {
			return textNode
		}
	}
	return null
}
/**
 * 更新光标位置
 */
function updateCursor() {
	// 创建一个临时的文本节点，用于获取位置
	const textNode = document.createTextNode('|')
	const lastTextNode = getLastTextNode(textElem)
	if (lastTextNode) {
		lastTextNode.parentNode.appendChild(textNode)
	}
	// 获取文字位置（因为不是元素，故不能直接使用getBoundingClientRect方法）
	const range = document.createRange()
	range.setStart(textNode, 0)
	range.setEnd(textNode, 0)
	const rect = range.getBoundingClientRect()
	const containerRect = textContainer.getBoundingClientRect()
	console.log(rect, containerRect)
	cursor.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`
	textNode.remove()
}
