const btn = document.getElementById('login-btn')
const distanceBetween = (p1x, p1y, p2x, p2y) => {
	const dx = p1x - p2x
	const dy = p1y - p2y
	return Math.sqrt(dx * dx + dy * dy)
}
document.addEventListener('mousemove', (e) => {
	if (document.querySelector('input[name="username"]').value && document.querySelector('input[name="password"]').value) {
		btn.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg)`
		return
	}
	const radius = Math.max(btn.offsetWidth * 1.05, btn.offsetHeight * 1.05, 100)
	const bx = btn.parentNode.offsetLeft + btn.offsetWidth / 2
	const by = btn.parentNode.offsetTop + btn.offsetHeight / 2
	console.log('btn.parentNode.offsetLeft: ' + btn.parentNode.offsetLeft + ' btn.parentNode.offsetTop: ' + btn.parentNode.offsetTop)
	console.log('bx: ' + bx + ' by: ' + by + ' radius: ' + radius + ' e.clientX: ' + e.clientX + ' e.clientY: ' + e.clientY)
	const dist = distanceBetween(e.clientX, e.clientY, bx, by) * 2
	const angle = Math.atan2(e.clientY - by, e.clientX - bx)
	const ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0)
	const oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0)
	const rx = oy / 2
	const ry = -ox / 2
	btn.style.transition = 'all 0.1s ease'
	btn.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
	btn.style.boxShadow = `0px ${Math.abs(oy)}px ${Math.abs(ox)}px rgba(0, 0, 0, 0.15)`
})
