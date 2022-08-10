<template>
  <div class="home">
    <Decorators msg="点击 此处 后会在控制台打印一个Promise回调"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Decorators from '@/components/Decorators.vue'; // @ is an alias to /src

@Options({
  components: {
    Decorators,
  },
})
export default class Home extends Vue {}
</script>
