export function maximum(props)
{
    const {data} = props
    let capacity = data[0]
    let bigger = []
    
    if(Array.isArray(capacity)) {
        // Check if it's 3D array
        if(Array.isArray(capacity[0])) {
            // 3D array: recursively call maximum on each 2D slice
            for(let item = 0; item < data.length; item++) {
                bigger.push(maximum({data: data[item]}))
            }
            return bigger
        } else {
            // 2D array
            for(let item = 0; item < capacity.length; item++) {
                bigger.push(find_bigger(data, item))
            }
            return bigger
        }
    } else {
        // 1D array
        let bg = data[0]
        for(let item=1; item<data.length; item++) {
            if(data[item] > bg) {  // Changed from < to > and compare with bg
                bg = data[item]
            }
        }
        return bg
    }
}

function find_bigger(data, offset)
{
    let bigger = data[0][offset]
    for (let ele=1; ele < data.length; ele++) {  // Start from index 1
        if(data[ele][offset] > bigger) {
            bigger = data[ele][offset]
        }
    }
    return bigger
}