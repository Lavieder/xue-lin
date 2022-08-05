<template>
  <!-- <div class="hover-ball">
    <div class="ball-t" style="--i:1">
    </div>
    <div class="ball-t" style="--i:2">
    </div>
    <div class="ball-t" style="--i:3">
    </div>
    <div class="ball-t" style="--i:4">
    </div>
    <div class="ball-t" style="--i:5">
    </div>
    <div class="ball-t" style="--i:6">
    </div>
    <div class="ball-t" style="--i:7">
    </div>
    <div class="ball-t" style="--i:8">
    </div>
    <div class="ball-t" style="--i:9">
    </div>
    <div class="ball-t" style="--i:10">
    </div>
    <div class="ball-text">
      <span >故障申报</span>
    </div>
  </div> -->
  <div>
    <ul>
      <li v-for="item in 5" :key="item">
        <input type="checkbox" @click.stop="onSelect(item, $event)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onSelect (item, e) {
      console.log(item, e.target.checked)
    }
  }

}
</script>

<style lang="scss" scoped>
// .hover-ball {
//   position: fixed;
//   z-index: 999;
//   top: 495px;
//   right: 0;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-size: 12px;
//   color: #ffffff;
//   .ball-t {
//     background: rgb(41, 57, 201);
//     border-radius: 50%;
//     position: absolute;
//     z-index: 2;
//     animation: ball 3s linear infinite;
//     animation-delay: calc(0.5s * var(--i))
//   }
//   .ball-text {
//     width: 72%;
//     height: 72%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: rgba(41, 57, 201, 1);
//     border-radius: 50%;
//     position: absolute;
//     z-index: 3;
//     animation: text 5s linear 0.5s infinite;
//     span {
//       width: 70%;
//     }
//   }
// }
// @keyframes ball{
//   0% {
//     width: 0;
//     height: 0;
//   }
//   50% {
//     opacity: 1;
//   }
//   100% {
//     width: 100%;
//     height: 100%;
//     opacity: 0;
//   }
// }
// @keyframes text{
//   0% {
//     border: 1px solid rgba(41, 57, 201);
//   }
//   50% {
//     border: 1px solid rgb(255, 255, 255);
//   }
//   100% {
//     border: 1px solid rgba(41, 57, 201);
//   }
// }
</style>
