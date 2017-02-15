<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="play-game">Play again</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Congratulations! You won the game!'
    }
  }
}
</script>
