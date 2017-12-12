<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif"/>
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/style/variable.scss";
  .loading {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .desc {
      margin-left: 10px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
</style>
