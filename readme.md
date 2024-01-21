# CloudFlare AI Workers
## Structure
> 1. gemini.js 
> >Forwarding official API requests for Google Gemini models.
> 2. llama2.js 
> >To use Cloudflare's llama2 model, the response is in English, and the Chinese support is not good.
> 3. llama_with_translate.js 
> >To use Cloudflare's llama2 model, the response is Chinese, which can be changed to other languages according to requirements.
> 4. whisper.js 
> >In order to use Cloudflare's whisper model, audio to speech, Chinese is not currently supported, and the file should not be too large. It needs to be used in combination with the API Token of AI Worker.
> 5. stable_diffusion.js
> >Use Cloudflare's stable-diffusion model to mimic dall-e-3 requests and responses.
> 6. chat_gpt.js
> >ChatGPT API proxy, supports streaming response, and can be called normally according to the official OPENAI document. It is best to change it to a custom domain name to avoid being blocked.
## How to use
> Select the drink model in Cloudflare's AI Worker, stick the code in, set a custom domain name, and the deployment can send requests according to the transliteration domain name of the word and the comments of the code.The usage of each JavaScript script has been commented in the code, please read the code for details.Enjoy them!
## License
> Distributed under the MIT License. 
## Contact
> If you have any questions, please contact me by email: SchrodingersFish@outlook.com.

