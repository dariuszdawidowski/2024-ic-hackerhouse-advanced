import { icp_gpt2 } from "../../declarations/icp_gpt2";


document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = e.target.querySelector("button");
    const name = document.getElementById("name").value.toString();
    button.setAttribute("disabled", true);

    const answer = await icp_gpt2.model_inference(14, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    button.removeAttribute("disabled");

    console.log(answer)
    // document.getElementById("greeting").innerText = answer;
 
    return false;
});
