<template>
  <div class="hello">
    <h1> Conway's Game of Life</h1>
    <game-of-life></game-of-life>
  </div>
</template>

<script>
import GameOfLife from './game-of-life'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    GameOfLife
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
