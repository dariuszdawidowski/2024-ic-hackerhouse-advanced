import { icp_gpt2 } from '../../declarations/icp_gpt2';
import { encode, decode } from 'gpt-tokenizer/encoding/p50k_base';


export default class IcpAiSession {

    constructor(args) {

        this.session = {
            prompt: [],
            result: []
        };
        this.final = [];
        this.maxTokens = ('maxTokens' in args) ? args.maxTokens : 15;

    }

    async prompt(text) {

        console.log('prompt:', text);

        // Tokenize
        const tokens = encode(text);
        console.log('tokens:', tokens);

        // Call model
        let answer = {};
        try {
            answer = await icp_gpt2.model_inference(this.maxTokens, tokens);
            console.log('answer:', answer);
        }
        catch(err) {
            console.error(err);
            return null;
        }

        // Decode answer
        if ('Ok' in answer) {
            const response = decode(answer.Ok);
            console.log('decoded:', response.trim());
            this.session.prompt = tokens;
            this.session.result = Array.from(answer.Ok, bigInt => Number(bigInt));
            this.final.push(...this.session.result);
            console.log('session:', this.session);
            return response;
        }

        return null;
    }

    async next() {

        // Decrease max tokens
        if (this.maxTokens > 1) this.maxTokens = this.maxTokens - 1;

        // Concat prompt + result
        this.session.prompt.push(...this.session.result);
        console.log('tokens:', this.session.prompt);

        // Call model
        let answer = {};
        try {
            answer = await icp_gpt2.model_inference(this.maxTokens, this.session.prompt);
            console.log('answer:', answer);
        }
        catch(err) {
            console.error(err);
            return null;
        }

        // Decode answer
        if ('Ok' in answer) {
            this.session.result = Array.from(answer.Ok, bigInt => Number(bigInt));
            this.final.push(...this.session.result);
            console.log('decoded:', decode(answer.Ok).trim());
            console.log('session:', this.session);
        }

        return null;
    }

    answer() {
        const response = decode(this.final);
        return response.trim();
    }

}
