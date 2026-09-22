"use strict";


const appData = {
	rollback: 10,
	fullPrice: 0,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	services: {},
	allServicePrices: 0,
	servicePercentPrice: 0,
	asking: function () {
		do {
			// debugger
			appData.title = prompt('Как называется ваш проект?');
		} while (!appData.isString(appData.title)) {

		}
		for (let i = 0; i < 2; i++) {
			let name
			do {
				name = prompt('Какие типы экранов нужно разработать?',);
			} while (!appData.isString(name));
			let price = 0;
			do {
				price = prompt('Сколько будет стоить данная работа?');
			} while (!appData.isNumber(price) || price <= 0);
			appData.screens.push({ id: i, name: name, price: +price })
		}

		for (let i = 0; i < 2; i++) {
			let name
			do {
				name = prompt("Какой дополнительный тип услуги нужен?")
			} while (!appData.isString(name));
			let price = 0
			do {
				price = prompt("Сколько это будет стоить?", '2500');
			} while (!appData.isNumber(price) || price <= 0);
			name = typeof appData.services[name] !== 'undefined' ? name + '-' + i : name;
			appData.services[name] = +price;
		}
		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
		// appData.screens = 

	},
	isString: function (str) {
		return /[a-zA-Zа-яА-Я]/.test(str)
	},
	addPrices: function () {
		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + item['price']
		}, 0);
		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key]
		}
	},
	getFullPrice: function () {
		appData.fullPrice = appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function (str) {
		str = appData.title.toLowerCase();
		let loop = false;
		let arStr = str.split('');
		for (let index = 0; index < arStr.length; index++) {
			if (arStr[index] !== ' ') {
				arStr[index] = arStr[index].toUpperCase();
				loop = true;
			}
			if (loop) break;
		}
		appData.title = arStr.join('');
	},
	getServicePercentPrices: function () {
		appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
	},
	getRollbackMessage: function (cost) {
		let $log = '';
		if (cost <= 0) {
			$log = "Что-то пошло не так";
		} else if (cost < 15000) {
			$log = "Скидка не предусмотрена";
		} else if (cost < 30000) {
			$log = "Даем скидку в 5%";
		} else {
			$log = "Даем скидку в 10%";
		}
		return $log;
	},
	isNumber: function (params) {
		return !isNaN(parseFloat(params)) && isFinite(params)
	},
	start: function () {
		appData.asking();
		appData.addPrices();
		appData.getTitle();

		appData.getFullPrice();
		appData.getServicePercentPrices();

		appData.logger();
	},
	logger: function () {

		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.screens);
		// console.log(appData)
	}
}

const title = document.getElementsByTagName('h1')[0]
console.log('title: ', title);

const buttons = document.getElementsByClassName('handler_btn')
console.log('buttons: ', buttons);

const plusButtons = document.querySelectorAll('.screen-btn')
console.log('plusButtons: ', plusButtons);

// const otherItems = document.getElementsByClassName('other-items')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
console.log('otherItemsPercent: ', otherItemsPercent);

const otherItemsNumber = document.querySelectorAll('.other-items.number')
console.log('otherItemsNumber: ', otherItemsNumber);

const inputRange = document.querySelector('.rollback  input[type=range]')
console.log('inputRange: ', inputRange);

const spanRange = document.querySelector('.rollback  span.range-value')
console.log('spanRange: ', spanRange);

const inputsTotal = document.getElementsByClassName('total-input')
let items=[]
for (let i = 0; i < inputsTotal.length; i++) {
	items.push(inputsTotal[i])
}
console.log('items of inputsTotal', items);

let screens = document.querySelectorAll('.screen')
console.log('screens', screens);


// ==============


// appData.start();