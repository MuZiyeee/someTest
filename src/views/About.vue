<template>
  <div class="about">
    <h1>下面是虚拟列表组件</h1>

    <VirtualList/>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import VirtualList from "@/components/VirtualList.vue";

  @Options({
    components: {
      VirtualList
    }
  })

  export default class About extends Vue {
    beforeCreate(): void{
      console.log('beforeC')
    }
    created(): void{
      console.log('created')
    }
    beforeMount(): void{
      console.log('beforeM')
    }
    mounted(): void{
      console.log('mounted')
    }
    beforeUpdate(): void{
      console.log('beforeUpdate');
    }
    updated(): void{
      console.log('updated');
    }
    beforeUnmount(): void{
      console.log('beforeUnmount');
    }
    unmounted(): void{
      console.log('unmounted');
    }
  }
</script>
<style lang="scss" scoped>
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