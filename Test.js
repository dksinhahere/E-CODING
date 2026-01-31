
import { features } from "node:process"
import {array_alloc, alloc_which, range_alloc, hydrate, sanitize,
    minimum, maximum, normalize, perceptron, load_perceptron,
    mean, median, mode, cast_to_type, predict

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

// let label = sanitize({
//     data:dataset,
//     features:null,
//     label:["Result"]
// })

// // For column-wise min/max (min and max of each feature)
let min = minimum({data: X})
let max = maximum({data: X})


// let features_normalized = normalize({
//     data: X, 
//     min: min, 
//     max: max
// })

// perceptron({
//     X: features_normalized,
//     y: label,
//     lr: 0.1, 
//     epochs: 10000, 
//     save: true,
//     name:"perceptron",
//     type:"linear_classification"
// })

let model = load_perceptron({
    path: "./perceptron.json"
})

let sample = [[8.0, 90]]

let norm = normalize({
    data:sample,
    min:min,
    max:max
})


let pred = predict({
    X:norm, model:model
})

console.log(pred)




// let X = [12, 11, 9, 1, 0, 9]
// let min = minimum({data: X, cluster:1})
// console.log(min)

// X = [[12, 11], [9, 1], [0, 9], [5, 4, -1]]
// min = minimum({data: X, cluster:2})
// console.log(min)

// X = [[[12, 11], [9, 1], [0, 9], [5, 4]]]
// min = minimum({data: X, cluster:2})
// console.log(min)

// X = [12, 11, 9, 1, 0, 9]
// let max = maximum({data: X})
// console.log(max)  // Expected: 12

// X = [[12, 11], [9, 1], [0, 9], [5, 4]]
// max = maximum({data: X})
// console.log(max)  // Expected: [12, 11]

// X = [[[12, 11, 3], [9, 1, 2], [0, 9, 1], [5, 4, 0]]]
// max = maximum({data: X})
// console.log(max)  // Expected: [[12, 11]]


// const data1 = [1, 2, 3, 4, 5];
// console.log('Mean:', mean({data: data1}));
// console.log('Median:', median({data: data1}));
// console.log('Mode:', mode({data: data1}));

// const data2 = [1, 2, 3, 4, 5, 6];
// console.log('Mean:', mean({data: data2}));
// console.log('Median:', median({data: data2}));
// console.log('Mode:', mode({data: data2}));

// const data3 = [1, 2, 2, 3, 3, 4, 5, 6]
// console.log("Mode: ", mode({data:data3}))

// let arr = array_alloc({
//     source: [1, 2, 3, 4, 5, 6, 7],
//     cluster: 1,
//     order: "C",
//     axis:1,
//     copy:true,
// })

// let final = cast_to_type({
//     data:arr,
//     type:"string"
// })

// console.log(final)