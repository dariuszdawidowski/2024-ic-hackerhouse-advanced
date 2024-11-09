import { icp_gpt2 } from '../../declarations/icp_gpt2';
import { encode, decode } from 'gpt-tokenizer/encoding/p50k_base';


document.querySelector("form").addEventListener("submit", async (e) => {

    // Button
    e.preventDefault();
    const button = e.target.querySelector("button");
    button.setAttribute("disabled", true);

    // Prompt
    const prompt = document.getElementById("name").value.toString();
    console.log('prompt:', prompt)

    // Tokenize
    const tokens = encode(prompt);
    console.log('tokens:', tokens)

    // Get answer
    let answer = {};
    try {
        answer = await icp_gpt2.model_inference(18, tokens);
        console.log('answer:', answer)
    }
    catch(err) {
        console.error(err);
        document.getElementById("greeting").innerText = 'Model error';
    }

    // Enable button
    button.removeAttribute("disabled");

    // Detokenize & display message
    if ('Ok' in answer) {
        const retext = decode(answer.Ok);
        console.log('decoded:', retext)
        document.getElementById("greeting").innerText = retext;
    }
 
    return false;
});
