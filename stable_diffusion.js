//使用cloudflare的stable-diffusion模型，模仿dall-e-3请求和响应，prompt已支持中文输入
//POST请求：
//{
//     "model": "dall-e-3",
//     "prompt": "A beautiful pretty cute Chinese girl",
//     "n": 1,
//     "size": "1920x1080"
// }

//响应
//{
//     "created": 1705588116,
//     "data": [
//         {
//             "url": "https://cdn.ipfsscan.io/ipfs/QmVnHdChTsPodUW1rbGCcc2iooAo4XtZsdiCL1pt35yTDj"
//         }
//     ]
// }

import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        const reqBody = await request.json();

        if (!reqBody.prompt) {
            return new Response(
                JSON.stringify({
                    error: {
                        message: 'prompt is required',
                        type: 'api_error',
                        param: '',
                        code: 'prompt_missing'
                    }
                }),
                {
                    status: 400,
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            );
        }

        const p = reqBody.prompt;
        const n = reqBody.n || 1;
        const size = reqBody.size || '1024x1024';

        const ai = new Ai(env.AI);

        let rs = await ai.run('@cf/meta/m2m100-1.2b', {
            text: p,
            source_lang: "chinese",
            target_lang: "english"
        });

        let prompt=rs.translated_text

        const inputs = {
            prompt: prompt
        };

        const buffer = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

        const formData = new FormData();

        const file = new Blob([buffer], { type: 'image/png' });

        formData.append('file', file);

        const uploadResponse = await fetch('https://cdn.ipfsscan.io/api/v0/add?pin=false', {
            method: 'POST',
            body: formData
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.Hash) {
            throw new Error('Image upload failed');
        }

        const responseBody = {
            created: Math.floor(Date.now() / 1000),
            data: [
                { url: `https://cdn.ipfsscan.io/ipfs/${uploadResult.Hash}` }
            ]
        };

        return new Response(JSON.stringify(responseBody), {
            headers: {
                'content-type': 'application/json'
            }
        });
    }
};
