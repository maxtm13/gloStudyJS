"use strict";

let rollback = 10;
let fullPrice = 250000;
const serviceQuestion = "Какой дополнительный тип услуги нужен?";
const serviceCost = "Сколько это будет стоить?";

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt(serviceQuestion, 'Услуга 1');
let serviceCost1 = +prompt(serviceCost, '2500');
let service2 = prompt(serviceQuestion, "Услуга 2");
let serviceCost2 = +prompt(serviceCost, '4500');
let allServicePrices;

// ==============

const getAllServicePrices = function (var1 = 0, var2 = 0) {
	return var1 + var2;
};
function getFullPrice(var1 = 0, var2 = 0) {
	return var1 + var2;
}
const getTitle = function (str) {
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
};
const getServicePercentPrices = function (var1, var2) {
	return var1 - var2
}
const showTypeOf = function (varName = '', variable) {
	console.log('"Переменная ' + varName + '": ', variable, ": ", typeof variable);
}
const getRollbackMessage = function (cost) {
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
}

// =========== 

console.log("getTitle: ", getTitle(title));
allServicePrices = getAllServicePrices(serviceCost1, serviceCost2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
let moneyBack = + fullPrice * (rollback / 100)
showTypeOf('title', title)
showTypeOf('fullPrice', fullPrice)
showTypeOf('adaptive', adaptive)
console.log('screens lower case array: ', screens.toLowerCase().split(', '));
let servicePercentPrice = getServicePercentPrices(fullPrice, moneyBack)
console.log(getRollbackMessage(fullPrice));
console.log("servicePercentPrice: ", servicePercentPrice);



