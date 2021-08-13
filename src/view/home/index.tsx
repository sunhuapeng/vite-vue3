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
        <p class="w">首页</p>
      </>
    )
  }
})
