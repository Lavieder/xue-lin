<template>
  <router-view/>
  <tabbar></tabbar>
</template>

<script>
import Tabbar from 'components/tabbar/tabbar'

export default ({
  components: {
    Tabbar
  },
  setup () {

  }
})
</script>

<style lang="scss">
@import 'assets/css/base.scss';
</style>
