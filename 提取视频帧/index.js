let vdo = document.querySelector('input[type=file]')

vdo.onchange = async (e) => {
	let file = e.target.files[0]
	//获取指定时间的帧数据
	const frame = await caputreFrame(file, 0)
	console.log(frame) //eg: {blob: Blob, url: "blob:http://localhost:8080/1b5b7b1a-5b1e-4b5a-8e1a-2b5b9b1b5b7b"}
	createPreviewFrame(frame)
}
/**
 * 根据得到的帧数据创建预览,并插入到body中
 * @param {*} frame
 */
function createPreviewFrame(frame) {
	const img = document.createElement('img')
	img.src = frame.url
	document.body.appendChild(img)
}
/**
 * 获取某个视频的帧数据
 * @param {*} video
 * @param {*} time
 * @returns
 */
function caputreFrame(video, time = 0) {
	return new Promise((resolve) => {
		const vdo = document.createElement('video')
		//将视频文件转换为blob地址
		vdo.src = URL.createObjectURL(video)
		//设置视频当前播放时间
		vdo.currentTime = time
		//设置视频静音（有些浏览器不设置静音无法进行自动播放）
		vdo.muted = true
		vdo.autoplay = true
		vdo.oncanplay = async () => {
			//根据当前video获取帧数据
			const frame = await drawViedo(vdo)
			resolve(frame)
		}
	})
}

/**
 * 将video转换为canvas，再将canvas转换为帧数据---包含blob和url
 * @param {*} video
 * @returns
 */
function drawViedo(video) {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas')
		canvas.width = video.videoWidth
		canvas.height = video.videoHeight
		const ctx = canvas.getContext('2d')
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
		canvas.toBlob((blob) => {
			resolve({
				blob,
				url: URL.createObjectURL(blob),
			})
		})
	})
}
