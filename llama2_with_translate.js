//llama2 大模型，此版本为中文响应，其他语言需要可以修改chinese为其他语言

//POST请求 请求参数(有需要自己构建OpenAI的请求体结构)：
//{
//     "prompt": "用js写一个冒泡排序"
// }

//响应结果
//{
//     "response": {
//         "result": "XXXXXXX"
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
      let chatResponse = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chatInputs);
      let rs = await ai.run('@cf/meta/m2m100-1.2b', {
        text: chatResponse.response,
        source_lang: "english",
        target_lang: "chinese"
      });
      let response={
        result:rs.translated_text
      }
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
