import { icp_gpt2 } from '../../declarations/icp_gpt2';
import { encode, decode } from 'gpt-tokenizer/encoding/p50k_base';


export default class IcpAiSession {

    constructor() {
        this.session = [];
    }

    async prompt(text) {

        console.log('prompt:', text);

        // Tokenize
        const tokens = encode(text);
        console.log('tokens:', tokens);

        // Call model
        let answer = {};
        try {
            answer = await icp_gpt2.model_inference(18, tokens);
            console.log('answer:', answer);
        }
        catch(err) {
            console.error(err);
            return null;
        }

        // Decode answer
        if ('Ok' in answer) {
            const response = decode(answer.Ok);
            console.log('decoded:', response);
            this.session.push({prompt: tokens, result: Array.from(answer.Ok, bigInt => Number(bigInt))});
            console.log('session:', this.session);
            return response;
        }

        return null;
    }

}
