let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
let screenPrice = +prompt('Сколько будет стоить данная работа?');
console.log('screenPrice: ', screenPrice);
let rollback = 10;
let fullPrice = 250000;
let adaptive = confirm('Нужен ли адаптив на сайте?');
const serviceQuestion = "Какой дополнительный тип услуги нужен?";
const serviceCost = "Сколько это будет стоить?";
let service1 = prompt(serviceQuestion, 'Услуга 1');
let serviceCost1 = +prompt(serviceCost, '2500');
let service2 = prompt(serviceQuestion, "Услуга 2");
let serviceCost2 = +prompt(serviceCost, '4500');
fullPrice = screenPrice + serviceCost1 + serviceCost2;
console.log('fullPrice: ', fullPrice);
let moneyBack = + fullPrice * (rollback / 100)
// console.log('typeof title:', typeof title);
// console.log('typeof fullPrice: ', typeof fullPrice);
// console.log('typeof adaptive: ', typeof adaptive);
// console.log('screens length: ', screens.length);
console.log("Стоимость верстки экранов (" + screenPrice + ") рублей");
console.log("Стоимость разработки сайта (" + fullPrice + ") рублей");
console.log('screens lower case array: ', screens.toLowerCase().split(', '));
console.log('Процент отката посреднику за работу ', moneyBack);

let servicePercentPrice = Math.ceil(fullPrice - moneyBack);
console.log("servicePercentPrice: ", servicePercentPrice);
let $log = '';
if (fullPrice <= 0) {
	$log = "Что-то пошло не так";
} else if (fullPrice < 15000) {
	$log = "Скидка не предусмотрена";
} else if (fullPrice < 30000) {
	$log = "Даем скидку в 5%";
} else {
	$log = "Даем скидку в 10%";
}
console.log($log);
