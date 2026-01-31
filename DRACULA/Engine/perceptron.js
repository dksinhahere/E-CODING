import fs from 'fs'

export function perceptron(props)
{
    const {X, y, lr = 0.1, epochs = 10000, save = false, name="sample", type} = props
    
    if(type == "linear_classification")
    {
        let features = X
        let sample = y
        
        let weight = []
        for(let i=0; i < features[0].length; i++)
        {
            weight.push(0.0)
        }
        let bias = 0.0
        
        for(let epoch=0; epoch < epochs; epoch++)
        {
            let errors = 0
            for(let i=0; i < features.length; i++)
            {
                let x_i = features[i]
                let y_i = sample[i]
                
                let net_input = dot(x_i, weight) + bias
                
                let y_pred = net_input >= 0 ? 1 : 0
                let error = y_i - y_pred
                
                if(error !== 0)
                {
                    errors += 1
                    for(let j=0; j < weight.length; j++)
                    {
                        weight[j] = weight[j] + (lr * error * x_i[j])
                    }
                    bias = bias + (lr * error)
                }
            }
            
            if(errors === 0)
            {
                console.log(`Converged at epoch ${epoch}`)
                break
            }
        }
        
        let model = {weight, bias}
        
        if(save)
        {
            let json_data = JSON.stringify(model, null, 2)
            fs.writeFileSync(`${name}.json`, json_data, 'utf-8')
        }
        
        return model
    }
}

function dot(x, w)
{
    let sum = 0
    for(let i=0; i < x.length; i++)
    {
        sum += x[i] * w[i]
    }
    return sum
}