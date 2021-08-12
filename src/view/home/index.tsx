import { defineComponent, reactive} from "vue";
import RobotView from '../three/robot'
export default defineComponent({
  name: 'Home',
  components:{
    RobotView
  },
  setup() {
    return () => (
      <>
        <p>首页</p>
      </>
    )
  }
})
