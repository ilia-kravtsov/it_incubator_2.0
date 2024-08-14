//примитивы
// string, number, boolean, null, undefined, symbol, BigInt

//ссылочные типы данных
// object, array, function/class,  map, set

// Способы создания объекта в Javascript

// 1. Создание объекта синтаксисом литерала объекта
const user = {} // литерал объекта
// Литерал объекта - это набор символов(печатных символов), чтение которых интерпретатором
// приводит к созданию в оперативной памяти браузера объекта.
// А вот эти скобочки {} это команда для интерпретатора, чтобы он создал объект.
// То есть литерал - это не есть объект, а один из способов дать инструкцию для создания объекта.

// 2. Создание объекта с помощью конструктора Object
let person = new Object();
person.name = 'John';
person.age = 30;
console.log(person)

// 3. C помощью функий конструкторов
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// Создание нового объекта с помощью функции конструктора
let person1 = new Person('Иван', 25);
console.log(person1)
// 4. С помощью классов
class Person_2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Создание нового объекта с использованием класса
let person2 = new Person_2('Иван', 25);
console.log(person2)

// _____________________________________________________________________________________________________________________

/*
В оперативной памяти, где хранятся объекты - создается объект,
т.е особенность ссылочного типа данных, состоит в том, что в переменную user,
будет записана ссылка на блок в оперативной памяти (на участок оперативной памяти), в которой хранится наш объект:
 */
// в переменной у нас хранится ссылка на объект
const user1 = {
  name: "Bob",
  age: 32,
  isStudent: false
}
const user2 = user1;
user2.name = 'Petr';
// доказательство ссылочного типа данных и user1 и user2 содержат в себе ссылки на один и тот же объект
// поэтому изменения в одном объекте изменят и другой объект user1 --> {} <-- user2
console.log(user1)
console.log(user1 === user2) // true
/* ___________________________________ кусочек C++
int x = 10;
int& reference = x;  // ссылка на x
reference = 30;
std::cout << x; // 30
*/


let book_1 = {name: 'book_1', pages: 73};
let book_2 = book_1;
book_2.name = 'book_2';
console.log(book_1) // { name: 'book_2', pages: 73 }
console.log(book_1 === book_2) // true
// book_1 --> {} <-- book_2

book_1 = { name: 'book_3', pages: 25 };
console.log(book_2) // {name: 'book_2', pages: 73}
// book_1 -->! {} <-- book_2
// book_1 --> {} !<-- book_2
book_2 = book_1
console.log(book_2) // {name: 'book_3', pages: 25}
// book_1 --> 0x5678 --> { name: 'book_3', pages: 25 }
// book_2 --> 0x5678 --> { name: 'book_3', pages: 25 }
/*
book_1 --> 0x1234 --> { name: 'book_1', pages: 73 }
book_2 --> 0x1234 --> { name: 'book_1', pages: 73 }

после

book_1 = { name: 'book_3', pages: 25 };

Создаётся новый объект, и ему выделяется новая область памяти, например, с адресом 0x5678.
book_1 теперь указывает на новый объект по адресу 0x5678.

book_1 --> 0x5678 --> { name: 'book_3', pages: 25 }
book_2 --> 0x1234 --> { name: 'book_2', pages: 73 }

Что происходит с "устаревшей" ссылкой
Когда вы обновляете book_1, она начинает указывать на новый адрес (например, 0x5678).
Старая ссылка (0x1234) больше не хранится в переменной book_1, но эта ссылка всё ещё существует в переменной book_2.

Таким образом:

Переменная book_1 теперь содержит новую ссылку 0x5678.
Переменная book_2 по-прежнему содержит старую ссылку 0x1234.

Сборка мусора (Garbage Collection)
Сборка мусора в JavaScript работает следующим образом:

Отслеживание ссылок: Garbage Collector (GC) отслеживает все ссылки на объекты в памяти.

Маркировка объектов: GC проходит по всем доступным ссылкам, начиная с корневых объектов
(например, глобальные переменные, объекты в стеке вызовов) и маркирует все объекты, до которых можно добраться.

Сбор неиспользуемых объектов: После маркировки GC собирает все не маркированные объекты,
так как они недоступны через ссылки и могут быть безопасно удалены.

Конкретный пример со ссылками
Когда book_1 обновляется, ссылка 0x1234 из неё просто заменяется на 0x5678.
Сама память, где хранился адрес 0x1234 (например, в регистрах или стеке), теперь содержит новый адрес 0x5678.

таким образом
Переменные book_1 и book_2 — это разные переменные.
book_1 и book_2 — это две разные переменные, но обе они содержат одну и ту же ссылку на один и тот же объект в памяти.
Обе переменные содержат одинаковый адрес, указывающий на один и тот же объект в памяти.
Если вы изменяете объект через переменную book_2, эти изменения будут видны и через book_1,
поскольку обе переменные указывают на один и тот же объект.

book_1 = { name: 'book_3', pages: 25 };
Когда вы присваиваете новый объект переменной book_1, происходит следующее:
Создаётся новый объект в памяти.
Переменная book_1 теперь содержит ссылку на новый объект.
Старая ссылка в book_1 (которая указывала на первый объект) заменяется новой ссылкой на новый объект.
и после этого схема выглядит так

book_1 --> { name: 'book_3', pages: 25 }
book_2 --> { name: 'book_2', pages: 73 }

Garbage collector part:
Объект, на который указывает book_2, не будет удалён сборщиком мусора,
потому что на него всё ещё есть ссылка (из переменной book_2).

Старая ссылка из book_1 была заменена новой ссылкой на новый объект, но старая ссылка в book_2 осталась неизменной.

В итоге, ссылки и объекты работают следующим образом:

Присваивание переменной, ссылки на объект, создаёт ещё одну ссылку на тот же объект.
Присваивание нового объекта переменной обновляет ссылку этой переменной на новый объект.
Объекты, на которые всё ещё есть ссылки, не будут удалены сборщиком мусора.
 */

// _____________________________________________________________________________________________________________________
// Функция возвращает объект
function getPerson() {
  return { name: 'Alice', age: 25 }
}

// Деструктуризация в вызывающем коде
const { name, age } = getPerson()

const person_4 = {
  name: 'Kirill',
  age: 24,
  address: {
    country: 'Poland',
    city: 'Warsaw',
  },
}

// Деструктуризация объекта, с использованием собственных имен переменных
// const { name: newName, age, car = 'Машины нет' } = person_4

// newName - новое имя переменной для свойства name
// age - используется без изменений
// car - используется с значением по умолчанию 'Машины нет', если свойство car отсутствует в объекте person

// console.log(newName, age, car)

const person_2 = { firstName: 'Jane', age: 22 }

// Переименование переменной при деструктуризации
// const { firstName: fName, age } = person_2

// Функция принимает объект в качестве аргумента
function printPersonInfo({ name, age, city }) {
  console.log(`${name}, ${age} years old, from ${city}`)
}

const person_3 = { name: 'Eva', age: 35, city: 'Paris' }

// Вызов функции с передачей объекта
printPersonInfo(person_3)

const superUser = {
  id: 10,
  name: 'Clementina DuBuque',
  username: 'Moriah.Stanton',
  email: 'Rey.Padberg@karina.biz',
  address: {
    street: 'Kattie Turnpike',
    suite: 'Suite 198',
    city: 'Lebsackbury',
    zipcode: '31428-2261',
    geo: {
      lat: '-38.2386',
      lng: '57.2232',
    },
  },
  phone: '024-648-3804',
  website: 'ambrose.net',
  company: {
    name: 'Hoeger LLC',
    catchPhrase: 'Centralized empowering task-force',
    bs: 'target end-to-end models',
  },
}

const newSuperUser = structuredClone(superUser)
newSuperUser.address.city = 'London'
console.log(newSuperUser)
const newSuperUser2 = {
  ...superUser,
  address: {
    ...superUser.address, //первый уровень вложенности
    street: 'Kattie',
    geo: { ...superUser.address.geo, lng: '60', lat: '60' }, //копируем второй уровень вложенности
  },
}
console.log('newSuperUser', newSuperUser.address.city) //London
console.log('superUser', superUser.address.city) //Lebsackbury

const superUserCopy2 = {
  ...superUser,
  address: {
    ...superUser.address,
    geo: { ...superUser.address.geo, lat: "38.214" },
  },
};
console.log(superUserCopy2.address.geo);
const superUserCopy3 = {
  ...superUser,
  address: {
    ...superUser.address,
    geo: { lng: "23.2344", lat: "38.214" },
  },
};
console.log(superUserCopy3.address.geo);
const superUserCopy4 = { ...superUser, email: "anotherEmail@mail.com" };
console.log(superUserCopy4.email);


