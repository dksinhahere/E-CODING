
export function maximum(props)
{
    const {data} = props
    let capacity = data[0]
    let bigger = []

    if(Array.isArray(capacity)) {
        for(let item = 0; item < capacity.length; item++) {
            // [1, 2], [3, 4], [5, 6]
            // [1, 2, 3], [4, 5, 6]

            bigger.push(find_bigger(data, item))
        }
        return bigger
    } else {
        let bg = data[0]
        for(let item=0; item<data.length; item++) {
            if(data[item] < data[0]) {
                bg = data[item]
            }
        }
        return bg
    }
}

function find_bigger(data, offset)
{
    let bigger = data[0][offset]
    for (let ele=0; ele < data.length; ele++) {
        if(data[ele][offset] > bigger) {
            bigger = data[ele][offset]
        }
    }
    return bigger
}