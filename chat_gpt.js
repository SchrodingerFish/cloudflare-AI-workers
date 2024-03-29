//ChatGPT API代理 支持流式响应，根据OPENAI官方文档正常调用即可，最好换成自定义域名，以免被墙或者另一个方法，直接使用cf的AI Gateway网关访问OpenAI
// curl调用demo：
// curl --location 'http://你的自定义域名/v1/chat/completions' \
// --header 'Authorization: Bearer sk-xxxxxxxxxxxxxxx' \
// --header 'Content-Type: application/json' \
// --data '{
//    "model": "gpt-3.5-turbo",
//   "messages": [{"role": "user", "content": "Hello!"}]
//  }'


const TELEGRAPH_URL = 'https://chat.openai.com';

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url);
    const headers_Origin = request.headers.get("Access-Control-Allow-Origin") || "*"
    url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');
    const modifiedRequest = new Request(url.toString(), {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
    });
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
    // 添加允许跨域访问的响应头
    modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
    return modifiedResponse;
}

