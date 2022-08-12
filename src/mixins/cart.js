import { ref } from 'vue'

const allChecked = ref(false)
// 选中列表
let checkedList = []
let originGoodsList = []
// 接收传递来购物车所有商品的函数
const onOriginGoods = (cartArr, checkedArr) => {
  originGoodsList = cartArr
  checkedList = checkedArr
  if (checkedList.length === originGoodsList.length) {
    allChecked.value = true
  } else {
    allChecked.value = false
  }
}
// 全选
const onAllSelect = (checkboxRefs) => {
  allChecked.value = !allChecked.value
  checkboxRefs.forEach(checkboxEle => {
    if (allChecked.value) {
      checkboxEle.checked = true
      // 深拷贝
      checkedList = [...originGoodsList]
    } else {
      checkedList = []
      checkboxEle.checked = false
    }
  })
}
// 单选
const onOnlySelect = (e, id) => {
  const index = checkedList.indexOf(id)
  if (index >= 0) {
    checkedList.splice(index, 1)
  } else {
    if (e.target.checked) {
      checkedList.push(id)
    }
  }
  if (checkedList.length === originGoodsList.length) {
    allChecked.value = true
  } else {
    allChecked.value = false
  }
}
export {
  allChecked,
  onOriginGoods,
  onAllSelect,
  onOnlySelect,
  checkedList
}
