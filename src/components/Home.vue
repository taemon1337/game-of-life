<template>
  <game-of-life></game-of-life>
</template>
<script>
  import GameOfLife from '@/components/game-of-life'

  export default {
    name: 'Home',
    data () {
      return {}
    },
    components: {
      GameOfLife
    }
  }
</script>
