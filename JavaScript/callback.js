
// function show(fn) {
//     fn()
// }

// show(() => {console.log("Hello")})


// const sum = (fn1, fn2) => {
//     return fn1() + fn2()
// }

// console.log(sum(() => 4, ()=> 5))


// setTimeout(() => {
//     console.log("HELLO")
// }, 4000);

// console.log("BABA KUTESHWAR JI")
// console.log("BAB MUTESHWAR JI")



function get_name(name, callback)
{
    setTimeout(()=> {
        callback(name)
    }, 2000)
}

function hobbies(name, callback)
{
    setTimeout(()=> {
        callback(["dancing", "reading", "singing"])
    }, 1000)
}

function duration(hobbies, callback) {
    setTimeout(() => {
        callback([1, 2, 3])
    }, 500)
}

get_name("SONAM GUPTA JI", (name) => {hobbies(name, (hobby) => duration(hobby, (time) => console.log(time)))})