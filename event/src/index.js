import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind CSS is working!
      </h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
