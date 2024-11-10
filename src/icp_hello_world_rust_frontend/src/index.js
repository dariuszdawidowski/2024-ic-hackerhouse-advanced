import IcpAiSession from './IcpAiSession.js';


document.querySelector('form').addEventListener('submit', async (e) => {

    // Button
    e.preventDefault();
    const button = e.target.querySelector('button');
    button.setAttribute('disabled', true);

    // Get prompt text
    const prompt = document.getElementById('name').value.toString();

    // Prompt AI
    const ai = new IcpAiSession();
    const answer = await ai.prompt(prompt);
    
    // Enable button
    button.removeAttribute('disabled');

    // Display message
    if (answer) document.getElementById('greeting').innerText = answer;
    else document.getElementById('greeting').innerText = 'Model error';
 
    return false;
});
