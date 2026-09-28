const DomElement = function (selector, height, width, bg, fontSize) {
	this.selector = selector
	this.height = height
	this.width = width
	this.bg = bg
	this.fontSize = fontSize
}

DomElement.prototype.create = function() {
	let element
	if (this.selector[0] === '.') {
		 element = document.createElement('div')
		element.classList.add(this.selector.slice(1))
		document.querySelector('body').append(element)
	}
	if (this.selector[0] === '#') {
		 element = document.createElement('p')
		element.setAttribute('id', this.selector.slice(1))
		document.querySelector('body').append(element)
	}
	element.style.cssText = `
	height : ${this.height};
	width : ${this.width};
	background : ${this.bg};
	font-size: ${this.fontSize};
	position: absolute;
	`
	element.innerText = 'Lorem ipsum dolor, maiores qui.'	
	document.body.appendChild(element)
}
let element1 = new DomElement('.wrapper', '100px', '100px' , 'red', '16px');
element1.create()
document.addEventListener("DOMContentLoaded", function(){
	console.log('loaded');
	const square = document.querySelector('.wrapper')
	document.addEventListener('keydown', (event) => {
		// console.log(event);
		switch (event.key) {
			case 'ArrowUp':
				square.style.top = +square.style.top.match(/\d+/) - 10 + 'px'
				break;
			case 'ArrowDown':
				square.style.top = +square.style.top.match(/\d+/) + 10 + 'px'
				break;
			case 'ArrowLeft':
				square.style.left = +square.style.left.match(/\d+/) - 10 + 'px'
				break;
			case 'ArrowRight':
				square.style.left = +square.style.left.match(/\d+/) + 10 + 'px'
				break;
			default:
				break;
		}
	})
})