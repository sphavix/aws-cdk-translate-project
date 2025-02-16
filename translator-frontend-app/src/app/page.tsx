/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

const URL = "https://i4s8aljz93.execute-api.eu-north-1.amazonaws.com/prod/";

function translateText({
  inputLang,
  outputLang,
  inputText,
}:{
  inputLang: string;
  outputLang: string;
  inputText: string;
}){
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      sourceLang: inputLang,
      targetLang: outputLang,
      text: inputText
  }),
}).then((response) => response.json())
  .catch((error) => error.toString());
}

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [inputLang, setInputLang] = useState<string>("");
  const [outputLang, setOutputLang] = useState<string>("");
  //const [outputText, setOutputText] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form 
          onSubmit={async (event) => {
          event.preventDefault();
          const result = await translateText({inputLang, outputLang, inputText});

          console.log(result);
        }}>
          <div>
            <label htmlFor="inputText">Input Text</label>
              <textarea 
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
          </div>
          <div>
            <label htmlFor="inputLang">Input Language</label>
            <input type="text" 
                  id="inputLang"
                  value={inputLang}
                  onChange={(e) => setInputLang(e.target.value)} />
          </div>
          <div>
            <label htmlFor="outputLang">Output Language</label>
            <input 
              id="outputLang"
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value)}
              />
          </div>
          <div>
            <button type="submit" className="btn bg-blue-500 p-2 mt-2 rounded-lg">
              Translate
            </button>
          </div>
        </form>
        <p>{inputText}</p>
    </main>
  );
}
function setIsClient(arg0: boolean) {
  throw new Error("Function not implemented.");
}

