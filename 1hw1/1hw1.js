"use strict";

// 1) Дан массив const arr = [1, 5, 7, 9] с помощью Math.min и spread оператора, 
// найти минимальное число в массиве, 
// решение задание должно состоять из одной строки

const arr = [1, 5, 7, 9];
console.log(Math.min(...arr));

// 2) Напишите функцию createCounter, которая создает счетчик и возвращает
//  объект с двумя методами: increment и decrement. Метод increment должен 
//  увеличивать значение счетчика на 1, а метод decrement должен уменьшать 
//  значение счетчика на 1. Значение счетчика должно быть доступно только 
//  через методы объекта, а не напрямую.

const createCounter = () => {
    let counter = 0;
    return {
        increment: () => ++counter,
        decrement: () => --counter,
        result: () => counter
    }
}
const calc = createCounter();
calc.increment();
calc.increment();
calc.increment();
console.log(calc.result());
calc.decrement();
console.log(calc.result());

// 3) Напишите рекурсивную функцию findElementByClass, которая принимает 
// корневой элемент дерева DOM и название класса в качестве аргументов и 
// возвращает первый найденный элемент с указанным классом в этом дереве.

const rootElement = document.getElementById('root');
const findElementByClass = (rootElement, className) => {
    for (let element of rootElement.childNodes) {
        if (element.className === className) {
            return element;
        } else {
            if (element.hasChildNodes()) {
                // не поняла, почему не работает просто 
                // return findElementByClass(element, className)
                // мог же просто вернуть элемент из строчки 40 выше..?
                const foundElement = findElementByClass(element, className);
                if (foundElement) {
                    return foundElement;
                }
            } 
        }
    }
}

const targetElement = findElementByClass(rootElement, 'my-class');
console.log(targetElement);

// в инете есть вшитый метод (ниже) - есть ли где-то код даного метода?
const targetElement2 = rootElement.getElementsByClassName('my-class')[0];
console.log(targetElement2);
