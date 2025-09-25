import React, { useState } from "react";
import ReactDOM from "react-dom";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

function App() {
  const [value, setValue] = useState("");

  const handleEnter = async (e) => {
    if (e.key === "Enter" && value) {
      try {
        // Replace BOARD_ID and COLUMN_ID with your target board
        await monday.api(`
          mutation {
            create_item(
              board_id: YOUR_BOARD_ID,
              item_name: "${value}",
              column_values: "{ \\"text_column_id\\": \\"${value}\\" }"
            ) {
              id
            }
          }
        `);
        setValue(""); // clear input after submission
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleEnter}
      placeholder="Enter value..."
      style={{ width: "100%", padding: "10px", fontSize: "16px" }}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

