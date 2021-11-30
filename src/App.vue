<template>
  <div id="app">
    <router-view />
    <el-button @click="show"></el-button>
    <div class="text-white bg-green-500 hover:bg-green-700">2323</div>
    {{ location.x + ',' + location.y }}
  </div>
</template>

<script>
  import { useMouse } from '@vueuse/core'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  export default {
    name: 'App',
    data() {
      return {
        location: '',
      }
    },
    mounted() {
      const { x, y } = useMouse()
      this.location = { x: x.value, y: y.value }
    },
    methods: {
      show() {
        const { isLoading } = useNProgress()
        isLoading.value = true
      },
    },
  }
</script>
