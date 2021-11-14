// function successCallback(result) {
//   console.log('success');
// }
// function failureCallback(result) {
//   console.log('failule');
// }

// createAsync(msg, successCallback, failureCallback)


// //用promise的写法
// //createAsync返回的是一个promise对象
// createAsync(msg).then(successCallback, failureCallback);



// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('lqy')
//   }, 2000)
// })
// myPromise.then((name) => {
//   console.log(name);
// })
// console.log(myPromise);
//Promise { <pending> }
// lqy

//promise.all

// const promise1 = Promise.resolve(3)
// const promise2 = 12
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2000, 'lqy')
//   setTimeout(reject, 2000, 'lqy')
// })

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values); //[ 3, 12, 'lqy' ]
// })

const promise1 = Promise.all([])
console.log(promise1); //Promise {<fulfilled>: Array(0)}
const promise2 = Promise.all(1, 2, 3, 4) //要传入可迭代对象
console.log(promise2);
const promise3 = Promise.all([1, 2, 3, 4, 5])
console.log(promise3); //{