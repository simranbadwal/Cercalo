import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiK = "";
  const genAI = new GoogleGenerativeAI(apiK);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    let text1 = "provide 10 links with a - line under the answer for the question: ";
    let text2 = " then answer the question";
    let final = text1.concat(prompt,text2);   
    const result = await chatSession.sendMessage(final)
    console.log(result.response.text());
    return result.response.text();
  }
  
 export default run;