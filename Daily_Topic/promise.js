// let p1 = new Promise((resolve, reject) => resolve())
// console.log(typeof p1); //object
// setTimeout(console.log, 1000, p1)

// let p2 = new Promise((reslove, reject) => {
//   resolve()
//   reject()// 是不会起作用的
// })

// setTimeout(console.log, 0, p2) //Promise <resolved>

let p1 = new Promise((resolve, reject) => {
  resolve()
})
let p2 = Promise.resolve()
console.log(p1.PromiseState);
console.log(p2);