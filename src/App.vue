<template>
  <div id="app">
    <router-view />
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
