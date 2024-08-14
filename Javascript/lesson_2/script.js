const students = [
  {
    name: "Bob",
    age: 22,
    isMarried: true,
    scores: 85,
  },
  {
    name: "Alex",
    age: 21,
    isMarried: true,
    scores: 89,
  },
  {
    name: "Nick",
    age: 20,
    isMarried: false,
    scores: 120,
  },
  {
    name: "John",
    age: 19,
    isMarried: false,
    scores: 100,
  },
];

const getNames = (array) => {
  const result = new Array(); // []
  const getName = (element) => element.name;
  for (let i = 0; i < array.length; i++) {
    result[i] = getName(array[i]);
  }
  return result;
};
console.log(getNames(students));

const getScores = (array) => {
  const result = new Array(); // []
  const getResult = (element) => element.scores;
  for (let i = 0; i < array.length; i++) {
    result[i] = getResult(array[i]);
  }
  return result;
};
console.log(getScores(students));

const addScores = (array) => {
  const result = new Array(); // []
  const getResult = (element) => ({ ...element, scores: element.scores + 10 });
  for (let i = 0; i < array.length; i++) {
    result[i] = getResult(array[i]);
  }
  return result;
};
console.log(addScores(students));

const getMappedArray = (array, mapFunc) => {
  const result = new Array();
  for (let i = 0; i < array.length; i++) {
    result[i] = mapFunc(array[i]);
  }
  return result;
};
console.log(
  getMappedArray(students, (el) => ({ ...el, scores: el.scores + 10 }))
);
console.log(students.map((el) => el.name));

const getFilterArray = (array, filterFunc) => {
  let result = new Array();
  for (let i = 0; i < array.length; i++) {
    if (filterFunc(array[i])) {
      result[result.length] = array[i];
      // or push
      // result.push(array[i])
    }
  }
  return result;
};
console.log(getFilterArray(students, (el) => el.scores > 90));

const getFind = (array, findFunc) => {
  for (let i = 0; i < array.length; i++) {
    if (findFunc(array[i])) {
      return array[i];
    }
  }
};
console.log(getFind(students, (el) => el.name === "Bob"));

const selfMadePush = (array, el) => {
  array[array.length] = el;
  return array.length;
};
console.log(selfMadePush(students, { name: "tom" }));

const selfMadeIndexOf = (array, el, start = 0) => {
  for (let i = start; i < array.length; i++) {
    console.log(array[i]);
    if (array[i] === el) {
      return i;
    }
  }
  return -1;
};
console.log(selfMadeIndexOf([1, 2, 3, 4], 5));

const selfMadeIncludes = (array, el, start = 0) => {
  // const param = start || 0
  for (let i = start; i < array.length; i++) {
    console.log(array[i]);
    if (array[i] === el) {
      return true;
    }
  }
  return false;
};
console.log(selfMadeIncludes([1, 2, 3, 4], 4));

// Если в массиве 2000 элементов то нужно совершить 2000 итераций, итеративный подход, линейная зависимость

/*
O(1) — Константная сложность:

Количество операций не зависит от размера входных данных. Например, доступ к элементу массива по индексу.
Пример: arr[0], x = 5 + 3
O(n) — Линейная сложность:

Количество операций пропорционально количеству входных данных. Например, при поиске элемента в массиве перебором всех элементов.
Пример: линейный поиск в массиве.
O(log n) — Логарифмическая сложность:

Характерно для алгоритмов, которые на каждом шаге уменьшают количество обрабатываемых данных вдвое. Пример — бинарный поиск.
Пример: бинарный поиск в отсортированном массиве.
O(n^2) — Квадратичная сложность:

Количество операций растет пропорционально квадрату количества входных данных. Часто возникает при использовании вложенных циклов для обработки данных.
Пример: сортировка пузырьком (bubble sort).
O(n log n) — Линейно-логарифмическая сложность:

Характерна для многих алгоритмов сортировки, таких как быстрая сортировка (quick sort) и сортировка слиянием (merge sort).
Пример: эффективные алгоритмы сортировки.
O(2^n) — Экспоненциальная сложность:

Характерно для алгоритмов, где каждый элемент генерирует два новых элемента на каждом шаге. Пример — решение задачи о рюкзаке полным перебором.
Пример: рекурсивные решения, например, для задачи о нахождении всех подмножеств.
O(n!) — Факториальная сложность:

Обычно встречается в алгоритмах, связанных с перебором всех возможных перестановок набора элементов.
Пример: алгоритм полного перебора (brute force) для решения задачи о коммивояжере.
*/

function getLength() {
  return `Длинна массива: ${this.length}`;
}

Array.prototype.getLength = getLength;
console.log(students.getLength());
