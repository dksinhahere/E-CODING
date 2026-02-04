
// function Boom(i=0)
// {
//     console.log(i)
//     Boom(i+=1)
// }

// Boom()

// console.log(global === globalThis)

// setTimeout(() => {
//     console.log("SetTimeOut")
// }, 0)

// Promise.resolve().then(() => {
//     console.log("Promise")
// })

// process.nextTick(() => {
//     console.log("NextTick")
// })

// setImmediate(()=> {
//     console.log("SetImmediate")
// })


console.log("A")
setTimeout(() => {
    console.log("B")
}, 0)

Promise.resolve().then(() => {
    console.log("C")
})

process.nextTick(() => {
    console.log("D")
})

console.log("E")