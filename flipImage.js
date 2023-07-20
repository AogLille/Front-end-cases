// 方法---- 注意：不能在node环境下面使用，需要在浏览器环境中使用
/**
 *
 * @param {*} base64Image base64格式的图片
 * @param {*} flipHorizontal 是否进行水平镜像
 * @param {*} flipVertical 是否进行垂直镜像
 * @returns 处理过后的base64格式图片
 */
function processImage(base64Image, flipHorizontal, flipVertical) {
	return new Promise((resolve, reject) => {
		// 创建一个新的Image对象
		let img = new Image()
		img.onload = function () {
			// 创建一个canvas
			let canvas = document.createElement('canvas')
			let ctx = canvas.getContext('2d')

			// 设置canvas的宽度和高度
			canvas.width = this.width
			canvas.height = this.height

			// 根据参数决定是否进行镜像处理
			ctx.translate(flipHorizontal ? this.width : 0, flipVertical ? this.height : 0)
			ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)

			// 将图像绘制到canvas上
			ctx.drawImage(this, 0, 0)

			// 将canvas转换为base64格式的图片
			let processedImage = canvas.toDataURL()
			resolve(processedImage)
		}
		img.onerror = function () {
			reject(new Error('Failed to load image'))
		}
		img.src = base64Image
	})
}

// 使用示例
let base64Image = 'data:image/png;base64,iVBORw0KGg...' // base64格式的图片
let flipHorizontal = true // 进行水平镜像
let flipVertical = false // 不进行垂直镜像
processImage(base64Image, flipHorizontal, flipVertical)
	.then((processedImage) => {
		console.log('Processed image: ', processedImage)
	})
	.catch((error) => {
		console.error('Failed to process image: ', error)
	})
