import { useState } from "react";

import Button from "./UI/Button";

const FormSection = ({ generateResponse }) => {
  const [newQuestion, setNewQuestion] = useState("");

  return (
    <div className="form-section">
      <textarea
        rows="5"
        className="form-control"
        placeholder="Ask me anything..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      ></textarea>
      <Button onClick={() => generateResponse(newQuestion, setNewQuestion)} class="btn btn-success mt-4" text="Generate Response 🤖" />
    </div>
  );
};

export default FormSection;
