import IcpAiSession from './IcpAiSession.js';


document.querySelector('form').addEventListener('submit', async (e) => {

    // Button
    e.preventDefault();
    const button = e.target.querySelector('button');
    button.setAttribute('disabled', true);

    // Get inputs
    const prompt = document.getElementById('name').value.toString();
    const maxtokens = parseInt(document.getElementById('max_tokens').value);
    const loops = parseInt(document.getElementById('loops').value);

    // Prompt AI
    const ai = new IcpAiSession({maxTokens: maxtokens});
    console.log('Pass 1', '-------------------');
    await ai.prompt(prompt);

    for (let x = 0; x < loops - 1; x ++) {
        console.log('Pass', x + 2, '-------------------');
        await ai.next();
    }
    
    // Enable button
    button.removeAttribute('disabled');

    // Display message
    document.getElementById('greeting').innerText = ai.answer();
 
    return false;
});
