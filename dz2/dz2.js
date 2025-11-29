document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.js-slider');
	const img = document.querySelector('.js-slider-image');
	const valueEl = document.querySelector('.js-slider-value');

	function valueToScale(v) {
		const min = 1;
		const max = 100;
		const minScale = 0.5;
		const maxScale = 1.5;
		return minScale + ((v - min) / (max - min)) * (maxScale - minScale);
	}

	function applyScale(v) {
		const scale = valueToScale(Number(v));
		img.style.transform = `scale(${scale})`;
		valueEl.textContent = v;
	}

	const debouncedApply = _.debounce(applyScale, 100);

	slider.addEventListener('input', event => {
		const v = event.target.value;
		valueEl.textContent = v;
		debouncedApply(v);
	});

	applyScale(slider.value);

	const boxWrap = document.querySelector('.js-box-wrap');
	const box = document.querySelector('.js-box');

	function moveBoxTo(clientX, clientY) {
		const rect = boxWrap.getBoundingClientRect();
		let x = clientX - rect.left;
		let y = clientY - rect.top;

		const boxW = box.offsetWidth;
		const boxH = box.offsetHeight;
		x = Math.max(0, Math.min(rect.width - boxW, x - boxW / 2));
		y = Math.max(0, Math.min(rect.height - boxH, y - boxH / 2));

		box.style.transform = `translate(${x}px, ${y}px)`;
	}

	const debouncedMove = _.debounce(e => moveBoxTo(e.clientX, e.clientY), 100);

	boxWrap.addEventListener('mousemove', debouncedMove);

	boxWrap.addEventListener('touchmove', _.debounce(e => {
		if (e.touches && e.touches[0]) {
			const t = e.touches[0];
			moveBoxTo(t.clientX, t.clientY);
		}
	}, 100), { passive: true });
});
