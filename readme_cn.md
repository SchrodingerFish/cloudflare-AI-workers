# CloudFlare AI工人
## 结构
> 1. geini.js
> >转发谷歌双子座模型的官方API请求。
> 2. llama2.js
> >使用cloud dflare的llama2模型，响应是英文的，中文支持不好。
> 3. llama_with_translate. js
> >使用cloud dflare的llama2模型，响应是中文，可以根据需要更改为其他语言。
> 4. whisper.js
> >使用Cloudflare的耳语模型，音频转语音，目前不支持中文，文件不要太大。需要结合AI Worker的API Token使用。
> 4. whisper.js
> >使用Cloudflare的stable-diffusion模型，模仿dall-e-3请求和响应。
## 如何使用
> 在cloudflare的AI Worker中选择对饮模型，把代码粘进去，设置自定义域名，部署就可以根据字的音译域名及代码的注释发送请求，每个JavaScript脚本的用法已在代码中注释，详情请阅读代码。享受它们！
## 许可证
> 根据MIT许可证分发。
## 联系方式
> 如果您有任何问题，请通过电子邮件与我联系：SchrodingersFish@outlook.com。