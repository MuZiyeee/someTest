<template>
  <div class="long-list" @scroll="listScroll($event)" ref="list">
    <ul>
      <li v-for="item in dataList" :key="item.id" class="list-item">
        <span>id: {{item.id}}</span>

        <span>name: {{item.name}}</span>

        <span>word: {{item.word}}</span>

        <span>time: {{item.timeStrap}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Vue } from "vue-class-component"
  import {innerData} from '@/lib/types'
  import longData from "@/lib/long_data";

  export default class VirtualList extends Vue{
    originList: Array<innerData> = longData   //原始数据
    dataList: Array<innerData> = []   //渲染数据
    sliceIndex = 0    //当前渲染的数据 首条下标
    size = 50   //渲染的数据数量
    tempSize = 10   //每次触发靠近顶边/底边时 向前/向后获取的数据数量
    loadOffset = 50   //刷新阈值 距离顶边/底边多少像素触发获取新数据
    listHeight = 600    //列表容器高度

    // 如果 列表刷新时 不受影响的元素的高度之和 小于 容器高度减去刷新阈值 会连续触发刷新导致屏闪 => (size - tempSize) * singleHeight < listHeight - loadOffset
    // singleHeight = 40   //单条数据 li元素高度 值应为 .lisit-item 元素的高度

    listScroll(e: Event): void{
      const target = e.target as HTMLElement,   //事件目标
            sTop = target.scrollTop,            //列表垂直滚动位置
            sHeight = target.scrollHeight       //列表垂直滚动总高度

      // 触发靠近顶边 且 当前渲染的不是第一组数据 向前获取数据
      if (sTop <= this.loadOffset && this.sliceIndex > 0) {
        this.scrollUpdate(-1)
        
      // 触发靠近底边 且 当前渲染的不是最后一组数据 向后获取数据
      }else if (sHeight - sTop < this.loadOffset + this.listHeight && this.sliceIndex + this.size < this.originList.length) {
        this.scrollUpdate(1)
      }
    }

    init(): void{
      if(this.originList.length < this.size) {
        this.size = this.originList.length
      }
      // 从原始数据中截取一定数量(this.size)的数据渲染
      this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + this.size)
    }

    scrollUpdate(num: number){
      // 更改渲染数据的起始下标
      this.sliceIndex += (this.tempSize * num)
      // 设置应当渲染的数据
      this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + this.size)
    }
    
    mounted(): void {
      this.init()
    }
  }
</script>

<style lang="scss">
  .long-list{
    max-height: 600px;
    width: 600px;
    border: 1px solid #a45839;
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar{
      display: none;
    }

    .list-item{
      line-height: 40px;
      text-align: left;
      font-size: 18px;

      span{
        border: 1px dashed pink;
        margin-right: 5px;
      }
    }
  }
</style>