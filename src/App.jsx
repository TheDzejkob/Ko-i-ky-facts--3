import React, { useState, useEffect } from "react";

const API_URL = "https://catfact.ninja/fact";

function App() {
  const [fact, setFact] = useState("");
  const [history, setHistory] = useState([]);

  // Načtení historie z localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("factHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Uložení historie do localStorage
  useEffect(() => {
    localStorage.setItem("factHistory", JSON.stringify(history));
  }, [history]);

  // Načtení náhodného faktu z API
  const fetchFact = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setFact(data.fact);
    setHistory([...history, { fact: data.fact, rating: null }]);
  };

  // Hodnocení faktu
  const rateFact = (index, rating) => {
    const updatedHistory = history.map((item, i) =>
      i === index ? { ...item, rating } : item
    );
    setHistory(updatedHistory);
  };

  // Smazání faktu z historie
  const deleteFact = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🐾 Cat Fact App</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary btn-lg" onClick={fetchFact}>
          Get a Cat Fact
        </button>
      </div>
      {fact && (
        <div className="card text-center mb-4">
          <div className="card-body">
            <h5 className="card-title">Random Cat Fact</h5>
            <p className="card-text">{fact}</p>
          </div>
        </div>
      )}
      <h2 className="mt-5">History</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Fact</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.fact}</td>
                  <td>
                    {item.rating ? (
                      <span className="badge badge-success">{item.rating}</span>
                    ) : (
                      <span className="badge badge-secondary">Not Rated</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => rateFact(index, "👍")}
                    >
                      👍
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => rateFact(index, "👎")}
                    >
                      👎
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => deleteFact(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No facts in history yet. Get some facts!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
