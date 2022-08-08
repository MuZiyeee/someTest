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
    loadOffset = 50   //距离顶边/底边多少像素触发获取新数据
    listHeight = 600    //列表容器高度

    // 使用唯一键(如数据id)作为列表项的key时不会刷新整个列表所以不需要手动设置列表滚动位置 也就不需要单个元素高度
    // singleHeight = 38   //单条数据 li元素高度

    listScroll(e: Event): void{
      const target = e.target as HTMLElement,   //事件目标
          sTop = target.scrollTop,    //列表垂直滚动位置
          sHeight = target.scrollHeight   //列表垂直滚动总高度

      // 触发靠近顶边 向上滚动 向前获取数据
      if (sTop <= this.loadOffset && this.sliceIndex > 0) {
        this.getScrollUp()
        // target.scrollTop += 380
        
      // 触发靠近底边 向下滚动 向后获取数据
      }else if (sHeight - sTop < this.loadOffset + this.listHeight) {
        this.getScrollDown()
        // target.scrollTop -= 380
      }
    }

    init(): void{
      // 从原始数据中截取一定数量(this.size)的数据渲染
      this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + this.size)
    }

    getScrollDown(): void{
      // 获取一定数量(this.tempSize)的缓冲数据添加到列表尾部
      let tempArr: Array<innerData> = this.originList.slice(this.sliceIndex + this.size, this.sliceIndex + this.size + this.tempSize)
      // 更改渲染数据的起始下标
      this.sliceIndex += this.tempSize

      // 从首部剪去一定数量(this.tempsize)的数据
      this.dataList.splice(0, this.tempSize)
      // 向尾部添加数据
      this.dataList.push(...tempArr)
    }

    getScrollUp(): void{
      // 获取一定数量(this.tempSize)的缓冲数据添加到列表首部
      let tempArr: Array<innerData> = this.originList.slice(this.sliceIndex - this.tempSize, this.sliceIndex)
      // 更改渲染数据的起始下标
      this.sliceIndex -= this.tempSize

      // 从尾部剪去一定数量(this.tempsize)的数据
      this.dataList.splice(-this.tempSize, this.dataList.length - 1)
      // 向首部添加数据
      this.dataList.unshift(...tempArr)
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
      padding: 10px;
      text-align: left;
      font-size: 16px;

      span{
        border: 1px dashed pink;
        margin-right: 5px;
      }
    }
  }
</style>