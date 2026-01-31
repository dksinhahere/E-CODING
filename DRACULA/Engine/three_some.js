export function mean(props)
{
    const {data} = props
    let sum = 0
    for(let i=0; i<data.length; i++) {
        sum += data[i]
    }
    sum = sum / data.length
    return sum  // Added return statement
}

export function median(props)
{
    const {data} = props
    // Sort the data in ascending order
    const sorted = [...data].sort((a, b) => a - b)
    const length = sorted.length
    
    // If odd length, return middle element
    // If even length, return average of two middle elements
    if (length % 2 === 0) {
        return (sorted[length / 2 - 1] + sorted[length / 2]) / 2
    } else {
        return sorted[Math.floor(length / 2)]
    }
}

export function mode(props)
{
    const {data} = props
    const frequency = {}
    let maxFreq = 0
    let modes = []
    
    // Count frequency of each value
    for(let i = 0; i < data.length; i++) {
        const value = data[i]
        frequency[value] = (frequency[value] || 0) + 1
        
        if(frequency[value] > maxFreq) {
            maxFreq = frequency[value]
        }
    }
    
    // Find all values with maximum frequency
    for(let value in frequency) {
        if(frequency[value] === maxFreq) {
            modes.push(Number(value))
        }
    }
    
    // Return single mode or array of modes
    return modes.length === 1 ? modes[0] : modes
}