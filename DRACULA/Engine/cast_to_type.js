export function cast_to_type(props)
{
    const {data, type} = props
    
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    
    switch(type.toLowerCase()) {
        case 'number':
        case 'float':
            return data.map(item => parseFloat(item));
            
        case 'int':
        case 'integer':
            return data.map(item => parseInt(item));
            
        case 'string':
            return data.map(item => String(item));
            
        case 'boolean':
        case 'bool':
            return data.map(item => {
                if (typeof item === 'boolean') return item;
                if (typeof item === 'string') {
                    const lower = item.toLowerCase();
                    return lower === 'true' || lower === '1' || lower === 'yes';
                }
                return Boolean(item);
            });
            
        case 'date':
            return data.map(item => new Date(item));
            
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}