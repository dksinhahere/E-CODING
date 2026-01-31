export function array_alloc(props)
{
    let {source, cluster, order, axis, copy} = props
    if (source && (Array.isArray(source) || typeof source === "string")) {
        
        if(cluster !== null && cluster !== undefined)
            source = make_cluster(source, cluster);
        if(order !== null && order !== undefined && order === "F")
            source = make_order(source, cluster)
        if(axis !== null && axis !== undefined && axis > 1)
            source = increase_axis(source, axis)

        if(axis < 0) {
            throw new Error("axis size should be greater than 1 or 1");
        }
    }
    
    if(copy !== false && copy !== null && copy !== "")
    {
        return source
    } else {
        return undefined
    }
}

function increase_axis(source, axis)
{
    if (!Number.isInteger(axis) || axis < 0) {
        throw new Error("axis must be a non-negative integer");
    }

    let result = source;

    for (let i = 1; i < axis; i++) {
        result = [result];   // wrap once per axis
    }

    return result;
}

function make_order(source, size)
{
    // Check if source is a 2D array
    if (!Array.isArray(source) || !Array.isArray(source[0])) {
        return source;
    }
    
    let array = []
    const rows = source.length;
    // Find the maximum column length to handle ragged arrays
    const cols = Math.max(...source.map(row => row.length));
    
    for(let c = 0; c < cols; c++)
    {
        for(let r = 0; r < rows; r++) {
            // Only push if the element exists
            if (c < source[r].length) {
                array.push(source[r][c])
            }
        }
    }
    return make_cluster(array, size)
}

function make_cluster(source, size) {
    if (!Number.isInteger(size) || size <= 0) {
        throw new Error("cluster must be a positive integer");
    }
    
    if (size > source.length) {
        throw new Error("cluster size is greater than source length");
    }

    if (size === 1) return source;
    
    let _size_ = Math.floor(source.length / size);
    let remainder = source.length % size;
    let array = [];
    let offset_index = 0;
    
    for (let i = 0; i < size; i++) {
        // Distribute remainder elements to first groups
        let current_size = _size_ + (i < remainder ? 1 : 0);
        let tmp_cluster = source.slice(offset_index, offset_index + current_size);
        
        if (tmp_cluster.length === 0) {
            throw new Error("cannot allocate given size of cluster mismatch array length");
        }
        
        array.push(tmp_cluster);
        offset_index += current_size;
    }
    
    return array;
}