
export function minimum(props)
{
    const {data} = props
    let capacity = data[0]
    let smaller = []

    if(Array.isArray(capacity)) {
        for(let item = 0; item < capacity.length; item++) {
            // [1, 2], [3, 4], [5, 6]
            // [1, 2, 3], [4, 5, 6]

            smaller.push(find_smallest(data, item))
        }
        return smaller
    } else {
        let sm = data[0]
        for(let item=0; item<data.length; item++) {
            if(data[item] < data[0]) {
                sm = data[item]
            }
        }
        return sm
    }
}

function find_smallest(data, offset)
{
    let smaller = data[0][offset]
    for (let ele=0; ele < data.length; ele++) {
        if(data[ele][offset] < smaller) {
            smaller = data[ele][offset]
        }
    }
    return smaller
}