//llama2 大模型（默认响应为英文）
//POST  请求,请求参数(有需要自己构建OpenAI的请求体结构)：
// {
//     "prompt": "用js写一个冒泡排序"
// }

//响应结果
//{
//     "response": {
//         "response": "XXXXXXX"
//     }
// }

import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        try {
            const ai = new Ai(env.AI);
            const requestBody = await request.json();
            if (!requestBody.prompt) {
                return new Response(JSON.stringify({ error: "Missing 'prompt' in request" }), { status: 400 });
            }
            let chatInputs = {
                messages: [
                    { role: 'system', content: 'You are an intelligent AI assistant that can answer all my questions completely and accurately.'},
                    { role: 'user', content: requestBody.prompt }
                ]
            };
            let response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chatInputs);
            return new Response(JSON.stringify({
                response
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }
};