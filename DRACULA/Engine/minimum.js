export function minimum(props)
{
    const {data} = props
    let capacity = data[0]
    let smaller = []
    
    if(Array.isArray(capacity)) {
        // Check if it's 3D array
        if(Array.isArray(capacity[0])) {
            // 3D array: recursively call minimum on each 2D slice
            for(let item = 0; item < data.length; item++) {
                smaller.push(minimum({data: data[item]}))
            }
            return smaller
        } else {
            // 2D array
            for(let item = 0; item < capacity.length; item++) {
                smaller.push(find_smallest(data, item))
            }
            return smaller
        }
    } else {
        // 1D array
        let sm = data[0]
        for(let item=1; item<data.length; item++) {
            if(data[item] < sm) {
                sm = data[item]
            }
        }
        return sm
    }
}

function find_smallest(data, offset)
{
    let smaller = data[0][offset]
    for (let ele=1; ele < data.length; ele++) {
        if(data[ele][offset] < smaller) {
            smaller = data[ele][offset]
        }
    }
    return smaller
}