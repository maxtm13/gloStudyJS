"use strict";

// let rollback = 10;
// let fullPrice = 250000;
// const serviceQuestion = "Какой дополнительный тип услуги нужен?";
// const serviceCost = "Сколько это будет стоить?";

// let title ;
// let screens;
// let screenPrice ;
// let adaptive ;
// let service1 ;
// let serviceCost1;
// let service2;
// let serviceCost2;
// let allServicePrices;
// let cost;
// let servicePercentPrice;
// let moneyBack;

const appData = {
	rollback : 10,
	fullPrice: 0 ,
	serviceQuestion : "Какой дополнительный тип услуги нужен?",
	serviceCost : "Сколько это будет стоить?",
	title : '' ,
	screens : '' ,
	screenPrice : 0  ,
	adaptive : true,
	service1 : '' ,
	service2 : '',
	allServicePrices : 0,
	servicePercentPrice : 0,
	moneyBack: 0,
	asking : function () {
		appData.title = prompt('Как называется ваш проект?');
		do {
			appData.screenPrice = +prompt('Сколько будет стоить данная работа?');
		} while (!appData.isNumber(appData.screenPrice) || appData.screenPrice <= 0);
		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
		appData.screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные");
	},
	getAllServicePrices : function (var1 = 0, var2 = 0) {
		let sum = 0;
		let cost;
		for (let i = 0; i < 2; i++) {
			if (i === 0) {
				appData.service1 = prompt(appData.serviceQuestion)
			} else if (i === 1) {
				appData.service2 = prompt(appData.serviceQuestion)
			}
			do {
				cost = prompt(appData.serviceCost, '2500');
			} while (!appData.isNumber(cost) || cost <= 0);
			sum += +cost;
		}
		return sum;
	},
	getFullPrice: function(var1 = 0, var2 = 0) {
		return var1 + var2;
	},
	getTitle : function (str) {
		str = str.toLowerCase();
		let loop = false;
		let arStr = str.split('');
		for (let index = 0; index < arStr.length; index++) {

			if (arStr[index] !== ' ') {
				arStr[index] = arStr[index].toUpperCase();
				loop = true;
			}
			if (loop) break;
		}

		return arStr.join('');
	},
	getServicePercentPrices : function (var1, var2) {
		return Math.ceil(var1 - var2)
	},
	getRollbackMessage : function (cost) {
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
	isNumber : function (params) {
		return !isNaN(parseFloat(params)) && isFinite(params)
	},
	start  : function() {
		appData.asking();
		appData.title = appData.getTitle(appData.title);
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
		appData.moneyBack = + appData.fullPrice * (appData.rollback / 100);
		appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.moneyBack);
		appData.logger();
	},
	logger: function() {
		for (let key in appData) {
			console.log("Ключ: " + key + ", значение: " + appData[key]);
		}
	}
}

// ==============


appData.start();





