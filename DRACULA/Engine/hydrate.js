import * as fs from 'fs';

/**
 * Load and parse dataset from file
 * @param {Object} props - Configuration object
 * @param {string} props.path - Path to the dataset file
 * @param {string} props.type - File type: "csv" or "json"
 * @returns {Array|Object} Parsed dataset
 */
export function hydrate(props) {
    const { path, type } = props;
    
    // Validation
    if (!path) {
        throw new Error("Path is required");
    }
    
    if (!type) {
        throw new Error("Type is required (csv or json)");
    }
    
    if (!fs.existsSync(path)) {
        throw new Error(`File not found: ${path}`);
    }
    
    // Read file content
    const content = fs.readFileSync(path, 'utf-8');
    
    // Parse based on type
    if (type === "csv") {
        return parseCSV(content);
    } else if (type === "json") {
        return JSON.parse(content);
    } else {
        throw new Error(`Unsupported type: ${type}. Use "csv" or "json"`);
    }
}

/**
 * Parse CSV content to array of objects
 */
function parseCSV(content) {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) {
        return [];
    }
    
    // Parse header
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Parse data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        
        headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            
            // Auto-parse numbers
            const num = Number(value);
            if (!isNaN(num) && value !== '') {
                value = num;
            }
            
            row[header] = value;
        });
        
        data.push(row);
    }
    
    return data;
}