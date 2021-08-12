import { RouteRecordRaw} from 'vue-router';

const getFile = async function () {
  const fileList:any[] = []
  const modules = import.meta.glob('./modules/*.ts')

  for (const path in modules) {
   await modules[path]().then((mod) => {
      fileList.push(mod)
    })
  }
  return fileList
}
const getRouter = async function () {
  const routers = []
  const filelist = await getFile()
  for(let i=0;i<filelist.length; i++) {
    routers.push(filelist[i].default as RouteRecordRaw)
  }
  return routers
}
export default getRouter