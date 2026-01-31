# DRACULA Brain.js - Complete Function Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Array Allocation Functions](#array-allocation-functions)
   - [array_alloc](#array_alloc)
   - [alloc_which](#alloc_which)
   - [range_alloc](#range_alloc)
3. [Data Processing Functions](#data-processing-functions)
   - [hydrate](#hydrate)
   - [sanitize](#sanitize)
   - [cast_to_type](#cast_to_type)
4. [Statistical Functions](#statistical-functions)
   - [minimum](#minimum)
   - [maximum](#maximum)
   - [mean](#mean)
   - [median](#median)
   - [mode](#mode)
5. [Machine Learning Functions](#machine-learning-functions)
   - [normalize](#normalize)
   - [perceptron](#perceptron)
   - [load_perceptron](#load_perceptron)
   - [predict](#predict)
6. [Examples and Use Cases](#examples-and-use-cases)
7. [Best Practices](#best-practices)

---

## Introduction

The DRACULA brain.js module is a comprehensive JavaScript library designed for data manipulation, statistical analysis, and machine learning operations. It provides a robust set of functions for working with arrays, performing statistical calculations, and building perceptron-based machine learning models.

### Key Features

- **Array Management**: Advanced array allocation and manipulation capabilities
- **Data Processing**: CSV/JSON data loading and feature extraction
- **Statistical Analysis**: Common statistical measures (mean, median, mode, min, max)
- **Machine Learning**: Perceptron implementation for linear classification
- **Data Normalization**: Feature scaling for machine learning preprocessing

### Module Philosophy

The module follows these design principles:

1. **Functional Programming**: Pure functions with minimal side effects
2. **Flexible Data Structures**: Support for 1D, 2D, and 3D arrays
3. **Machine Learning Ready**: Built-in normalization and model persistence
4. **Type Safety**: Explicit type casting and validation

---

## Array Allocation Functions

### array_alloc

#### Purpose
Creates and allocates arrays from existing data sources with flexible clustering and ordering options. This function is essential for converting raw data into structured array formats suitable for further processing.

#### Syntax

```javascript
array_alloc({
    source: Array,
    cluster: Number,
    order: String,
    axis: Number,
    copy: Boolean
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `source` | Array | Yes | - | The source array to allocate from |
| `cluster` | Number | No | 1 | Number of dimensions/clusters for the output array |
| `order` | String | No | "C" | Memory layout order: "C" (row-major) or "F" (column-major) |
| `axis` | Number | No | 1 | Axis along which to perform allocation |
| `copy` | Boolean | No | false | Whether to create a deep copy of the source data |

#### Return Value

Returns a newly allocated array based on the specified clustering and ordering parameters.

#### Business Logic

1. **Input Validation**: Validates that source is a valid array
2. **Clustering**: Organizes data into specified number of clusters/dimensions
3. **Memory Layout**: Applies C (row-major) or Fortran (column-major) ordering
4. **Axis Transformation**: Reshapes data along specified axis
5. **Copy Mechanism**: Creates deep copy if requested to prevent reference sharing

#### Example Usage

```javascript
// Simple 1D array allocation
let arr1 = array_alloc({
    source: [1, 2, 3, 4, 5, 6, 7],
    cluster: 1,
    order: "C",
    axis: 1,
    copy: true
})
// Output: [1, 2, 3, 4, 5, 6, 7]

// 2D array allocation with clustering
let arr2 = array_alloc({
    source: [1, 2, 3, 4, 5, 6],
    cluster: 2,
    order: "C",
    axis: 2,
    copy: true
})
// Output: [[1, 2, 3], [4, 5, 6]]

// Column-major ordering
let arr3 = array_alloc({
    source: [1, 2, 3, 4],
    cluster: 2,
    order: "F",
    axis: 2,
    copy: false
})
// Output: [[1, 3], [2, 4]]
```

#### Use Cases

- Converting flat arrays to multi-dimensional structures
- Preparing data for matrix operations
- Creating training batches for machine learning
- Reshaping image data for neural networks
- Memory layout optimization for performance

#### Technical Notes

- **Memory Efficiency**: Use `copy: false` when you don't need to preserve the original array
- **C vs F Order**: C-order is more cache-friendly for row-wise operations; F-order for column-wise
- **Cluster Size**: Must evenly divide the source array length
- **Performance**: O(n) time complexity where n is the array length

---

### alloc_which

#### Purpose
Allocates arrays based on type specification and size parameters, useful for initializing arrays with specific properties without providing source data.

#### Syntax

```javascript
alloc_which({
    type: Number,
    size: Number,
    cluster: Number,
    order: String,
    axis: Number,
    copy: Boolean
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | Number | Yes | - | Type identifier for allocation (0: zeros, 1: ones, 2: random, etc.) |
| `size` | Number | Yes | - | Total size of the array to allocate |
| `cluster` | Number | No | 1 | Number of dimensions for the output array |
| `order` | String | No | "C" | Memory layout order |
| `axis` | Number | No | 1 | Axis along which to organize the array |
| `copy` | Boolean | No | false | Copy flag (mainly for API consistency) |

#### Return Value

Returns a newly allocated array filled according to the type specification.

#### Business Logic

1. **Type Selection**: Determines fill pattern based on type parameter
   - Type 0: Fills with zeros
   - Type 1: Fills with ones
   - Type 2: Fills with random values
   - Type 3: Fills with sequential numbers
2. **Size Calculation**: Allocates exactly `size` elements
3. **Clustering**: Reshapes flat array into clustered structure
4. **Ordering**: Applies memory layout strategy

#### Example Usage

```javascript
// Allocate array of ones
let ones = alloc_which({
    type: 1,
    size: 5,
    cluster: 1,
    order: "C",
    axis: 1
})
// Output: [1, 1, 1, 1, 1]

// Allocate 2D array of zeros
let zeros = alloc_which({
    type: 0,
    size: 6,
    cluster: 2,
    order: "C",
    axis: 2
})
// Output: [[0, 0, 0], [0, 0, 0]]

// Allocate random values
let random = alloc_which({
    type: 2,
    size: 4,
    cluster: 1
})
// Output: [0.234, 0.891, 0.456, 0.123] (example)
```

#### Use Cases

- Initializing weight matrices for neural networks
- Creating identity matrices
- Generating random test data
- Allocating buffer arrays for computations
- Creating placeholder arrays for algorithms

#### Technical Notes

- **Type Safety**: Ensure type parameter matches documented type codes
- **Memory Allocation**: Pre-allocates memory for better performance
- **Random Seed**: Random type may not be reproducible without seed control
- **Validation**: Size must be positive integer

---

### range_alloc

#### Purpose
Creates arrays with sequential values within a specified range, similar to Python's `range()` or NumPy's `arange()`. Essential for generating index arrays, sequence data, and iteration ranges.

#### Syntax

```javascript
range_alloc({
    start: Number,
    end: Number,
    step: Number
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `start` | Number | Yes | - | Starting value of the range (inclusive) |
| `end` | Number | Yes | - | Ending value of the range (exclusive) |
| `step` | Number | No | 1 | Increment between consecutive values |

#### Return Value

Returns an array containing the sequence of values from start to end with the specified step.

#### Business Logic

1. **Range Validation**: Checks if start, end, and step values are valid
2. **Direction Detection**: Handles both ascending (positive step) and descending (negative step) ranges
3. **Sequence Generation**: Iteratively builds the array
   - For positive step: continues while current < end
   - For negative step: continues while current > end
4. **Boundary Handling**: Ensures end value is exclusive
5. **Edge Cases**: Handles empty ranges when step direction doesn't match start/end relationship

#### Example Usage

```javascript
// Basic ascending range
let arr1 = range_alloc({
    start: 1,
    end: 10,
    step: 1
})
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Range with custom step
let arr2 = range_alloc({
    start: 0,
    end: 20,
    step: 3
})
// Output: [0, 3, 6, 9, 12, 15, 18]

// Descending range
let arr3 = range_alloc({
    start: 10,
    end: 0,
    step: -2
})
// Output: [10, 8, 6, 4, 2]

// Negative start with negative step
let arr4 = range_alloc({
    start: 1,
    end: -20,
    step: -3
})
// Output: [1, -2, -5, -8, -11, -14, -17]

// Empty range (step direction mismatch)
let arr5 = range_alloc({
    start: 1,
    end: 10,
    step: -1
})
// Output: []
```

#### Use Cases

- Creating index arrays for iterations
- Generating timestamp sequences
- Creating coordinate grids
- Building test datasets with sequential values
- Generating training epochs counters
- Creating feature bins for histograms

#### Technical Notes

- **Performance**: O(n) where n = (end - start) / step
- **Precision**: May accumulate floating-point errors with decimal steps
- **Memory**: Allocates array in memory; consider generators for very large ranges
- **Validation**: Returns empty array for invalid step/range combinations
- **Type Coercion**: Automatically handles integer and floating-point values

#### Edge Cases

```javascript
// Floating point step
let float_range = range_alloc({
    start: 0,
    end: 1,
    step: 0.1
})
// Output: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

// Zero step (should be handled or throw error)
let zero_step = range_alloc({
    start: 0,
    end: 10,
    step: 0
})
// Output: Error or infinite loop (implementation dependent)

// Single value
let single = range_alloc({
    start: 5,
    end: 6,
    step: 1
})
// Output: [5]
```

---

## Data Processing Functions

### hydrate

#### Purpose
Loads and parses data from external files (CSV or JSON format) into JavaScript data structures. This is the primary data ingestion function for the DRACULA module.

#### Syntax

```javascript
hydrate({
    path: String,
    type: String
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `path` | String | Yes | - | File path to the data file (relative or absolute) |
| `type` | String | Yes | - | File format type: "csv" or "json" |

#### Return Value

Returns a parsed data structure:
- For CSV: Array of objects where each object represents a row with column names as keys
- For JSON: The parsed JSON object/array structure

#### Business Logic

1. **File Reading**: Reads file contents from the specified path
2. **Type Detection**: Determines parsing strategy based on type parameter
3. **CSV Parsing**:
   - Parses header row for column names
   - Splits each row by delimiter (comma)
   - Creates object for each row mapping column names to values
   - Handles quoted values and escaped characters
4. **JSON Parsing**:
   - Uses native JSON.parse()
   - Validates JSON structure
5. **Error Handling**: Catches file not found and parsing errors
6. **Data Validation**: Ensures data integrity after parsing

#### Example Usage

```javascript
// Load CSV data
let dataset = hydrate({
    path: "./data/student_cgpa_iq_passfail_300.csv",
    type: "csv"
})
// Output: [
//   {CGPA: "8.5", IQ: "120", Result: "Pass"},
//   {CGPA: "6.2", IQ: "95", Result: "Fail"},
//   ...
// ]

// Load JSON data
let config = hydrate({
    path: "./config/model_config.json",
    type: "json"
})
// Output: {
//   learning_rate: 0.01,
//   epochs: 1000,
//   hidden_layers: [64, 32]
// }
```

#### Use Cases

- Loading training datasets for machine learning
- Reading configuration files
- Importing pre-processed feature data
- Loading test datasets
- Reading model hyperparameters
- Batch data processing pipelines

#### Technical Notes

- **File System**: Requires file system access (Node.js environment)
- **Encoding**: Assumes UTF-8 encoding for text files
- **Memory**: Loads entire file into memory; consider streaming for large files
- **Synchronous**: Blocking operation; consider async version for production
- **CSV Format**: Standard comma-separated, first row as header
- **Error Recovery**: Should implement try-catch for robust error handling

#### Advanced Example

```javascript
// Loading and validating dataset
try {
    let dataset = hydrate({
        path: "./data/training_data.csv",
        type: "csv"
    })
    
    if (!dataset || dataset.length === 0) {
        throw new Error("Empty dataset")
    }
    
    console.log(`Loaded ${dataset.length} records`)
    console.log(`Features: ${Object.keys(dataset[0]).join(", ")}`)
} catch (error) {
    console.error("Data loading failed:", error.message)
}
```

---

### sanitize

#### Purpose
Extracts specific features or labels from a dataset, effectively performing feature selection and data preparation for machine learning tasks. This function separates input features (X) from output labels (y).

#### Syntax

```javascript
sanitize({
    data: Array,
    features: Array | null,
    label: Array | null
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | The dataset to sanitize (typically from hydrate) |
| `features` | Array\|null | No | null | Array of feature column names to extract |
| `label` | Array\|null | No | null | Array of label column names to extract |

#### Return Value

Returns an array containing only the selected features or labels:
- If `features` specified: 2D array of feature values
- If `label` specified: 2D array of label values (even for single label)
- Values are converted to appropriate numeric types

#### Business Logic

1. **Input Validation**: Ensures data is valid array of objects
2. **Feature Selection**:
   - If features provided: Extracts specified columns
   - If label provided: Extracts specified label columns
   - Exactly one of features or label must be non-null
3. **Data Extraction**:
   - Iterates through each row in dataset
   - Extracts values for specified columns
   - Maintains row structure
4. **Type Conversion**:
   - Converts string values to numbers where possible
   - Handles missing values
   - Preserves data types when appropriate
5. **Output Formatting**: Returns consistent 2D array structure

#### Example Usage

```javascript
// Sample dataset
let dataset = [
    {CGPA: "8.5", IQ: "120", Result: "Pass"},
    {CGPA: "6.2", IQ: "95", Result: "Fail"},
    {CGPA: "7.8", IQ: "110", Result: "Pass"}
]

// Extract features
let X = sanitize({
    data: dataset,
    features: ["CGPA", "IQ"],
    label: null
})
// Output: [[8.5, 120], [6.2, 95], [7.8, 110]]

// Extract label
let y = sanitize({
    data: dataset,
    features: null,
    label: ["Result"]
})
// Output: [["Pass"], ["Fail"], ["Pass"]]

// Multiple features
let features_multi = sanitize({
    data: dataset,
    features: ["CGPA", "IQ"],
    label: null
})
// Output: [[8.5, 120], [6.2, 95], [7.8, 110]]

// Single feature
let single_feature = sanitize({
    data: dataset,
    features: ["CGPA"],
    label: null
})
// Output: [[8.5], [6.2], [7.8]]
```

#### Use Cases

- Separating features from labels in supervised learning
- Feature selection for dimensionality reduction
- Creating training and validation sets
- Extracting specific columns for analysis
- Preparing data for different model inputs
- Creating feature subsets for ensemble methods

#### Technical Notes

- **Mutual Exclusivity**: Only features OR label should be specified, not both
- **Type Conversion**: Automatically converts numeric strings to numbers
- **Missing Values**: Behavior depends on implementation (null, NaN, or skip)
- **Column Names**: Case-sensitive matching of column names
- **Performance**: O(n × m) where n = rows, m = selected columns
- **Data Integrity**: Original dataset remains unchanged

#### Advanced Example

```javascript
// Complete data preparation workflow
let dataset = hydrate({
    path: "./data/housing_prices.csv",
    type: "csv"
})

// Extract multiple features for training
let X_train = sanitize({
    data: dataset,
    features: ["sqft", "bedrooms", "bathrooms", "age"],
    label: null
})

// Extract target variable
let y_train = sanitize({
    data: dataset,
    features: null,
    label: ["price"]
})

// Verify shapes
console.log(`Features shape: ${X_train.length} x ${X_train[0].length}`)
console.log(`Labels shape: ${y_train.length} x ${y_train[0].length}`)

// Create validation set with different features
let X_val = sanitize({
    data: dataset,
    features: ["sqft", "location_score"],
    label: null
})
```

#### Error Handling

```javascript
// Handle missing columns
try {
    let X = sanitize({
        data: dataset,
        features: ["NonExistentColumn"],
        label: null
    })
} catch (error) {
    console.error("Feature extraction failed:", error.message)
}

// Validate both parameters not null
try {
    let invalid = sanitize({
        data: dataset,
        features: ["CGPA"],
        label: ["Result"]  // Both specified - should error
    })
} catch (error) {
    console.error("Invalid sanitize call:", error.message)
}
```

---

### cast_to_type

#### Purpose
Converts array elements to a specified data type. This function provides type casting capabilities for data transformation and type consistency across operations.

#### Syntax

```javascript
cast_to_type({
    data: Array,
    type: String
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Array to perform type casting on (1D, 2D, or 3D) |
| `type` | String | Yes | - | Target type: "string", "number", "boolean", "int", "float" |

#### Return Value

Returns a new array with all elements cast to the specified type. Maintains the original array structure (1D, 2D, or 3D).

#### Business Logic

1. **Type Validation**: Verifies that requested type is supported
2. **Recursive Casting**: Handles nested arrays recursively
3. **Type Conversion**:
   - `"string"`: Converts to string using toString()
   - `"number"`: Converts to number using Number()
   - `"int"`: Converts to integer using parseInt()
   - `"float"`: Converts to float using parseFloat()
   - `"boolean"`: Converts to boolean using Boolean()
4. **Structure Preservation**: Maintains original array dimensions
5. **Error Handling**: Handles unconvertible values gracefully

#### Example Usage

```javascript
// Convert numbers to strings
let numbers = [1, 2, 3, 4, 5]
let strings = cast_to_type({
    data: numbers,
    type: "string"
})
// Output: ["1", "2", "3", "4", "5"]

// Convert strings to numbers
let str_arr = ["12.5", "34.8", "56.2"]
let num_arr = cast_to_type({
    data: str_arr,
    type: "float"
})
// Output: [12.5, 34.8, 56.2]

// Convert to integers
let floats = [12.7, 34.2, 56.9]
let ints = cast_to_type({
    data: floats,
    type: "int"
})
// Output: [12, 34, 56]

// 2D array conversion
let arr_2d = [[1, 2, 3], [4, 5, 6]]
let str_2d = cast_to_type({
    data: arr_2d,
    type: "string"
})
// Output: [["1", "2", "3"], ["4", "5", "6"]]

// Boolean conversion
let mixed = [0, 1, "", "text", null, 42]
let bools = cast_to_type({
    data: mixed,
    type: "boolean"
})
// Output: [false, true, false, true, false, true]
```

#### Use Cases

- Preparing data for JSON serialization
- Converting user input to correct types
- Normalizing data types before processing
- Converting between integer and floating-point representations
- Standardizing dataset types
- Preparing data for different API requirements

#### Technical Notes

- **Precision Loss**: Converting float to int truncates decimal portion
- **Invalid Conversions**: Non-numeric strings to number may result in NaN
- **Boolean Conversion**: Follows JavaScript truthy/falsy rules
- **Performance**: O(n) for flat arrays, O(n × m × p) for 3D arrays
- **Immutability**: Original array is not modified
- **Type Support**: Limited to JavaScript primitive types

#### Advanced Example

```javascript
// Type casting in data pipeline
let raw_data = [
    ["12.5", "34.8", "56.2"],
    ["78.1", "90.4", "23.7"]
]

// Convert to floats for calculations
let float_data = cast_to_type({
    data: raw_data,
    type: "float"
})

// Perform calculations
let normalized = float_data.map(row => 
    row.map(val => val / 100)
)

// Convert back to strings for display
let display_data = cast_to_type({
    data: normalized,
    type: "string"
})
```

#### Edge Cases and Validation

```javascript
// Handling NaN results
let invalid_numbers = ["abc", "def", "123"]
let converted = cast_to_type({
    data: invalid_numbers,
    type: "number"
})
// Output: [NaN, NaN, 123]

// Checking for NaN values
let has_nan = converted.some(val => isNaN(val))
if (has_nan) {
    console.log("Warning: Some values could not be converted to numbers")
}

// Safe conversion with validation
function safe_cast(data, type) {
    let result = cast_to_type({data, type})
    
    if (type === "number" || type === "float") {
        let all_valid = result.every(val => !isNaN(val))
        if (!all_valid) {
            throw new Error("Invalid numeric conversion")
        }
    }
    
    return result
}
```

---

## Statistical Functions

### minimum

#### Purpose
Calculates the minimum value(s) in an array or array structure. Supports 1D, 2D, and 3D arrays with configurable clustering for column-wise or element-wise minimum computation.

#### Syntax

```javascript
minimum({
    data: Array,
    cluster: Number
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Input array (1D, 2D, or 3D) |
| `cluster` | Number | No | 1 | Clustering mode: 1 (global min), 2 (column-wise min) |

#### Return Value

Returns:
- For `cluster: 1`: Single minimum value across entire array
- For `cluster: 2`: Array of minimum values for each column/feature
- Maintains appropriate dimensionality based on input

#### Business Logic

1. **Dimensionality Detection**: Determines if array is 1D, 2D, or 3D
2. **Cluster Mode Selection**:
   - Cluster 1: Finds global minimum across all elements
   - Cluster 2: Finds minimum for each column (feature-wise)
3. **Recursive Processing**: Handles nested arrays recursively
4. **Comparison Logic**: Uses standard numeric comparison
5. **Edge Case Handling**: Handles empty arrays and single values

#### Example Usage

```javascript
// 1D array - global minimum
let arr1 = [12, 11, 9, 1, 0, 9]
let min1 = minimum({data: arr1, cluster: 1})
// Output: 0

// 2D array - column-wise minimum
let arr2 = [[12, 11], [9, 1], [0, 9], [5, 4]]
let min2 = minimum({data: arr2, cluster: 2})
// Output: [0, 1]

// 2D array - global minimum
let min2_global = minimum({data: arr2, cluster: 1})
// Output: 0

// 3D array - column-wise minimum
let arr3 = [[[12, 11], [9, 1], [0, 9], [5, 4]]]
let min3 = minimum({data: arr3, cluster: 2})
// Output: [[0, 1]]

// Feature data (from sanitize)
let features = [[8.5, 120], [6.2, 95], [7.8, 110], [9.0, 130]]
let feature_mins = minimum({data: features, cluster: 2})
// Output: [6.2, 95]
```

#### Use Cases

- Finding minimum values for data normalization
- Identifying outliers and data ranges
- Computing feature-wise statistics for ML preprocessing
- Data validation and quality checks
- Finding best/worst performance metrics
- Range-based data filtering

#### Technical Notes

- **Performance**: O(n) for 1D, O(n × m) for 2D
- **Numeric Only**: Works with numeric values; non-numeric values may cause errors
- **NaN Handling**: Implementation should define behavior for NaN values
- **Empty Arrays**: Should return Infinity or throw error
- **Memory**: Constant space for cluster 1, O(m) for cluster 2

#### Advanced Example

```javascript
// Using minimum for normalization preprocessing
let dataset = hydrate({
    path: "./data/student_data.csv",
    type: "csv"
})

let X = sanitize({
    data: dataset,
    features: ["CGPA", "IQ"],
    label: null
})

// Get min values for each feature
let min_values = minimum({data: X, cluster: 2})
console.log("Feature minimums:", min_values)
// Output: [6.2, 95] (example)

// Use in normalization
let max_values = maximum({data: X, cluster: 2})
let normalized = normalize({
    data: X,
    min: min_values,
    max: max_values
})
```

#### Comparison with Different Cluster Modes

```javascript
let data = [
    [10, 20, 30],
    [5, 15, 25],
    [8, 18, 28]
]

// Cluster 1: Global minimum
let global_min = minimum({data: data, cluster: 1})
console.log("Global min:", global_min)
// Output: 5

// Cluster 2: Column-wise minimum
let column_min = minimum({data: data, cluster: 2})
console.log("Column mins:", column_min)
// Output: [5, 15, 25]

// Each column's minimum:
// Column 0: min(10, 5, 8) = 5
// Column 1: min(20, 15, 18) = 15
// Column 2: min(30, 25, 28) = 25
```

---

### maximum

#### Purpose
Calculates the maximum value(s) in an array or array structure. Complements the minimum function and supports identical clustering modes for feature-wise or global maximum computation.

#### Syntax

```javascript
maximum({
    data: Array,
    cluster: Number
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Input array (1D, 2D, or 3D) |
| `cluster` | Number | No | 1 | Clustering mode: 1 (global max), 2 (column-wise max) |

#### Return Value

Returns:
- For `cluster: 1`: Single maximum value across entire array
- For `cluster: 2`: Array of maximum values for each column/feature

#### Business Logic

1. **Array Analysis**: Determines array dimensionality
2. **Cluster Processing**:
   - Cluster 1: Computes global maximum
   - Cluster 2: Computes column-wise maximum
3. **Traversal**: Iterates through all elements or columns
4. **Comparison**: Uses standard greater-than comparison
5. **Result Formatting**: Returns appropriate structure based on cluster mode

#### Example Usage

```javascript
// 1D array - global maximum
let arr1 = [12, 11, 9, 1, 0, 9]
let max1 = maximum({data: arr1})
// Output: 12

// 2D array - column-wise maximum
let arr2 = [[12, 11], [9, 1], [0, 9], [5, 4]]
let max2 = maximum({data: arr2})
// Output: [12, 11]

// 3D array - column-wise maximum
let arr3 = [[[12, 11, 3], [9, 1, 2], [0, 9, 1], [5, 4, 0]]]
let max3 = maximum({data: arr3})
// Output: [[12, 11]]

// Feature data example
let features = [[8.5, 120], [6.2, 95], [7.8, 110], [9.0, 130]]
let feature_maxs = maximum({data: features, cluster: 2})
// Output: [9.0, 130]
```

#### Use Cases

- Finding maximum values for normalization
- Identifying data ranges and bounds
- Computing feature-wise statistics
- Detecting anomalies and outliers
- Performance metric analysis
- Setting upper bounds for scaling

#### Technical Notes

- **Symmetry with minimum**: Same interface as minimum() for consistency
- **Performance**: Identical complexity to minimum()
- **Default Cluster**: cluster parameter defaults to appropriate mode based on dimensionality
- **Numeric Types**: Works with integers and floating-point numbers
- **Negative Numbers**: Correctly handles negative values

#### Normalization Example

```javascript
// Complete min-max normalization setup
let dataset = [
    [100, 200],
    [150, 250],
    [200, 300],
    [120, 180]
]

let min_vals = minimum({data: dataset, cluster: 2})
let max_vals = maximum({data: dataset, cluster: 2})

console.log("Min values:", min_vals)  // [100, 180]
console.log("Max values:", max_vals)  // [200, 300]

// These will be used in normalize() function
let normalized = normalize({
    data: dataset,
    min: min_vals,
    max: max_vals
})
```

---

### mean

#### Purpose
Calculates the arithmetic mean (average) of array elements. Essential for central tendency analysis and statistical computations.

#### Syntax

```javascript
mean({
    data: Array
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Input array of numeric values (1D) |

#### Return Value

Returns the arithmetic mean as a number.

#### Business Logic

1. **Validation**: Ensures input is a valid array
2. **Summation**: Adds all elements together
3. **Division**: Divides sum by number of elements
4. **Formula**: mean = (Σx) / n where n is array length

#### Example Usage

```javascript
// Basic mean calculation
let data1 = [1, 2, 3, 4, 5]
let avg1 = mean({data: data1})
// Output: 3

// Even number of elements
let data2 = [1, 2, 3, 4, 5, 6]
let avg2 = mean({data: data2})
// Output: 3.5

// Decimal values
let data3 = [2.5, 3.7, 4.2, 5.8]
let avg3 = mean({data: data3})
// Output: 4.05
```

#### Use Cases

- Calculating average performance metrics
- Computing expected values
- Statistical analysis and reporting
- Data normalization (zero-mean normalization)
- Quality control measurements
- Academic grade calculations

#### Technical Notes

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Empty Array**: Should handle gracefully (return 0, null, or error)
- **Precision**: Subject to floating-point arithmetic precision
- **Outlier Sensitivity**: Mean is sensitive to outliers

---

### median

#### Purpose
Calculates the median (middle value) of an array. More robust to outliers than mean, representing the 50th percentile of the data distribution.

#### Syntax

```javascript
median({
    data: Array
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Input array of numeric values (1D) |

#### Return Value

Returns the median value as a number.

#### Business Logic

1. **Sorting**: Creates sorted copy of array
2. **Length Check**: Determines if array has odd or even length
3. **Odd Length**: Returns middle element
4. **Even Length**: Returns average of two middle elements
5. **Formula**: 
   - Odd n: median = arr[n/2]
   - Even n: median = (arr[n/2-1] + arr[n/2]) / 2

#### Example Usage

```javascript
// Odd number of elements
let data1 = [1, 2, 3, 4, 5]
let med1 = median({data: data1})
// Output: 3

// Even number of elements
let data2 = [1, 2, 3, 4, 5, 6]
let med2 = median({data: data2})
// Output: 3.5

// Unsorted data
let data3 = [5, 1, 4, 2, 3]
let med3 = median({data: data3})
// Output: 3 (after sorting: [1, 2, 3, 4, 5])

// With outliers
let data4 = [1, 2, 3, 4, 100]
let med4 = median({data: data4})
// Output: 3 (median is robust to outlier 100)
```

#### Use Cases

- Robust central tendency measure
- Salary and income analysis
- Real estate price analysis
- Performance benchmarking
- Quality control with outliers
- Percentile calculations

#### Technical Notes

- **Time Complexity**: O(n log n) due to sorting
- **Space Complexity**: O(n) for sorted copy
- **Outlier Resistance**: Not affected by extreme values
- **Distribution**: Better for skewed distributions
- **Mutation**: Original array remains unchanged

---

### mode

#### Purpose
Finds the mode (most frequently occurring value) in an array. Useful for categorical data analysis and identifying common patterns.

#### Syntax

```javascript
mode({
    data: Array
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | Input array of values (numeric or string) |

#### Return Value

Returns the most frequently occurring value. If multiple modes exist, behavior depends on implementation (may return first found or all modes).

#### Business Logic

1. **Frequency Count**: Creates map of value frequencies
2. **Iteration**: Counts occurrences of each unique value
3. **Maximum Frequency**: Identifies highest frequency count
4. **Mode Selection**: Returns value(s) with highest frequency
5. **Tie Handling**: Implementation-specific for multiple modes

#### Example Usage

```javascript
// Single mode
let data1 = [1, 2, 3, 4, 5]
let mode1 = mode({data: data1})
// Output: 1 (or null/undefined if all frequencies equal)

// Clear mode
let data2 = [1, 2, 2, 3, 3, 4, 5, 6]
let mode2 = mode({data: data2})
// Output: 2 or 3 (both appear twice)

// Strong mode
let data3 = [1, 2, 2, 2, 3, 3, 4, 5]
let mode3 = mode({data: data3})
// Output: 2 (appears 3 times)

// Categorical data
let data4 = ["apple", "banana", "apple", "cherry", "apple"]
let mode4 = mode({data: data4})
// Output: "apple"
```

#### Use Cases

- Finding most common categories
- Identifying popular products/choices
- Survey response analysis
- Classification label distribution
- Customer preference analysis
- Error code frequency analysis

#### Technical Notes

- **Time Complexity**: O(n)
- **Space Complexity**: O(k) where k is unique values
- **Multiple Modes**: Bimodal or multimodal distributions
- **No Mode**: All values equally frequent
- **Data Types**: Works with any comparable type

#### Advanced Example

```javascript
// Analyzing customer preferences
let purchases = ["laptop", "phone", "laptop", "tablet", "phone", "laptop"]
let popular_product = mode({data: purchases})
console.log("Most purchased:", popular_product)
// Output: "laptop"

// Grade distribution
let grades = [85, 90, 85, 92, 85, 88, 90, 85]
let common_grade = mode({data: grades})
console.log("Most common grade:", common_grade)
// Output: 85
```

---

## Machine Learning Functions

### normalize

#### Purpose
Performs min-max normalization (feature scaling) on data to transform values into a standard range [0, 1]. Critical preprocessing step for machine learning algorithms that are sensitive to feature scales.

#### Syntax

```javascript
normalize({
    data: Array,
    min: Array | Number,
    max: Array | Number
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Array | Yes | - | 2D array of features to normalize |
| `min` | Array\|Number | Yes | - | Minimum value(s) for each feature |
| `max` | Array\|Number | Yes | - | Maximum value(s) for each feature |

#### Return Value

Returns a 2D array with normalized values in range [0, 1].

#### Business Logic

1. **Min-Max Scaling Formula**: 
   ```
   normalized_value = (value - min) / (max - min)
   ```
2. **Feature-wise Processing**: Applies normalization to each feature independently
3. **Range Validation**: Ensures min < max for each feature
4. **Edge Cases**: Handles min = max (returns 0 or 0.5)
5. **Precision**: Maintains floating-point precision

#### Example Usage

```javascript
// Basic normalization
let data = [[8.5, 120], [6.2, 95], [7.8, 110], [9.0, 130]]
let min = [6.2, 95]
let max = [9.0, 130]

let normalized = normalize({
    data: data,
    min: min,
    max: max
})
// Output: [
//   [0.821, 0.714],
//   [0.0, 0.0],
//   [0.571, 0.429],
//   [1.0, 1.0]
// ]

// Single sample normalization
let sample = [[8.0, 90]]
let norm_sample = normalize({
    data: sample,
    min: min,
    max: max
})
// Output: [[0.643, -0.143]] (note: 90 < min[1], so negative)

// Complete workflow
let dataset = hydrate({
    path: "./data/features.csv",
    type: "csv"
})

let X = sanitize({
    data: dataset,
    features: ["feature1", "feature2"],
    label: null
})

let min_vals = minimum({data: X, cluster: 2})
let max_vals = maximum({data: X, cluster: 2})

let X_normalized = normalize({
    data: X,
    min: min_vals,
    max: max_vals
})
```

#### Use Cases

- Preprocessing for neural networks
- Preparing features for gradient descent algorithms
- Distance-based algorithms (KNN, K-means)
- Ensuring feature equality in contributions
- Principal Component Analysis (PCA) preprocessing
- Model input standardization

#### Technical Notes

- **Range**: Output is [0, 1] when input is within [min, max]
- **Out of Range**: Values outside [min, max] result in <0 or >1
- **Zero Division**: When min = max, typically returns 0
- **Training vs Testing**: Use training set min/max for test set normalization
- **Reversibility**: Can be reversed with denormalization formula
- **Alternative**: Z-score normalization for different use cases

#### Mathematical Details

```
For each feature j and sample i:

X_normalized[i][j] = (X[i][j] - min[j]) / (max[j] - min[j])

Where:
- X[i][j] is the original value
- min[j] is the minimum value for feature j
- max[j] is the maximum value for feature j
- Result is in [0, 1] when X[i][j] ∈ [min[j], max[j]]
```

#### Denormalization Example

```javascript
// Reverse normalization
function denormalize(normalized_data, min, max) {
    return normalized_data.map((row, i) => 
        row.map((val, j) => 
            val * (max[j] - min[j]) + min[j]
        )
    )
}

let original = denormalize(normalized, min, max)
// Returns approximately original data values
```

---

### perceptron

#### Purpose
Trains a perceptron model for linear classification tasks. Implements the classic perceptron learning algorithm with support for binary and multi-class classification.

#### Syntax

```javascript
perceptron({
    X: Array,
    y: Array,
    lr: Number,
    epochs: Number,
    save: Boolean,
    name: String,
    type: String
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `X` | Array | Yes | - | 2D array of training features (normalized) |
| `y` | Array | Yes | - | 2D array of training labels |
| `lr` | Number | No | 0.01 | Learning rate (step size for weight updates) |
| `epochs` | Number | No | 1000 | Number of training iterations |
| `save` | Boolean | No | false | Whether to save trained model to file |
| `name` | String | No | "model" | Model filename (without extension) |
| `type` | String | No | "classification" | Model type: "linear_classification", "binary_classification" |

#### Return Value

Returns trained model object containing weights, bias, and metadata. If `save: true`, also writes model to JSON file.

#### Business Logic

1. **Weight Initialization**: Initializes weights randomly or to zeros
2. **Bias Initialization**: Sets initial bias term
3. **Training Loop**:
   - For each epoch:
     - For each training sample:
       - Compute weighted sum: z = w·x + b
       - Apply activation function
       - Compute error: error = y - prediction
       - Update weights: w = w + lr × error × x
       - Update bias: b = b + lr × error
4. **Convergence**: Continues for specified epochs
5. **Model Persistence**: Saves to JSON if requested

#### Activation Functions

- **Binary Classification**: Step function (output 0 or 1)
- **Linear Classification**: Linear function or sign function

#### Example Usage

```javascript
// Load and prepare data
let dataset = hydrate({
    path: "./data/student_cgpa_iq_passfail_300.csv",
    type: "csv"
})

let X = sanitize({
    data: dataset,
    features: ["CGPA", "IQ"],
    label: null
})

let y = sanitize({
    data: dataset,
    features: null,
    label: ["Result"]
})

// Normalize features
let min = minimum({data: X, cluster: 2})
let max = maximum({data: X, cluster: 2})
let X_norm = normalize({
    data: X,
    min: min,
    max: max
})

// Train perceptron
perceptron({
    X: X_norm,
    y: y,
    lr: 0.1,
    epochs: 10000,
    save: true,
    name: "perceptron",
    type: "linear_classification"
})

// Model saved to ./perceptron.json
```

#### Use Cases

- Binary classification problems
- Linear separable datasets
- Simple decision boundaries
- Online learning scenarios
- Educational demonstrations
- Baseline model for comparison

#### Technical Notes

- **Linear Separability**: Works best on linearly separable data
- **Learning Rate**: Typical values 0.001 to 0.1
- **Epochs**: May need tuning based on convergence
- **Convergence**: No guaranteed convergence for non-separable data
- **Performance**: O(epochs × samples × features)
- **Limitations**: Cannot solve XOR-like problems

#### Model File Format

```json
{
    "type": "linear_classification",
    "weights": [0.523, -0.234],
    "bias": 0.145,
    "features": 2,
    "learning_rate": 0.1,
    "epochs_trained": 10000,
    "timestamp": "2026-01-31T10:30:00Z"
}
```

#### Training Tips

```javascript
// Monitor training progress (pseudo-code)
function train_with_monitoring(X, y, lr, epochs) {
    for (let epoch = 0; epoch < epochs; epoch++) {
        let predictions = predict_all(X)
        let accuracy = compute_accuracy(predictions, y)
        
        if (epoch % 1000 === 0) {
            console.log(`Epoch ${epoch}: Accuracy = ${accuracy}`)
        }
        
        // Early stopping if converged
        if (accuracy === 1.0) {
            console.log(`Converged at epoch ${epoch}`)
            break
        }
    }
}
```

---

### load_perceptron

#### Purpose
Loads a previously trained perceptron model from a JSON file. Enables model reuse without retraining.

#### Syntax

```javascript
load_perceptron({
    path: String
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `path` | String | Yes | - | File path to the saved model JSON file |

#### Return Value

Returns model object containing weights, bias, and all saved metadata.

#### Business Logic

1. **File Reading**: Reads JSON file from specified path
2. **Parsing**: Parses JSON string to JavaScript object
3. **Validation**: Verifies model structure and required fields
4. **Model Reconstruction**: Creates model object with loaded parameters
5. **Metadata**: Includes training configuration and timestamps

#### Example Usage

```javascript
// Load trained model
let model = load_perceptron({
    path: "./perceptron.json"
})

console.log("Model loaded:", model.type)
console.log("Features:", model.features)
console.log("Weights:", model.weights)
console.log("Bias:", model.bias)

// Use loaded model for prediction
let sample = [[8.0, 90]]
let min = [6.2, 95]
let max = [9.0, 130]

let norm_sample = normalize({
    data: sample,
    min: min,
    max: max
})

let prediction = predict({
    X: norm_sample,
    model: model
})

console.log("Prediction:", prediction)
```

#### Use Cases

- Deploying trained models in production
- Sharing models across applications
- Model versioning and archival
- Batch prediction workflows
- A/B testing different models
- Model evaluation and comparison

#### Technical Notes

- **File Format**: Standard JSON format
- **Error Handling**: Should handle file not found, invalid JSON
- **Synchronous**: Blocking file I/O operation
- **Validation**: Verify model compatibility before use
- **Security**: Validate JSON structure to prevent injection

#### Model Validation

```javascript
function validate_model(model) {
    if (!model.weights || !Array.isArray(model.weights)) {
        throw new Error("Invalid model: missing or invalid weights")
    }
    
    if (typeof model.bias !== "number") {
        throw new Error("Invalid model: missing or invalid bias")
    }
    
    if (!model.type) {
        throw new Error("Invalid model: missing type")
    }
    
    return true
}

// Usage
try {
    let model = load_perceptron({path: "./model.json"})
    validate_model(model)
    console.log("Model validation passed")
} catch (error) {
    console.error("Model validation failed:", error.message)
}
```

---

### predict

#### Purpose
Makes predictions using a trained perceptron model on new input samples. Applies the learned decision function to classify new data points.

#### Syntax

```javascript
predict({
    X: Array,
    model: Object
})
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `X` | Array | Yes | - | 2D array of samples to predict (must be normalized) |
| `model` | Object | Yes | - | Trained model object (from perceptron or load_perceptron) |

#### Return Value

Returns array of predictions (one per input sample). Format depends on model type:
- Binary classification: [0] or [1]
- Linear classification: Continuous values or discrete classes

#### Business Logic

1. **Input Validation**: Verifies X dimensions match model expectations
2. **Prediction Loop**: For each sample:
   - Compute weighted sum: z = Σ(w_i × x_i) + b
   - Apply activation function based on model type
   - Store prediction
3. **Batch Processing**: Handles multiple samples efficiently
4. **Output Formatting**: Returns predictions in consistent format

#### Prediction Formula

```
For each sample x:

z = w₀×x₀ + w₁×x₁ + ... + wₙ×xₙ + b

For binary classification:
prediction = 1 if z ≥ 0, else 0

For linear classification:
prediction = z (or sign(z))
```

#### Example Usage

```javascript
// Complete prediction workflow
let model = load_perceptron({
    path: "./perceptron.json"
})

// Get normalization parameters from training
let min = [6.2, 95]
let max = [9.0, 130]

// Single prediction
let sample1 = [[8.0, 90]]
let norm1 = normalize({
    data: sample1,
    min: min,
    max: max
})
let pred1 = predict({
    X: norm1,
    model: model
})
console.log("Prediction for [8.0, 90]:", pred1)
// Output: [1] or [0] (Pass or Fail)

// Batch predictions
let samples = [
    [8.5, 120],
    [6.0, 85],
    [7.5, 105],
    [9.2, 135]
]
let norm_samples = normalize({
    data: samples,
    min: min,
    max: max
})
let predictions = predict({
    X: norm_samples,
    model: model
})
console.log("Batch predictions:", predictions)
// Output: [1, 0, 1, 1] (example)
```

#### Use Cases

- Classifying new student pass/fail outcomes
- Real-time prediction APIs
- Batch scoring of datasets
- Model evaluation on test sets
- A/B testing predictions
- Production inference pipelines

#### Technical Notes

- **Preprocessing**: Input MUST be normalized using same min/max as training
- **Performance**: O(samples × features)
- **Memory**: O(samples) for predictions
- **Thread Safety**: Pure function, safe for concurrent use
- **Validation**: Verify feature count matches model

#### Error Handling and Validation

```javascript
function safe_predict(X, model, min, max) {
    // Validate input dimensions
    if (X[0].length !== model.weights.length) {
        throw new Error(
            `Feature mismatch: expected ${model.weights.length}, ` +
            `got ${X[0].length}`
        )
    }
    
    // Ensure normalization
    let normalized = normalize({
        data: X,
        min: min,
        max: max
    })
    
    // Make prediction
    let predictions = predict({
        X: normalized,
        model: model
    })
    
    return predictions
}

// Usage
try {
    let results = safe_predict(
        [[8.0, 90]],
        model,
        [6.2, 95],
        [9.0, 130]
    )
    console.log("Predictions:", results)
} catch (error) {
    console.error("Prediction failed:", error.message)
}
```

#### Interpreting Results

```javascript
// Interpret binary classification results
function interpret_prediction(prediction, threshold = 0.5) {
    if (prediction[0] >= threshold) {
        return "Pass"
    } else {
        return "Fail"
    }
}

let pred = predict({X: norm_sample, model: model})
let result = interpret_prediction(pred)
console.log("Student outcome:", result)

// Confidence analysis (for linear models)
function prediction_confidence(prediction) {
    let value = Math.abs(prediction[0])
    if (value > 0.8) return "High confidence"
    if (value > 0.5) return "Medium confidence"
    return "Low confidence"
}
```

---

## Examples and Use Cases

### Complete Machine Learning Pipeline

```javascript
// 1. Data Loading
let dataset = hydrate({
    path: "./data/student_cgpa_iq_passfail_300.csv",
    type: "csv"
})

// 2. Feature Extraction
let X = sanitize({
    data: dataset,
    features: ["CGPA", "IQ"],
    label: null
})

let y = sanitize({
    data: dataset,
    features: null,
    label: ["Result"]
})

// 3. Data Analysis
console.log("Dataset Statistics:")
console.log("CGPA - Mean:", mean({data: X.map(row => row[0])}))
console.log("IQ - Mean:", mean({data: X.map(row => row[1])}))
console.log("CGPA - Median:", median({data: X.map(row => row[0])}))
console.log("IQ - Median:", median({data: X.map(row => row[1])}))

// 4. Normalization
let min = minimum({data: X, cluster: 2})
let max = maximum({data: X, cluster: 2})
let X_norm = normalize({
    data: X,
    min: min,
    max: max
})

// 5. Model Training
perceptron({
    X: X_norm,
    y: y,
    lr: 0.1,
    epochs: 10000,
    save: true,
    name: "student_classifier",
    type: "linear_classification"
})

// 6. Model Loading and Prediction
let model = load_perceptron({
    path: "./student_classifier.json"
})

// 7. Make Predictions
let new_students = [
    [8.5, 120],  // Expected: Pass
    [6.0, 85],   // Expected: Fail
    [7.5, 105]   // Expected: Pass
]

let new_students_norm = normalize({
    data: new_students,
    min: min,
    max: max
})

let predictions = predict({
    X: new_students_norm,
    model: model
})

console.log("Predictions:", predictions)
```

### Data Preprocessing Pipeline

```javascript
// Complex preprocessing workflow
function preprocess_dataset(filepath) {
    // Load data
    let raw_data = hydrate({
        path: filepath,
        type: "csv"
    })
    
    // Extract features and labels
    let features = sanitize({
        data: raw_data,
        features: ["age", "income", "credit_score"],
        label: null
    })
    
    let labels = sanitize({
        data: raw_data,
        features: null,
        label: ["approved"]
    })
    
    // Compute statistics
    let stats = {
        min: minimum({data: features, cluster: 2}),
        max: maximum({data: features, cluster: 2}),
        mean: features[0].map((_, col) => 
            mean({data: features.map(row => row[col])})
        ),
        median: features[0].map((_, col) => 
            median({data: features.map(row => row[col])})
        )
    }
    
    // Normalize
    let normalized = normalize({
        data: features,
        min: stats.min,
        max: stats.max
    })
    
    return {
        X: normalized,
        y: labels,
        stats: stats,
        raw: raw_data
    }
}

// Usage
let processed = preprocess_dataset("./data/loan_applications.csv")
console.log("Processed", processed.X.length, "samples")
```

### Model Evaluation

```javascript
// Train-test split and evaluation
function evaluate_model(X, y, test_ratio = 0.2) {
    let split_idx = Math.floor(X.length * (1 - test_ratio))
    
    // Split data
    let X_train = X.slice(0, split_idx)
    let y_train = y.slice(0, split_idx)
    let X_test = X.slice(split_idx)
    let y_test = y.slice(split_idx)
    
    // Train model
    perceptron({
        X: X_train,
        y: y_train,
        lr: 0.1,
        epochs: 5000,
        save: true,
        name: "eval_model",
        type: "linear_classification"
    })
    
    // Load and predict
    let model = load_perceptron({
        path: "./eval_model.json"
    })
    
    let predictions = predict({
        X: X_test,
        model: model
    })
    
    // Calculate accuracy
    let correct = 0
    for (let i = 0; i < predictions.length; i++) {
        if (predictions[i][0] === y_test[i][0]) {
            correct++
        }
    }
    
    let accuracy = correct / predictions.length
    console.log(`Test Accuracy: ${(accuracy * 100).toFixed(2)}%`)
    
    return {
        model: model,
        accuracy: accuracy,
        predictions: predictions,
        actuals: y_test
    }
}
```

---

## Best Practices

### Data Loading and Preprocessing

1. **Always Validate Input Data**
```javascript
function validate_dataset(data) {
    if (!data || data.length === 0) {
        throw new Error("Empty dataset")
    }
    
    let feature_count = Object.keys(data[0]).length
    for (let row of data) {
        if (Object.keys(row).length !== feature_count) {
            throw new Error("Inconsistent feature count")
        }
    }
    
    return true
}
```

2. **Handle Missing Values**
```javascript
function check_missing_values(X) {
    for (let i = 0; i < X.length; i++) {
        for (let j = 0; j < X[i].length; j++) {
            if (X[i][j] === null || X[i][j] === undefined || isNaN(X[i][j])) {
                console.warn(`Missing value at row ${i}, col ${j}`)
            }
        }
    }
}
```

3. **Store Normalization Parameters**
```javascript
// Always save min/max with model
function save_preprocessing_params(min, max, filepath) {
    let params = {
        min: min,
        max: max,
        timestamp: new Date().toISOString()
    }
    
    // Save to file alongside model
    fs.writeFileSync(filepath, JSON.stringify(params, null, 2))
}
```

### Model Training

1. **Monitor Training Progress**
```javascript
// Log training metrics periodically
function train_with_logging(X, y, config) {
    console.log("Training Configuration:")
    console.log(`- Learning Rate: ${config.lr}`)
    console.log(`- Epochs: ${config.epochs}`)
    console.log(`- Samples: ${X.length}`)
    console.log(`- Features: ${X[0].length}`)
    
    perceptron({
        X: X,
        y: y,
        lr: config.lr,
        epochs: config.epochs,
        save: true,
        name: config.name,
        type: config.type
    })
    
    console.log("Training completed")
}
```

2. **Use Appropriate Learning Rates**
```javascript
// Learning rate selection guide
const LR_GUIDELINES = {
    small_dataset: 0.01,      // < 100 samples
    medium_dataset: 0.001,    // 100-10000 samples
    large_dataset: 0.0001,    // > 10000 samples
    quick_test: 0.1           // Fast convergence testing
}
```

3. **Save Model Metadata**
```javascript
function save_model_with_metadata(model, metadata) {
    let full_model = {
        ...model,
        metadata: {
            ...metadata,
            created: new Date().toISOString(),
            version: "1.0.0"
        }
    }
    
    // Save to file
}
```

### Prediction and Deployment

1. **Always Normalize Test Data**
```javascript
// Correct prediction workflow
function safe_prediction_pipeline(new_data, model_path, norm_params_path) {
    let model = load_perceptron({path: model_path})
    let params = JSON.parse(fs.readFileSync(norm_params_path))
    
    let normalized = normalize({
        data: new_data,
        min: params.min,
        max: params.max
    })
    
    return predict({
        X: normalized,
        model: model
    })
}
```

2. **Validate Feature Dimensions**
```javascript
function validate_prediction_input(X, model) {
    if (X[0].length !== model.weights.length) {
        throw new Error(
            `Feature dimension mismatch: ` +
            `expected ${model.weights.length}, got ${X[0].length}`
        )
    }
}
```

3. **Batch Processing for Efficiency**
```javascript
// Process multiple samples at once
function batch_predict(samples, model, batch_size = 100) {
    let results = []
    
    for (let i = 0; i < samples.length; i += batch_size) {
        let batch = samples.slice(i, i + batch_size)
        let predictions = predict({
            X: batch,
            model: model
        })
        results.push(...predictions)
    }
    
    return results
}
```

### Performance Optimization

1. **Reuse Computations**
```javascript
// Cache min/max calculations
let cached_stats = null

function get_or_compute_stats(X) {
    if (!cached_stats) {
        cached_stats = {
            min: minimum({data: X, cluster: 2}),
            max: maximum({data: X, cluster: 2})
        }
    }
    return cached_stats
}
```

2. **Optimize Array Operations**
```javascript
// Use appropriate cluster mode
let global_min = minimum({data: X, cluster: 1})  // Fast
let column_mins = minimum({data: X, cluster: 2}) // Slower but needed for normalization
```

3. **Memory Management**
```javascript
// Clear large arrays when done
function process_and_cleanup(data) {
    let result = normalize({data: data, min: min, max: max})
    
    // Clear reference to large array
    data = null
    
    return result
}
```

### Error Handling

1. **Comprehensive Try-Catch**
```javascript
function robust_pipeline(filepath) {
    try {
        let data = hydrate({path: filepath, type: "csv"})
        
        try {
            let X = sanitize({data: data, features: ["f1", "f2"], label: null})
            return X
        } catch (sanitize_error) {
            console.error("Feature extraction failed:", sanitize_error)
            throw new Error("Invalid feature names")
        }
        
    } catch (load_error) {
        console.error("Data loading failed:", load_error)
        throw new Error("File not found or invalid format")
    }
}
```

2. **Validation Functions**
```javascript
function validate_training_data(X, y) {
    if (X.length !== y.length) {
        throw new Error("Feature and label count mismatch")
    }
    
    if (X.length < 10) {
        console.warn("Very small dataset - results may be unreliable")
    }
    
    return true
}
```

### Code Organization

1. **Modular Functions**
```javascript
// Separate concerns
const DataLoader = {
    load: (path, type) => hydrate({path, type}),
    validate: (data) => validate_dataset(data)
}

const Preprocessor = {
    extract_features: (data, cols) => sanitize({data, features: cols, label: null}),
    extract_labels: (data, col) => sanitize({data, features: null, label: [col]}),
    normalize: (data, min, max) => normalize({data, min, max})
}

const ModelManager = {
    train: (X, y, config) => perceptron({...config, X, y}),
    load: (path) => load_perceptron({path}),
    predict: (X, model) => predict({X, model})
}
```

2. **Configuration Objects**
```javascript
const TRAINING_CONFIG = {
    lr: 0.1,
    epochs: 10000,
    save: true,
    name: "production_model",
    type: "linear_classification"
}

const NORMALIZATION_CONFIG = {
    method: "min-max",
    range: [0, 1],
    clip: true
}
```

### Documentation

1. **Comment Complex Logic**
```javascript
/**
 * Trains a perceptron model with early stopping
 * 
 * @param {Array} X - Normalized training features
 * @param {Array} y - Training labels
 * @param {Object} config - Training configuration
 * @returns {Object} Trained model with statistics
 */
function train_with_early_stopping(X, y, config) {
    // Implementation
}
```

2. **Log Important Operations**
```javascript
console.log("=== Data Pipeline Started ===")
console.log(`Loading data from: ${filepath}`)
console.log(`Extracting features: ${feature_names.join(", ")}`)
console.log(`Dataset size: ${X.length} samples`)
console.log("=== Training Started ===")
```

---

## Appendix

### Function Quick Reference

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `array_alloc` | Create array from source | Array + config | Structured array |
| `alloc_which` | Create typed array | Type + size | Filled array |
| `range_alloc` | Create range sequence | start, end, step | Sequential array |
| `hydrate` | Load data file | path, type | Parsed data |
| `sanitize` | Extract features/labels | data, columns | 2D array |
| `cast_to_type` | Convert types | array, type | Converted array |
| `minimum` | Find minimum | array, cluster | Min value(s) |
| `maximum` | Find maximum | array, cluster | Max value(s) |
| `mean` | Calculate mean | array | Average |
| `median` | Calculate median | array | Middle value |
| `mode` | Find mode | array | Most frequent |
| `normalize` | Scale features | data, min, max | Normalized [0,1] |
| `perceptron` | Train model | X, y, config | Model |
| `load_perceptron` | Load model | path | Model object |
| `predict` | Make predictions | X, model | Predictions |

### Common Workflows

**Classification Pipeline:**
```
hydrate → sanitize → minimum/maximum → normalize → perceptron → save
```

**Prediction Pipeline:**
```
load_perceptron → normalize (new data) → predict
```

**Data Analysis:**
```
hydrate → sanitize → mean/median/mode → insights
```

---

## Conclusion

The DRACULA brain.js module provides a comprehensive toolkit for data manipulation, statistical analysis, and machine learning. By following the best practices outlined in this documentation and understanding the purpose and business logic of each function, developers can build robust data processing pipelines and machine learning applications.

For questions, issues, or contributions, please refer to the project repository or contact the development team.

**Version:** 1.0.0  
**Last Updated:** January 31, 2026  
**License:** [Your License]
