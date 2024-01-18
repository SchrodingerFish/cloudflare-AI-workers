//目前只支持英文音频转文字
//请求参数,参数类型为form-data，(注意需要结合cloudflare的授权Account.Workers AI的API Token使用)音频文件不能过大，具体请参考cloudflare的官方文档
// header:{
//   "Content-Type":"application/json",
//   "Authorization":"Bearer Your API Token"
// }
// body:{
//  "audio":audio_file(音频文件)
// }

//响应
//{
//     "result": null,
//     "success": false,
//     "errors": [
//         {
//             "code": 7009,
//             "message": "Upstream service unavailable"
//         }
//     ],
//     "messages": []
// }

import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        const formData = await request.formData();
        const audioFile = formData.get('audio'); // 假设音频文件的键是 'audio'

        if (!audioFile || typeof audioFile === 'string') {
            return new Response('No audio file found in the request', { status: 400 });
        }
        const blob = await audioFile.arrayBuffer();
        const ai = new Ai(env.AI);
        const input = {
            audio: [...new Uint8Array(blob)],
        };
        const response = await ai.run("@cf/openai/whisper", input);
        return new Response(JSON.stringify({ input: { audio: [] }, response }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}