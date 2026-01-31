
export function normalize(props)
{
    const {data, min, max} = props
    let normalized = []
    for(let row=0; row < data.length; row++)
    {
        let normalized_row = []
        for(let col=0; col < data[row].length; col++)
        {
            let value = (data[row][col] - min[col]) / (max[col] - min[col])
            normalized_row.push(value)
        }
        normalized.push(normalized_row)
    }
    return normalized
}