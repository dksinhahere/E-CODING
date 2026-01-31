

let pro = fetch("http://www.omdbapi.com/?i=tt3896198&apikey=371f8d65")

let v = pro.then((val) => {
    return val
}).then((val) => {
    return val.json()
})

v.then((data) => {
    console.log(data)
})