<template>
  <div class="about">
    <h1>This is an about page</h1>

    <!-- <div class="img-wrap">
      <img src="../assets/微信图片_20211109191404.jpg" alt="" ref="theImg">
    </div> -->

    <div class="long-list" @scroll="listScroll($event)" ref="list">
      <ul>
        <!-- <li>top line</li> -->

        <li v-for="(item, index) in dataList" :key="index" class="list-item">
          <span>
            id: {{item.id}} 
          </span>

          <span>
            name: {{item.name}} 
          </span>

          <span>
            word: {{item.word}} 
          </span>

          <span>
            time: {{item.timeStrap}}
          </span>
        </li>

        <!-- <li>bottom line</li> -->
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-class-component";
  import {innerData} from '@/lib/types'
  import longData from "@/lib/long_data";

  export default class About extends Vue {
    originList: Array<innerData> = longData
    dataList: Array<innerData> = []
    sliceIndex = 0




    listScroll(e: Event){
      const target = e.target as HTMLBodyElement
      let sTop = target.scrollTop,
          sHeight = target.scrollHeight

      if (sTop <= 50 && this.sliceIndex > 0) {
        this.sliceUp()
        target.scrollTop += 380
        
      }else if (sHeight - sTop < 650) {
        this.sliceDown()
        target.scrollTop -= 380
      }
    }

    sliceData(){
      this.dataList = this.originList.slice(this.sliceIndex, this.sliceIndex + 50)
    }

    sliceDown(){
      let tempArr: Array<innerData> = this.originList.slice(this.sliceIndex + 50, this.sliceIndex + 60)
      this.sliceIndex += 10

      this.dataList.splice(0, 10)
      this.dataList.push(...tempArr)
    }

    sliceUp(){
      let tempArr: Array<innerData> = this.originList.slice(this.sliceIndex - 10, this.sliceIndex)
      this.sliceIndex -= 10

      this.dataList.splice(-10, this.dataList.length - 1)
      this.dataList.unshift(...tempArr)
    }
    
    mounted() {
      this.sliceData()
    }
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

  .long-list{
    max-height: 600px;
    border: 1px solid #a45839;
    overflow: auto;

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