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
        <robot-view></robot-view>
      </>
    )
  }
})
