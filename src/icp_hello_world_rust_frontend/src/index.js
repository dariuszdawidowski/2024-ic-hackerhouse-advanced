import { icp_gpt2 } from "../../declarations/icp_gpt2";
import { encode } from 'gpt-tokenizer'


document.querySelector("form").addEventListener("submit", async (e) => {

    // Button
    e.preventDefault();
    const button = e.target.querySelector("button");
    button.setAttribute("disabled", true);

    // Prompt
    const prompt = document.getElementById("name").value.toString();

    // Tokenize
    const text = 'Hello, world!'
    const tokens = encode(text)
    console.log('tokens', tokens)

    // Get answer
    const answer = await icp_gpt2.model_inference(tokens.length, tokens);

    // Enable button
    button.removeAttribute("disabled");

    // Display message
    console.log(answer)
    // document.getElementById("greeting").innerText = answer;
 
    return false;
});
