// Лексическое окружение. Задачи
// Задача № 1
getBigName(userName);

function getBigName(name) {
    name = name + "";
    return name.toUpperCase();
}

var userName = 'Ivan';

// Результатом данного кода будет 'UNDEFINED'. Фуркция обращается к переменной до присваивания ей значения.
// Переменная созданная через var всплывет в виде var userName; или var userName = undefined; Это значение преедатся в функцию превратится в 'undefined' и приведется в верхний регистр.

// Задача № 2
function test() {
    var name = 'Vasily';
    return getBigName(userName)
}

function getBigName(name) {
    name = name + '';
    return name.toUpperCase();
}

var userName = 'Ivan';
test();

// Результат будет 'IVAN'. При вызове функции test она вернет функцию getBigName c параметром userName. Так как функция test вызвана после присваивание в переменную userName значения то в итоге получим 'IVAN'
// Если вызвать функцию test до присваивания в переменную userName значения то получим 'UNDEFINED'. Переменная name в данном случае никак не используется.

// Задача № 3
var food = 'cucumber';
(function(){
    var food = 'bread';
    getFood();
})();

function getFood(){
    console.log(food);
}

// Результат будет 'cucumber' (если отдельно запустить getFood то 'cucumber' - результат консоль лога и undefined так как функция ничего не возвращает).
// Функция getFood создана в лексическом окружении window как и food = 'cucumber' по-этому в консоль лог попадет значение 'cucumber', food = 'bread' находится в другом лексическом окружении, на укровень ниже

// Замыкание. Задачи
// Задача № 1
var dollar,
    getDollar;

(function(){
    var dollar = 0;
    getDollar = function () {
        return dollar;
    }
}());

dollar = 30;
getDollar(); // 0
// Результатом вызова функции getDollar будет 0, так как внутри функции нет переменной dollar и она обращается в окружение на уровень выше там существует dollar = 0, dollar = 30 в окружении еще на уровень выше так что он не используется

// Задача № 2
var greet = 'Hello';
(function () {
    var text = 'World';
    console.log(greet + text);
}());
// console.log(greet + text);
// первый консольлог выведет "HelloWorld". greet функция возьмет из окружения на уровень выше text есть в ее собственном окружении.
// второй консольлог выдаст ошибку так как в этом окружении не существует переменной text

// Задача № 3
function minus(number) {
    return function (anotherNumber) {
        if (isNaN(anotherNumber)) anotherNumber = 0;
        if (isNaN(number)) return anotherNumber;
        return number - anotherNumber;
    }
}

// Задача № 4
function multiplyMaker(number) {
    if (isNaN(number)) return new Error ('give me a number');
    return function (secondNumber) {
        if (isNaN(secondNumber)) return new Error ('give me a number');
        return number *=secondNumber;
    }
}

const multiply = multiplyMaker(2);

// Задача № 5
const str = (function () {
    let string;

    function setString(text) {
        if (!text) {
            string = '';
        } else if (typeof text === "number") {
            string = text + "";
        } else {
            string = text;
        }
    }

    function getString() {
        return string;
    }

    function getStringLength() {
        return string.length;
    }

    function getReversedString() {
        return string.split('').reverse().join('');
    }

    return {
        setString: setString,
        getString: getString,
        getStringLength: getStringLength,
        getReversedString: getReversedString
    };
}());

// Задача № 6

const calc = (function () {
    let startNumber;
    
    function setNumber(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        if (Number(number)) {
            number = +number;
        }
        startNumber = number;
        return this;
    }

    function plus(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        if (Number(number)) {
            number = +number;
        }
        startNumber += number;
        return this;
    }

    function minus(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        startNumber -= number;
        return this;
    }

    function divide(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        if (number === 0) return new Error ("Can't do that");
        startNumber /= number;
        return this;
    }
    
    function myltiply(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        startNumber *= number;
        return this;
    }
    
    function elevate(number) {
        if (isNaN(number)) return new Error ('We work only with numbers');
        startNumber = Math.pow(startNumber, number);
        return this;
    }

    function getNumber() {
        if (startNumber % 1 === 0) {
            return startNumber;
        } else {
            return Number(startNumber.toFixed(2));
        }
    }

    return {
        setNumber: setNumber,
        plus: plus,
        myltiply,
        getNumber,
        divide,
        minus,
        elevate
    };
}());
