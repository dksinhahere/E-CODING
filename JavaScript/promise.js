
// let obj = new Promise((resolve, reject) => {
//     reject(true)
// })

// obj.then((resolve) => {
//     console.log(resolve)
// }, (error) => {
//     console.log(error)
// })


const greeting= () => {
    return "Hello, buddy"
}

let name = async () => {
    await setTimeout(() => {
        console.log("HELLO 2")
    }, 2000)

    console.log(await greeting())
}

console.log("1")
name()
console.log("3")