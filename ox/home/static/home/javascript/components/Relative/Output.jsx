const {useContext, useState, useEffect} = React;

function Output() {
    const {initial} = useContext(AppContext);
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prediction, setPrediction] = useState(null);
    
    useEffect(() => {
        const modelData = {
            "model_info": {
                "model_type": "Perceptron",
                "algorithm": "Binary Classification",
                "training_date": "2026-01-29 20:33:50"
            },
            "parameters": {
                "weights": [
                    0.48404605262785244,
                    0.1716216216218066
                ],
                "bias": -0.30000000000000004
            },
            "normalization": {
                "X_min": [
                    3.92,
                    70
                ],
                "X_max": [
                    10,
                    144
                ],
                "features": [
                    "CGPA",
                    "IQ"
                ]
            },
            "training_config": {
                "learning_rate": 0.1,
                "max_epochs": 10000,
                "num_samples": 300
            },
            "labels": {
                "0": "FAIL",
                "1": "PASS"
            }
        };
        
        setModel(modelData);
        setLoading(false);
    }, []);
    
    // Normalize input features
    const normalize = (value, min, max) => {
        return (value - min) / (max - min);
    };
    
    // Step function (activation function)
    const stepFunction = (value) => {
        return value >= 0 ? 1 : 0;
    };
    
    // Predict function
    const predict = () => {
        if (!model || !initial.cgpa || !initial.iq) return null;
        
        const cgpa = parseFloat(initial.cgpa);
        const iq = parseFloat(initial.iq);
        
        // Normalize inputs
        const normalizedCGPA = normalize(cgpa, model.normalization.X_min[0], model.normalization.X_max[0]);
        const normalizedIQ = normalize(iq, model.normalization.X_min[1], model.normalization.X_max[1]);
        
        // Calculate weighted sum
        const weightedSum = 
            (normalizedCGPA * model.parameters.weights[0]) +
            (normalizedIQ * model.parameters.weights[1]) +
            model.parameters.bias;
        
        // Apply step function
        const result = stepFunction(weightedSum);
        
        return {
            result: result,
            label: model.labels[result.toString()],
            weightedSum: weightedSum
        };
    };
    
    useEffect(() => {
        if (model && initial.cgpa && initial.iq) {
            const result = predict();
            setPrediction(result);
        }
    }, [model, initial.cgpa, initial.iq]);
    
    
    return (
        <div className="border-4 border-solid border-black p-4">
            <p>CGPA: {initial.cgpa}</p>
            <p>IQ: {initial.iq}</p>
            
            {loading && <p>Loading model...</p>}
            
            {prediction && (
                <div className="mt-4">
                    <p className="font-bold text-lg">
                        Prediction: {prediction.label}
                    </p>
                    <p className="text-sm text-gray-600">
                        Weighted Sum: {prediction.weightedSum.toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Result: {prediction.result}
                    </p>
                </div>
            )}
        </div>
    );
}