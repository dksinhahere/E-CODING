import { useState } from "react";


function App() {

  const [name, setName] = useState("danishk")
  const nameHandler = () => {
    setName(prev => "Nikhil")
  }

  return (
    <div>
      <h1>Hello {name}</h1>
      <button className="border-solid border-4 border-black" onClick={nameHandler}>Change Name</button>
    </div>
  );
}

export default App;
