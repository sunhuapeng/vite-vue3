import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
let width = window.innerWidth
let height = window.innerHeight
let modelGroup = new THREE.Group()
const frustumSize = 45;
let aspect = width / height;
let objloader = new OBJLoader()
var scene = new THREE.Scene(), // 场景
  camera = new THREE.OrthographicCamera(
    frustumSize * aspect / - 2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / - 2,
    -1000, 1000),
  axesHelper = null,
  renderer = new THREE.WebGLRenderer({ // 渲染器
    antialias: true, //抗锯齿
  }),
  container = null, // dom容器
  controls: any
scene.add(modelGroup)

const animate = () => {
  requestAnimationFrame(animate);
  controls.update(); //更新控制器
  renderer.render(scene, camera);
}

const onWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  aspect = width / height;
  camera.left = - frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = - frustumSize / 2;
  camera.updateProjectionMatrix();
  controls.update(); //更新控制器
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const ready = function (id: string) {
  container = document.getElementById(id) as HTMLElement
  container.appendChild(renderer.domElement)

  scene.background = new THREE.Color(0xffffff)

  scene.position.setY(15)

  renderer.setPixelRatio(window.devicePixelRatio); //设置渲染的比例
  renderer.setSize(width, window.innerHeight); //设置渲染的尺寸

  camera.position.set(0, 0, 10)
  const canvasDom = document.querySelector("#" + id + " canvas") as HTMLElement
  controls = new OrbitControls(
    camera,
    canvasDom
  );

  // 环境光
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // 半球光
  const hemLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.5);
  hemLight.position.set(1, 1, -1)
  scene.add(hemLight);

  axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);
  animate()
}

// 加载模型
const LoadModel = function (url: string): any {
  return new Promise((resolve, reject) => {
    objloader.load(url, (obj) => {
      obj.scale.set(0.1, 0.1, 0.1)
      resolve(obj)
    })
  })
}
export async function init(id: string) {
  ready(id)

  const head = await LoadModel('https://sunhuapeng.s3.cn-north-1.jdcloud-oss.com/head.obj')
  console.log('head', head)
  const body = await LoadModel('https://sunhuapeng.s3.cn-north-1.jdcloud-oss.com/body.obj')
  modelGroup.add(head)
  console.log('body', body)
  modelGroup.add(body)
  window.addEventListener("resize", onWindowResize, false);
}