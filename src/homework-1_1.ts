console.log('typescript basic\n'.toUpperCase());

// 1. Создать функцию которая принимает число и считает факториал этого числа.
function calcFactorial(num: number): number {
    for (let i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

console.log(`1. The factorial of entered number:`, calcFactorial(5));

// 2. Создать функцию multiply, которая будет принимать любое количество чисел и возвращать их произведение: multiply(1,2,3) = 6 (1*2*3)
// Если нет ни одного аргумента, вернуть ноль: multiply() // 0
function multiply(...args: number[]): number {
    return args.length === 0 ? 0 : args.reduce((prev, next) => prev * next, 1);
}

console.log(`2. The multiplication of entered numbers:`, multiply(1, 2, 3));

// 3. Создать функцию, которая принимает строку и возвращает строку-перевертыш: reverseString(‘test’) // “tset”.
function reverseString(text: string): string {
    return text.split('').reverse().join('');
}

console.log(`3. The reversed input string:`, reverseString('I study Angular!'));

// 4.Создать интерфейс Админа.
interface Admin {
    name: string;
    email: string;
    password: string;
    type?: string;
}
