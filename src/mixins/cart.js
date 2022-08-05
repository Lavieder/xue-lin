import { ref } from 'vue'

const allChecked = ref(false)
const isChecked = ref(false)
// 选中列表
const checkedList = []
let originGoodsList = []
// 接收传递来购物车所有商品的函数
const onOriginGoods = (cartArr, checkedArr) => {
  originGoodsList = cartArr
  // checkedList = checkedArr
  // console.log(originGoodsList, checkedList)
}
// 页面加载返回选中的数据
// const getCheckedGoods = () => {
//   checkedList.forEach(() => {
//     e
//   })
// }
// 全选
const onAllSelect = () => {
  allChecked.value = !allChecked.value
  isChecked.value = allChecked.value
}
// 单选
const onOnlySelect = (e, id) => {
  // console.log(e.target.checked)
  if (e.target.checked) {
    checkedList.push(id)
  } else {
    const index = checkedList.indexOf(id)
    if (index >= 0) {
      checkedList.splice(index, 1)
    }
  }
  // console.log(checkedList)
  if (checkedList.length === originGoodsList.length) {
    allChecked.value = true
  } else {
    allChecked.value = false
  }
}
export {
  allChecked,
  isChecked,
  onOriginGoods,
  onAllSelect,
  onOnlySelect
}
