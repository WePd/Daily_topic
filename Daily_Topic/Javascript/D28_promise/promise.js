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

//! promise.all
// const promise1 = Promise.resolve(3)
// const promise2 = 12
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2000, 'lqy')
//   setTimeout(reject, 2000, 'lqy')
// })

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values); //[ 3, 12, 'lqy' ]
// })

// const promise1 = Promise.all([])
// console.log(promise1); //Promise {<fulfilled>: Array(0)}
// const promise2 = Promise.all(1, 2, 3, 4) //要传入可迭代对象
// console.log(promise2);
// const promise3 = Promise.all([1, 2, 3, 4, 5])
// console.log(promise3); //{


//! promise.resolve()
// const promise1 = Promise.resolve(22)
// const promise2 = Promise.resolve(promise1) //参数是一个promise对象，则直接返回这个对象
// promise2.then((value) => {
//   console.log(value); // 22
// })
// console.log(promise1 === promise2); //true

//! Promise.reject()
// Promise.reject(22).then((value) => {
//   console.log(value); //Promise {<rejected>: 22}
// })

//! promise.prototype.then()
// new Promise((resolve, reject) => {
// resolve('success!!!')
//   reject(new Error('failure了'))
// }).then((value) => {
//   console.log(value); //success
// }).catch((value) => {
//   console.log(value); //Error: failure了
// })

// 链式调用
// var p2 = new Promise(function (resolve, reject) {
//   resolve(1);
// });

// p2.then(function (value) {
//   console.log(value); // 1 先输出
//   return value + 1;
// }).then(function (value) {
//   console.log(value + ' - A synchronous value works'); //2 -- A synchronous value works //最后输出
// });

// p2.then(function (value) {
//   console.log(value); // 1 第二输出
// });


