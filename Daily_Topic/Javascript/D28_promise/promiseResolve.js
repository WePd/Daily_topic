Promise.myResolve = (value) => {
  if (value && typeof value === "object" && value instanceof Promise) {
    return value
  }
  // 其他情况
  return new Promise((resolve) => {
    resolve(value)
  })
}

const p = new Promise((_, reject) => reject(new Error()))
console.log(p)
Promise.myResolve(p).catch(console.error())
