<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>{{text}}</h2>
  
    <div class="input-wrap">
      msg: 
      <input type="text" v-model="input">
      <button class="my-btn-primary" @click="testFun">此处</button>
    </div>

    <div class="transition-wrap my-btn-primary" @mouseenter="show = true" @mouseleave="show = false" @click="show = !show">
      <div class="m-flex show-text">
        <!-- <transition name="showDiv"> -->
          过渡效果
        <!-- </transition> -->
      </div>
      切换
    </div>

    
  </div>
</template>

<script lang="ts">
import { Options, Vue, createDecorator } from 'vue-class-component';

type customObj = { code: number, name?: string, msg: string }

const Log = createDecorator((options, key) => {
  const originMet = options.methods[key]  //保存初始函数

  options.methods[key] = function wrapperMethod(...args: any[]) {
    // todo...  执行装饰器自定义操作
    
    // 在这里返回原始函数的执行结果 不影响被装饰器包裹的函数返回值
    return originMet.apply(this, args)
  }
})

@Options({
  name: 'Decorators',
  props: {
    msg: String
  }
})

export default class HelloWorld extends Vue {
  msg!: string
  text = '0'
  input = '0'
  show = false

  testFun(): void {
    this.showMe(this.input)
      .then((data: customObj) => { 
        console.log(data);
        throw {message: 'aaa'}
      })
      .catch(console.log)
      .then(_ => console.log(2))
      .then(_ => console.log(3))
      .finally(() => console.log('fin'))
      .then(_ => console.log('fin th'))
      .finally(() => console.log('fin2'))
      .finally(() => console.log('fin3'))
  }


  @Log
  showMe(str: string): Promise<customObj> {

    let sth: customObj = { code: 1, name: this.$options.name, msg: str }

    this.text = this.input

    return new Promise((resolve: (data: customObj) => void, reject: (err: string) => void) => {
      if (sth.msg) {
        resolve(sth)
      } else {
        const errMsg = 'msg为空'
        reject(errMsg)
      }
    })
  }

  mounted():void{
    let arr = new Array(1000)
    for(let i = 0; i < 1000; i++){
      arr[i] = {num: i}
    }
    
    console.log(Date.now());
    arr.forEach(item => {
      arr.forEach(inItem => {
        if (!(item.num % 25) && item.num === inItem.num){
        //   console.log(item)
        }
        // console.log(1000)
      })
    })
    console.log(Date.now())
  }
}
</script>
<style lang="scss">
  .hello{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .input-wrap{
    margin: 10px 0;

    button{
      margin-left: 10px;
    }
  }

  .transition-wrap{
    display: flex;
    justify-content: center;
    border: 2px solid #2919;
    line-height: 20px;

    .show-text{
      width: 0px;
      opacity: 0;
      transition: all .5s;
      word-break: keep-all;
      overflow: hidden;
    }
    &:hover{
      .show-text{
        width: 48px;
        opacity: 1;
      }
    }
  }
</style>