<template>
  <van-search v-model="value" placeholder="思琪的初恋乐园" shape="round" @search="onSearch" ></van-search>
</template>

<script>
import { Search } from 'vant'
import { ref } from 'vue'

export default {
  components: {
    [Search.name]: Search
  },
  setup () {
    const value = ref('')
    const onSearch = (value) => {
      console.log(value)
    }
    return {
      value, onSearch
    }
  }
}
</script>

<style>

</style>
