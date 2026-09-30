class First {
	hello (){
		console.log("Я метод родителя!");
		
	}
}
class Second extends First {
	hello () {
		super.hello()
		console.log('А я наследуемый метод');
		
	}
}
let obj = new Second
obj.hello()