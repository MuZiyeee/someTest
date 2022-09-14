<template>
  <div class="virtrua-list">
    <ul class="long-list" @scroll="listScroll">
      <li v-for="item in dataList" :key="item.id"  :class="{'list-item':true, 'list-item-hight-light': !(item.id % 10)}">
        <span>id: {{item.id}}</span>

        <span>name: {{item.name}}</span>

        <span>word: {{item.word}}</span>

        <span>time: {{item.timeStrap}}</span>
      </li>
    </ul>

    <div class="menu">
      <button class="my-btn my-btn-primary" @click="scrollUpdate(-1)">向上加载一条</button>
      <button class="my-btn my-btn-primary" @click="scrollUpdate(1)">向下加载一条</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Options } from "vue-class-component"
  import {innerData} from '@/lib/types'
  import longData from "@/lib/long_data";

  @Options({
    watch: {
      sliceIndex(): void{
        // 设置应当渲染的数据
        this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + this.size)
      }
    }
  })

  export default class VirtualList extends Vue{
    originList: Array<innerData> = longData   //原始数据
    dataList: Array<innerData> = []   //渲染数据
    sliceIndex = 0      //当前渲染的数据 首条下标
    size = 50           //渲染的数据数量
    tempSize = 10       //缓冲数量 每次触发靠近顶边/底边时 向前/向后渲染的数据数量
    loadOffset = 20     //刷新阈值 距离顶边/底边多少像素触发渲染新数据
    listHeight = 600    //列表容器高度

    // 当前存在问题 如果 列表刷新时 不受影响的元素的高度之和 小于 容器高度减去刷新阈值 会连续触发刷新导致屏闪 --> (size - tempSize) * singleHeight < listHeight - loadOffset
    // singleHeight = 40   //单条数据 li元素高度 值应为 .list-item 元素的高度

    listScroll(e: Event): void{
      const target = e.target as HTMLElement,   //事件目标
            sTop = target.scrollTop,            //列表垂直滚动位置
            sHeight = target.scrollHeight       //列表垂直滚动总高度
      ;

      // 触发靠近顶边 且 当前渲染的不是第一组数据 向前渲染数据
      if (sTop <= this.loadOffset) {
        this.scrollUpdate(-this.tempSize)
        
      // 触发靠近底边 且 当前渲染的不是最后一组数据 向后渲染数据
      }else if (sHeight - sTop <= this.loadOffset + this.listHeight) {
        this.scrollUpdate(this.tempSize)
      }
    }

    init(): void{
      // 如果原始数据数量 小于 设定的渲染数量 减小渲染数量
      if(this.originList.length < this.size) {
        this.size = this.originList.length
      }
      // 从原始数据中截取一定数量(this.size)的数据渲染
      this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + this.size)
    }

    scrollUpdate(num: number): void{
      let tempIndex = this.sliceIndex + num
      // 如果变更后的 sliceIndex 在合法范围内 更改渲染数据的起始下标
      if (tempIndex >= 0 && tempIndex + this.size < this.originList.length) {
        this.sliceIndex = tempIndex

      // 变更后的 sliceIndex 超出合法范围 设置为极限值
      } else if (tempIndex < 0){
        this.sliceIndex = 0
      } else {
        this.sliceIndex = this.originList.length - 1 - this.size
      }
    }
    
    beforeCreate(): void{
      console.log('beforeC <<<<<<<< comp')
    }
    created(): void{
      console.log('created <<<<<<<< comp')
    }
    beforeMount(): void{
      console.log('beforeM <<<<<<<< comp')
    }
    mounted(): void{
      this.init()
      console.log('mounted <<<<<<<< comp')
    }
    beforeUpdate(): void{
      console.log('beforeUpdate <<<<<<<< comp');
    }
    updated(): void{
      console.log('updated <<<<<<<< comp');
    }
    beforeUnmount(): void{
      console.log('beforeUnmount <<<<<<<< comp');
    }
    unmounted(): void{
      console.log('unmounted <<<<<<<< comp');
    }
  }
</script>

<style lang="scss">
  .virtrua-list{
    display: flex;
    position: relative;

    .long-list{
      max-height: 600px;
      min-width: 600px;
      border: 1px solid #a45839;
      overflow: auto;

      .list-item{
        line-height: 40px;
        text-align: left;
        font-size: 18px;
        margin-left: 10px;

        &.list-item-hight-light{
          span{
            border-width: 2px;
            font-weight: bold
          }
        }

        span{
          border: 1px dashed pink;
          margin-right: 5px;
        }
      }
    }

    .menu{
      height: 200px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      position: absolute;
      right: -120px;
    }
  }
</style>