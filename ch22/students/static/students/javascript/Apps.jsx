function Apps() {
  const el = document.getElementById("students-data");
  const students = el ? JSON.parse(el.textContent) : [];

    const runThis = (props) => {
        alert(props)
    }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      {students.length === 0 ? (
        <p>No Data</p>
      ) : (
        students.map((s, i) => (
          <div key={i} className="border p-4 rounded mb-3">
            <h2 className="text-xl font-semibold">{s.name}</h2>
            <p>{s.email}</p>
            <p>{s.city}</p>
            <p>{s.comment}</p>
            <p>{s.state}</p>
          </div>
        ))
      )}

      <button onClick={() => runThis("Fine")}>Click Me</button>
    </div>
  );
}
