// let obj1 = {
//   person: {
//     name: 'li',
//     age: 22,
//     job: 'Doc',
//   },
//   sports: '羽毛球'
// }

// let obj2 = Object.assign({}, obj1)
// console.log(obj2);
// obj2.person.name = 'qing'
// obj2.sports = '篮球'
// console.log(obj2);
// console.log(obj1);//{ person: { name: 'qing', age: 22, job: 'Doc' }, sports: '羽毛球' }会修改源对象

// let _ = require('lodash')
// let obj1 = {
//   person: {
//     name: 'li',
//     age: 22,
//     job: 'Doc',
//   },
//   sports: '羽毛球'
// }
// let obj2 = _.clone(obj1)
// console.log(obj2);
// console.log(obj1.person.name === obj2.person.name);

// let obj1 = {
//   person: {
//     name: 'li',
//     age: 22,
//     job: 'Doc',
//   },
//   sports: '羽毛球'
// }
// let obj2 = { ...obj1 }
// obj2.person.name = 'qing';
// obj2.sports = '羽毛球'
// console.log(obj2);//{ person: { name: 'qing', age: 22, job: 'Doc' }, sports: '羽毛球' }
// console.log(obj1);//{ person: { name: 'qing', age: 22, job: 'Doc' }, sports: '羽毛球' }

// let arr1 = ['li', 'qing', 'ying', { name: 'liqingying', sport: '羽毛球' }]
// let arr2 = arr1.concat()
// console.log(arr2);
// //修改数组中的对象是进行的浅拷贝，会修改原数组的内容
// arr2[3].name = 'wu'
// console.log(arr2);// [ 'li', 'qing', 'ying', { name: 'wu', sport: '羽毛球' } ]
// console.log(arr1);//[ 'li', 'qing', 'ying', { name: 'wu', sport: '羽毛球' } ]


let arr1 = ['li', 'qing', 'ying', { name: 'liqingying', sport: '羽毛球' }]
let arr2 = arr1.slice()
console.log(arr2);
arr2[3].name = 'wu'
console.log(arr2);
console.log(arr1);