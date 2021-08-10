class Confetti {
	constructor(id) {
		let canvas = this.canvas = document.createElement('canvas'),
			elm = document.getElementById(id);
		if (elm == null)
			return;
		this.ctx = canvas.getContext('2d');
		this.n = 75;
		this.power = 25;
		this.size = 1;
		this.particles = [];
		this.prev = Date.now();
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.position = 'fixed';
		canvas.style.top = 0;
		canvas.style.left = 0;
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';
		canvas.style.margin = 0;
		canvas.style.padding = 0;
		canvas.style.zIndex = 999999999;
		canvas.style.pointerEvents = 'none';
		document.body.appendChild(canvas);
		elm.addEventListener('click', e => {for (let i = 0; i < this.n; i++) this.particles.push(this.createElement(e.clientX, e.clientY))});
		window.addEventListener('resize', () => ((canvas.width = window.innerWidth), (canvas.height = window.innerHeight)));
		requestAnimationFrame(this.renderBind = this.render.bind(this));
	}
	randomVelocity() {
    let x = Math.random() - 0.5,
      y = Math.random() - 0.7,
			l = Math.sqrt(x * x + y * y);
		return { x: (x / l) * (Math.random() * this.power), y: (y / l) * (Math.random() * this.power) };
  }
	createElement(x, y) {
    let w = (16 * Math.random() + 4) * this.size,
      h = (4 * Math.random() + 4) * this.size;
    return {
      pos: { x: x - w / 2, y: y - h / 2 },
      vel: this.randomVelocity(),
      size: { x: w, y: h },
      rotation: 360 * Math.random(),
      rotation_speed: 10 * (Math.random() - 0.5),
      hue: 360 * Math.random(),
      opacity: 100,
      lifetime: Math.random() + 0.25,
    };
	}
	render(timestamp) {
		let deltatime = (timestamp - this.prev) / 1e3;
		this.prev = timestamp;
		for (let i = this.particles.length - 1; i >= 0; i--) {
			let elm = this.particles[i];
			elm.vel.y += elm.size.y / this.size * deltatime;
			elm.vel.x += 25 * (Math.random() - 0.5) * deltatime;
			elm.vel.x *= 0.98;
			elm.vel.y *= 0.98;
			elm.pos.x += elm.vel.x;
			elm.pos.y += elm.vel.y;
			elm.rotation += elm.rotation_speed;
			(elm.opacity -= elm.lifetime) <= 0 && this.particles.splice(i, 1);
		}
		this.ctx.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight);
		for (let elm of this.particles)
			this.ctx.save(),
			this.ctx.beginPath(),
			this.ctx.translate(elm.pos.x + elm.size.x / 2, elm.pos.y + elm.size.y / 2),
			this.ctx.rotate((elm.rotation * Math.PI) / 180),
			this.ctx.rect(-elm.size.x / 2, -elm.size.y / 2, elm.size.y, elm.size.y),
			(this.ctx.fillStyle = `hsla(${elm.hue}deg, 90%, 65%, ${elm.opacity}%)`),
			this.ctx.fill(),
			this.ctx.restore();
    requestAnimationFrame(this.renderBind);
	}
	setCount(v) {
		this.n = v;
	}
	setPower(v) {
		this.power = v;
	}
	setSize(v) {
		this.size = v;
	}
}