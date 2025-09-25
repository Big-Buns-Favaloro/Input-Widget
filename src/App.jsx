import React, { useState } from "react";
import mondaySdk from "monday-sdk-js";

// Initialize Monday SDK
const monday = mondaySdk();

export default function App() {
  const [value, setValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Send value to Monday board
      monday
        .api(`
          mutation {
            create_item(board_id: 5003898511, item_name: "${value}") {
              id
            }
          }
        `)
        .then((res) => {
          console.log("Item created:", res);
          setValue(""); // clear input
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Input Widget</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type value and hit Enter"
        style={{ padding: "10px", width: "250px" }}
      />
    </div>
  );
}
