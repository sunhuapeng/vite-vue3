import { defineComponent, ref, onMounted, onBeforeMount, reactive, toRef, toRefs } from "vue";
import { getMd } from '../../utils/index'
import './css.scss'
import { article } from '@/utils/interface'
import { moment } from 'tools-sj'
import SideBar from '../side-bar'
export default defineComponent({
  name: 'Articles',
  components: {
    SideBar
  },
  setup() {
    const state = reactive({
      articles: [] as article[],
      tags: ['全部'] as string[],
      tagActive: '全部' as string,
      articlesSort: [] as article[]
    })
    // 排序 过滤
    const sortArticleList = () => {
      const arr = state.articles.filter((tiem: article) => {
        return state.tagActive === '全部' || tiem.tags.indexOf(state.tagActive) !== -1
      })
      const mds = arr.sort((a, b) => {
        return b.create_time - a.create_time
      })
      state.articlesSort = mds
    }
    const changeName = async () => {
      const mds = await getMd()
      mds.forEach((item) => {
        state.tags.push(...item.tags)
        state.tags = [...new Set(state.tags)]
      })
      state.articles = [...mds]
      sortArticleList()
    }
    const formatDate = (date: number) => {
      return moment(date).format('yyyy/mm/dd')
    }

    const sortArticle = (tag: string) => {
      if(state.tagActive === tag) return 
      state.tagActive = tag
      sortArticleList()
    }

    (async () => await changeName())();

    const getDomList = () => state.articlesSort.map(item => (
      <li class="article-item">
        <div class="title ellipsis">{item.title}</div>
        <div class="article-main">
          <div class="left-count">
            <p class="brief_content ellipsis">{item.brief_content}</p>
            <p class="tags-item">
              {item.tags.map((tag: string) => (<span>{tag}</span>))}
            </p>
            <p class="create_time">{formatDate(item.create_time)}</p>
          </div>
          <div class="cover_image">
            <img src={item.cover_image} alt="" />
          </div>
        </div>
      </li>
    ))
    const tagList = () => (
      state.tags.map(tag => (
        <>
          <li onClick={() => sortArticle(tag)} class={{ active: state.tagActive === tag }}>
            <p>{tag}</p>
          </li>
        </>
      ))
    )
    return {
      ...toRefs(state),
      getDomList,
      tagList,
    }
  },
  render() {
    return (
      <>
        <div class="main w">
          <div class="tags">
            <ul>
              {this.tagList()}
            </ul>
          </div>
          <div class="article-list">
            <ul class="articles">
              {this.getDomList()}
            </ul>
            <side-bar></side-bar>
            {/* <div class="side-bar">
              {+new Date()}
            </div> */}
          </div>
        </div>

      </>
    )
  }
})
