"use strict";

let rollback = 10;
let fullPrice = 250000;
const serviceQuestion = "Какой дополнительный тип услуги нужен?";
const serviceCost = "Сколько это будет стоить?";

let title ;
let screens;
let screenPrice ;
let adaptive ;
let service1 ;
let serviceCost1;
let service2;
let serviceCost2;
let allServicePrices;
let cost;
let servicePercentPrice;
let moneyBack;
// ==============

const isNumber = function (params) {
		return !isNaN(parseFloat(params)) && isFinite(params)
} ;

const asking = function() {
	title = prompt('Как называется ваш проект?');
	do {
		screenPrice = +prompt('Сколько будет стоить данная работа?');
	} while (!isNumber(screenPrice) || screenPrice <= 0 );
	adaptive = confirm('Нужен ли адаптив на сайте?');
	screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные");
}
const getAllServicePrices = function (var1 = 0, var2 = 0) {
	let sum = 0;
	for (let i = 0; i < 2; i++) {
		if (i === 0) {
			service1 = prompt(serviceQuestion)
		} else if ( i === 1 ) {
			service2 = prompt(serviceQuestion)
		}
		do {
			cost = prompt(serviceCost, '2500');
		} while (!isNumber(cost) || cost <= 0);
		sum += +cost;
	}
	return sum;
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
	return Math.ceil(var1 - var2)
}
const showTypeOf = function (varName = '', variable) {
	console.log('Переменная "' + varName + '" значение:', variable, ", тип переменной: ", typeof variable);
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

asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
moneyBack = + fullPrice * (rollback / 100);
servicePercentPrice = getServicePercentPrices(fullPrice, moneyBack);

showTypeOf('title', title);
showTypeOf('fullPrice', fullPrice);
showTypeOf('adaptive', adaptive);

console.log('Типы экранов для разработки: ', screens.toLowerCase().split(', '));
console.log('Скидки пользователю:', getRollbackMessage(fullPrice));
console.log("Cтоимость за вычетом процента: ", servicePercentPrice);