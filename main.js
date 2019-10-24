let camelCaseToDash = (str) => {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

let collapse = (target, duration, easing = 'linear') => {

	target.style.maxHeight = `${target.offsetHeight}px`;
	target.offsetHeight;

	const styles = {
		transition: `all ${duration}ms ${easing}`,
		maxHeight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0,
		overflow: 'hidden'
	};

	Object.assign(target.style, styles);

	window.setTimeout(() => {
		target.style.display = 'none';

		Object.keys(styles).map((prop) => {
			target.style.removeProperty(camelCaseToDash(prop));
		});

	}, duration);

};

// ------------------
// Expand
// ------------------

let expand = (target, duration, easing = 'linear') => {

	target.style.removeProperty('display');
	target.style.display = window.getComputedStyle(target).display ? 'block' : 'none';

	let height = target.offsetHeight;

	const styles = {
		maxHeight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0,
		overflow: 'hidden',
	};

	Object.assign(target.style, styles);

	target.offsetHeight;
	target.style.maxHeight = `${height}px`;
	target.style.transition = `all ${duration}ms ${easing}`;

	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');

	window.setTimeout( () => {
		target.style.removeProperty('transition');
		target.style.removeProperty('max-height');
		target.style.removeProperty('overflow');
	}, duration);

};

// ---------------------
// Toggle
// ---------------------

let toggle = (target, duration, easing) => {
	if (window.getComputedStyle(target).display === 'none') {
		return expand(target, duration, easing);
	} else {
		return collapse(target, duration, easing);
	}
}

// --------------------
// Collapse it!
// --------------------
let vCollapse = (duration, easing) => {
	document.addEventListener('click', (e) => {

		if ( e.target.matches('.collapseToggle') ) {
			let collapseTarget = document.querySelector(e.target.dataset.collapse);
			return toggle(collapseTarget, duration, easing);
		}

		const collapseContent = Array.from(document.querySelectorAll('.collapseContent'));
		if ( e.target.matches('.expandAll') ) {
			collapseContent.map(target => {
				if (window.getComputedStyle(target).display === 'none') {
					expand(target, duration, easing);
				}
			});
		}

		if ( e.target.matches('.collapseAll') ) {
			collapseContent.map( target => {
				collapse(target, duration, easing);
			});
		}

	}, false);
}

vCollapse(150, 'ease');
