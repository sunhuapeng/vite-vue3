import axios from "axios";
import {article} from './interface'
export const getMd = async function (){
  const modules = import.meta.glob('../../public/md/*.md')
  let fileList:article[] = []
  // console.log(modules)
  for (const path in modules) {
    const names = path.split('md/')
    const name = names[1]
    await axios.get(path).then(res=>{
      var dom = document.createElement("div");
      dom.innerHTML = res.data;
      // console.dir(dom)
      const title:string = (dom.getElementsByClassName('title')[0] as any).innerText
      const article_id:string = (dom.getElementsByClassName('article_id')[0] as any).innerText
      const create_time:string = (dom.getElementsByClassName('create_time')[0] as any).innerText
      const update_time:string = (dom.getElementsByClassName('update_time')[0] as any).innerText
      const cover_image:string = (dom.getElementsByClassName('cover_image')[0] as any).innerText
      const tag:string = (dom.getElementsByClassName('target')[0] as any).innerText
      const tags = tag.split('|')
      const brief_content:string = (dom.getElementsByClassName('brief_content')[0] as any).innerText
      fileList.push({
        name, // 文件名称
        title, // 文章标题
        article_id, // 文章id
        article_url:path,//文章本地地址
        brief_content, // 简介
        tags, // 标签
        create_time:Number(create_time),// 创建时间
        update_time: Number(update_time),// 更新时间
        detail: res.data, // 详情
        cover_image // 封面
      })
    })
    // fileList.push(names[1])
   }
   return fileList
}