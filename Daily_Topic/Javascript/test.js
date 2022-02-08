// function side(arr) {
//   arr[0] = arr[2]
// }
// function a(a, b, c) {
//   c = 10
//   console.log(arguments)
//   side(arguments)
//   console.log(a)
//   console.log(c)
//   console.log(arguments)
//   return a + b + c
// }
// console.log(a(1, 1, 1))

// var min = Math.min()
// max = Math.max()
// console.log(min, max)
// console.log(min < max)

// var a = 1
// ;(function a() {
//   a = 2
//   console.log(a)
// })()

// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1);
// }

// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1)
// }

// const person = { name: "yideng" }

// function sayHi(age) {
//   return `${this.name} is ${age}`
// }
// console.log(sayHi.call(person, 5))
// console.log(sayHi.bind(person, 5)())

// let a = {},
//   b = "0",
//   c = 0
// a[b] = "li"
// a[c] = "q"
// console.log(a[b])
var a = 0,
  b = 0
function A(a) {
  A = function (b) {
    alert(a + b++)
  }
  alert(a)
}

A(1)
A(2)
