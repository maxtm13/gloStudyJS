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
const screenCount = document.querySelector('#total-count')
const resetBtn = document.getElementById('reset')
const cmsOpen = document.getElementById('cms-open')
const cmVariants = document.querySelector('.hidden-cms-variants')
const cmsSelect = cmVariants.querySelector('select')
const otherCmsPercentValue = document.getElementById('cms-other-input')
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
	screenCount: 0,
	cmsValue: 0,
	cmsPricePercent: 0,
	init: function () {

		this.addTitle()
		startBtn.disabled = true;
		startBtn.addEventListener('click', this.start.bind(this))
		plusButtons.addEventListener('click', this.addScreenBlock.bind(this))
		inputRange.addEventListener('input', this.setRange)
		this.addEventinput()
		resetBtn.addEventListener('click', this.reset.bind(this))
		cmsOpen.addEventListener('change', this.cmsOpenChange)
		cmsSelect.addEventListener('change', this.cmsSelectChange)
		otherCmsPercentValue.addEventListener('input', this.otherCmsPercentValueInput)
	},
	start: function () {
		// console.log('start');
		this.fullPrice = 0
		this.screenPrice = 0
		this.screens = [];
		this.servicePricesNumber = 0
		this.addScreens()
		this.addServices();
		this.addPrices();

		this.showResult()
		inputRange.addEventListener('input', this.rangeChange.bind(this))
		
		startBtn.disabled = true
		screens.forEach(element => {
			element.querySelector('select').disabled = true
			element.querySelector('input[type=text]').disabled = true
		});
		startBtn.style.display = 'none'
		resetBtn.style.display = 'flex'
		document.querySelector('.main-controls__views.cms').querySelectorAll('input').forEach(element => {
			element.disabled= true
		});
		document.querySelector('.main-controls__views.cms select').disabled = true
	},
	reset: () => {
		screens.forEach((element, index) => {
			if (index > 0) {
				element.remove()
				return
			}
			element.querySelector('select').disabled = false
			element.querySelector('select').options.selectedIndex = 0
			element.querySelector('input[type=text]').disabled = false
			element.querySelector('input[type=text]').value = ''
		});
		for (let element of otherItems) {
			element.querySelector('input[type="checkbox"]').checked = false
		}
		resetBtn.style.display = 'none'
		startBtn.style.display = 'flex'
		startBtn.disabled = true;
		inputRange.value = '0'
		inputRange.dispatchEvent(new Event('input'))
		for (let element of inputsTotal) {
			element.value = '0'
		}
		cmsOpen.checked = false
		cmsOpen.dispatchEvent(new Event('change'))
		document.querySelector('.main-controls__views.cms').querySelectorAll('input').forEach(element => {
			element.disabled = false
		});
		document.querySelector('.main-controls__views.cms select').disabled = false
	},
	addEventinput: function () {
		let screen = document.querySelectorAll('.screen')
		screen.forEach((screen) => {
			const select = screen.querySelector('select')
			const input = screen.querySelector('input')
			select.removeEventListener('change', this.checkScreens)
			select.addEventListener('change', this.checkScreens)
			input.removeEventListener('change', this.checkScreens)
			input.addEventListener('change', this.checkScreens)
		})
	},
	showResult: function () {
		total.value = this.screenPrice
		totalOther.value = this.servicePricesPercent + this.servicePricesNumber
		fullTotal.value = this.fullPrice
		totalRollBack.value = this.servicePercentPrice
		screenCount.value = this.screenCount
	},

	addTitle: function () {
		document.title = title.textContent
	},
	setRange: function (e) {
		spanRange.textContent = e.target.value + "%"
	},
	rangeChange: function () {
		this.addPrices()
		this.showResult()
	},
	cmsOpenChange : function(){
		if (this.checked) { cmVariants.style.display = 'flex' } 
		else {
			cmVariants.style.display = 'none'
			cmsSelect.options.selectedIndex = 0;
			cmsSelect.dispatchEvent(new Event('change'))
			appData.cmsPricePercent = false
		}
	}, 
	cmsSelectChange: function (params) {
		let cmsValue  = this.options[this.options.selectedIndex].value || false
		appData.cmsValue = cmsValue;
		if (cmsValue === '50') {
			appData.cmsPricePercent = cmsValue
			cmVariants.querySelector('.main-controls__input').style.display = 'none'
		}  else if (cmsValue === 'other') {
			cmVariants.querySelector('.main-controls__input').style.display= 'block'
			appData.cmsPricePercent = cmsValue
			return
		} 
		otherCmsPercentValue.value =''
		appData.cmsPricePercent = cmsValue
		cmVariants.querySelector('.main-controls__input').style.display = 'none'
	},
	otherCmsPercentValueInput :function () {
		appData.cmsPricePercent = this.value
	},
	checkScreens: function () {
		let screen = document.querySelectorAll('.screen')
		let flag = true
		screen.forEach((screen) => {
			const select = screen.querySelector('select')
			const selectName = select.options[select.selectedIndex].textContent
			// console.log('selectName: ', selectName);

			const inputValue = screen.querySelector('input').value
			flag = flag && (selectName != 'Тип экранов' && inputValue != '')
		});
		if (flag) { startBtn.disabled = false } else { startBtn.disabled = true }
	},
	addScreens: function () {
		screens = document.querySelectorAll('.screen')
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select')
			const input = screen.querySelector('input')
			const selectName = select.options[select.selectedIndex].textContent
			this.screens.push({
				id: index,
				name: selectName,
				price: +input.value * (+select.value),
				count: +input.value
			})
		});
	},
	addServices: function () {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')

			if (check.checked) {
				this.servicesPercent[label.textContent] = +input.value
			}
		})
		otherItemsNumber.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')

			if (check.checked) {
				this.servicesNumber[label.textContent] = +input.value
			}
		})
	},
	addScreenBlock: function () {
		screens = document.querySelectorAll('.screen')
		const cloneScreen = screens[0].cloneNode(true)
		cloneScreen.querySelector('input').value = ''

		screens[screens.length - 1].after(cloneScreen)
		this.addEventinput()
	},

	isString: function (str) {
		return /[a-zA-Zа-яА-Я]/.test(str)
	},
	addPrices: function () {
		this.servicePricesPercent = 0
		this.fullPrice = 0
		this.servicePricesNumber = 0
		this.screenCount = 0
		this.screenPrice = this.screens.reduce((sum, item) => {
			return sum + item['price']
		}, 0);
		this.screenCount = this.screens.reduce((sum, item) => {
			return sum + item['count']
		}, 0);
		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key]
		}
		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
		}
		this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
		if (this.cmsPricePercent) {
			this.fullPrice += this.fullPrice * this.cmsPricePercent / 100
		}
		let spanRangeValue = spanRange.textContent.match(/\d+/)[0]

		this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (spanRangeValue / 100)))

	},

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