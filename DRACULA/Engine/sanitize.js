export function sanitize(props)
{
    const {data, features, label} = props
    let array = []
    if(features !== null)
    {
        for (let feature=0; feature < features.length; feature++)
        {
            let tmp = []
            for(let element=0; element < data.length; element++)
            {
                tmp.push(data[element][features[feature]])
            }
            array.push(tmp)
        }
        let bundle = []
        for(let element=0; element < array[0].length; element++)
        {
            let temp = []
            for(let feature=0; feature < array.length; feature++)
            {
                temp.push(array[feature][element])
            }
            bundle.push(temp)
        }
        return bundle
    }
    else if(label !== null)
    {
        let lbl = []
        for(let element=0; element < data.length; element++)
        {
            lbl.push(data[element][label])
        }
        return lbl
    }
}