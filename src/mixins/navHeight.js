import { ref } from 'vue'
// 获取导航高度
const offsetTop = ref(0)
let navNode = ''
const getNode = (node) => {
  navNode = node
}
const getNavHeight = () => {
  offsetTop.value = navNode.refs.navbar.$el.offsetHeight
}

export {
  offsetTop,
  getNode,
  getNavHeight
}
