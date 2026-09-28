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
	`
	element.innerText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae vel accusamus vitae, velit maiores qui.'	
	document.body.appendChild(element)
}

let element1 = new DomElement('.wrapper', '100px', '200px' , 'red', '16px');
let element2 = new DomElement('#article', '150px', '300px', 'aqua', '10px');
console.log('element1', element1);
console.log('element2', element2);
element1.create()
element2.create()