
import { features } from "node:process"
import {array_alloc, alloc_which, range_alloc, hydrate, sanitize,
    minimum, maximum, normalize, perceptron, load_perceptron
} from "./DRACULA/brain.js"

// let arr = array_alloc({
//     source: [1, 2, 3, 4, 5, 6, 7],
//     cluster: 1,
//     order: "C",
//     axis:2,
//     copy:true,
// })

// let arr1 = alloc_which({
//     type:1,
//     size:7,
//     cluster: 1,
//     order: "C",
//     axis: 2,
//     copy:true,
// })

// console.log(arr)
// console.log(arr1)

// let arr2 = range_alloc({
//     start:1,
//     end:-20,
//     step:3
// })

// console.log(arr2)

let dataset = hydrate({
    path: "./data/student_cgpa_iq_passfail_300.csv",
    type: "csv" // csv or json
})

let X = sanitize({
    data:dataset,
    features:["CGPA", "IQ"],
    label:null
})

let label = sanitize({
    data:dataset,
    features:null,
    label:["Result"]
})

// For column-wise min/max (min and max of each feature)
let min = minimum({data: X})
let max = maximum({data: X})


let features_normalized = normalize({
    data: X, 
    min: min, 
    max: max
})

perceptron({
    X: features_normalized,
    y: label,
    lr: 0.1, 
    epochs: 10000, 
    save: true,
    name:"perceptron",
    type:"linear_classification"
})

let model = load_perceptron({
    path: "./perceptron.json"
})

console.log("My Model ", model)