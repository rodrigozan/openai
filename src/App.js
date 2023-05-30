import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

import FormSection from "./components/FormSection";
import AnswerSection from "./components/AnswerSection";
import IntroductionText from "./components/IntroductionText";

const App = () => {
  const api_key = "";

  const configuration = new Configuration({
    apiKey: api_key,
  });

  const openai = new OpenAIApi(configuration);

  const [storedValues, setStoredValues] = useState([]);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    let options = {
      model: "gpt-4",
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
      <IntroductionText />

      <FormSection generateResponse={generateResponse} />

      <AnswerSection storedValues={storedValues} />
    </div>
  );
};

export default App;
