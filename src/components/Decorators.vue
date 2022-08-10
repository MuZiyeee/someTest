<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>{{text}}</h2>
  
    <div class="input-wrap">
      msg: 
      <input type="text" v-model="input">
      <button @click="testFun">此处</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, createDecorator } from 'vue-class-component';

type customObj = { code: number, name?: string, msg: string }

const Log = createDecorator((options, key) => {
  const originMet = options.methods[key]

  options.methods[key] = function wrapperMethod(...args: any[]) {
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

  testFun(): void {
    this.showMe(this.input)
      .then((data: customObj) => { 
        console.log(data);
      })
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


}
</script>
<style lang="scss">
  .input-wrap{
    margin-top: 10px;

    button{
      margin-left: 10px;
    }
  }
</style>