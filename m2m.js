//示例为英文翻译中文，其他支持语言：法语、西班牙语、阿拉伯语、俄语、德语、日语、葡萄牙语、印地语
//POST请求，请求参数
//  {
// 		"text": "My name is Red and I'm glad to meet you.",
// 		"source_lang": "english",
// 		"target_lang": "chinese"
// 	}

//{
//   "response": {
//        "translated_text": "あなたは中国が好きですか?"
//    }
// }

//翻译模型m2m100-1.2b
import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const inputs = await request.json();

    const ai = new Ai(env.AI);
    const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);

    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};