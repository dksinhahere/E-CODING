import fs from 'fs'

export function load_perceptron(props)
{
    const {path = './model/perceptron_model.json'} = props
    
    try
    {
        let json_data = fs.readFileSync(path, 'utf-8')
        let model = JSON.parse(json_data)
        return model
    }
    catch(error)
    {
        console.log('Error loading model:', error.message)
        return null
    }
}