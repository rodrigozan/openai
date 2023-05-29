import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";

const App = () => {
  const api_key = "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";

  const configuration = new Configuration({
    apiKey: api_key,
  });

  const openai = new OpenAIApi(configuration);

  const [storedValues, setStoredValues] = useState([]);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    let completeOptions = {
      ...options,
      prompt: newQuestion,
    };

    const response = await openai.createCompletion(completeOptions);

    if (response.data.choices) {
      setStoredValues([
        {
          question: newQuestion,
          answer: response.data.choices[0].text,
        },
        ...storedValues,
      ]);
      setNewQuestion("");
    }
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>Griot AI Writer 🤖</h1>
        <p>
          An application that queries the
          <a href="https://openai.com/"> OpenAI API</a>
        </p>
      </div>

      <FormSection generateResponse={generateResponse} />

      <AnswerSection storedValues={storedValues} />
    </div>
  );
};

export default App;
