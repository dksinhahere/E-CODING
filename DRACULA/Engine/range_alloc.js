export function range_alloc(props) {
    let { start, end, step } = props;
    
    // Validation
    if (start === undefined || end === undefined) {
        throw new Error("Both 'start' and 'end' are required");
    }
    
    // Auto-detect step direction if not provided or if step is 1
    if (step === undefined) {
        step = start <= end ? 1 : -1;
    } else if (step === 0) {
        throw new Error("Step cannot be zero");
    }
    
    // FIX: Auto-correct step direction if it conflicts with start/end
    if (start < end && step < 0) {
        step = Math.abs(step); // Make step positive
    } else if (start > end && step > 0) {
        step = -Math.abs(step); // Make step negative
    }
    
    const result = [];
    
    // Forward range (positive step)
    if (step > 0) {
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
    } 
    // Backward range (negative step)
    else {
        for (let i = start; i > end; i += step) {
            result.push(i);
        }
    }
    
    return result;
}