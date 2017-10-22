setTimeout(() => {
  console.log('Event B')
},1000)

setTimeout(() => {
  console.log('Event A')
  setTimeout(() => {
    console.log('Event C')
  },1000)
},500)

let resultA = callServiceA()
let resultB = callServiceB()
writeResponseData(resultA, resultB)