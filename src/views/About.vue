<template>
  <div class="about">
    <h1>This is an about page</h1>

    <!-- <div class="img-wrap">
      <img src="../assets/微信图片_20211109191404.jpg" alt="" ref="theImg">
    </div> -->

    <VirtualList/>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import VirtualList from "@/components/virtual-list/index.vue";

  @Options({
    components: {
      VirtualList
    }
  })

  export default class About extends Vue {

  }
</script>
<style lang="scss">
  .about{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .img-wrap{
    width: 400px;
    border: 1px dashed pink;
    overflow: hidden;

    img{
      width: 800px;
      margin-left: -188px;
    }
  }
</style>