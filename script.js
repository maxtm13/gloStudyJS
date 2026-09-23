"use strict";
const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn')
const plusButtons = document.querySelector('.screen-btn')
const otherItems = document.getElementsByClassName('other-items')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputRange = document.querySelector('.rollback  input[type=range]')
let spanRange = document.querySelector('.rollback  span.range-value')
const inputsTotal = document.getElementsByClassName('total-input')
let screens = document.querySelectorAll('.screen')
const startBtn = document.getElementById('start')

const total = document.querySelector('#total')
const fullTotal = document.querySelector('#total-full-count')
const totalOther = document.querySelector('#total-count-other')
const totalRollBack = document.querySelector('#total-count-rollback')

const appData = {
	rollback: 0,
	fullPrice: 0,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	servicesPercent: {},
	servicesNumber: {},
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	servicePercentPrice: 0,
	init: function() {
		
		appData.addTitle()
		startBtn.disabled = true;
		startBtn.addEventListener('click', appData.start)
		plusButtons.addEventListener('click', appData.addScreenBlock)
		inputRange.addEventListener('input', appData.setRange)
		appData.addEventinput()

	},
	start: function () {
		console.log('start');
		appData.fullPrice = 0
		appData.screenPrice = 0
		appData.screens = [];
		appData.servicePricesNumber = 0
		appData.addScreens()
		appData.addServices();
		appData.addPrices();
		
		// appData.getFullPrice();
		// appData.getServicePercentPrices();

		// appData.logger();
		// console.log(appData);
		appData.showResult()
		inputRange.addEventListener('input', appData.rangeChange)
	},
	addEventinput: function(){
		let screen = document.querySelectorAll('.screen')
		screen.forEach(function (screen) {
			const select = screen.querySelector('select')
			const input = screen.querySelector('input')
			select.removeEventListener('change', appData.checkScreens)
			select.addEventListener('change', appData.checkScreens)
			input.removeEventListener('change', appData.checkScreens)
			input.addEventListener('change', appData.checkScreens)
		})
	},
	showResult: function(){
		total.value = appData.screenPrice
		totalOther.value = appData.servicePricesPercent + appData.servicePricesNumber
		fullTotal.value = appData.fullPrice
		totalRollBack.value = appData.servicePercentPrice
	},
	addTitle: function () {
		document.title = title.textContent
		
	},
	setRange: function(e) {
		spanRange.textContent = e.target.value + "%"
	},
	rangeChange: function(){
		appData.addPrices()
		appData.showResult()
	},
	checkScreens: function (){
		let screen = document.querySelectorAll('.screen')
		let flag  = true
		screen.forEach( function (screen) {
			const select = screen.querySelector('select')
			const selectName = select.options[select.selectedIndex].textContent
			// console.log('selectName: ', selectName);
			
			const inputValue = screen.querySelector('input').value
			flag = flag && (selectName !='Тип экранов' && inputValue !='')
		});
		
		if (flag) {startBtn.disabled = false} else {startBtn.disabled = true}
		
	},
	addScreens:function (){
		screens = document.querySelectorAll('.screen')
		screens.forEach(function (screen, index) {
			const select = screen.querySelector('select')
			const input = screen.querySelector('input')
			const selectName = select.options[select.selectedIndex].textContent
			appData.screens.push({ 
				id: index, 
				name: selectName, 
				price: +input.value * (+select.value) })
		});
		// console.log(appData.screens);
	},
	addServices: function (){
		otherItemsPercent.forEach(function (item)	 {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')
		
			if(check.checked) {
				appData.servicesPercent[label.textContent] = +input.value
			}
		})
		otherItemsNumber.forEach(function (item) {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')

			if (check.checked) {
				appData.servicesNumber[label.textContent] = +input.value
			}
		})
	},
	addScreenBlock : function(){
		const cloneScreen = screens[0].cloneNode(true)
		screens[screens.length-1].after(cloneScreen)
		appData.addEventinput()
	},
	
	isString: function (str) {
		return /[a-zA-Zа-яА-Я]/.test(str)
	},
	addPrices: function () {
		appData.servicePricesPercent = 0
		appData.fullPrice = 0
		appData.servicePricesNumber = 0
		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + item['price']
		}, 0);
		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key]
		}
		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
		}
		appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
		// console.log('appData.fullPrice ', appData.fullPrice);
		
		let spanRangeValue = spanRange.textContent.match(/\d+/)[0]

		appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (spanRangeValue / 100)))
		// console.log('servicePercentPrice: ', appData.servicePercentPrice);
		
	},

	
	// getServicePercentPrices: function () {
	// 	let spanRangeValue =  spanRange.textContent.match(/\d+/)[0]
	// 	// console.log('spanRangeValue', spanRangeValue);

		
	// 	appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (spanRangeValue / 100)))
	// },
	
	isNumber: function (params) {
		return !isNaN(parseFloat(params)) && isFinite(params)
	},
	
	logger: function () {

		// console.log(appData.fullPrice);
		// console.log(appData.servicePercentPrice);
		// console.log(appData.screens);
		// console.log(appData)
	}
}

// ==============


// appData.start();
appData.init();