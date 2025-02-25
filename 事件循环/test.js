Promise.resolve().then(() => {
  console.log(1)
})
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(4)
    Promise.resolve().then(() => {
      console.log(5)
    })
  })
}, 0)
setTimeout(() => {
  console.log(3)
}, 0)