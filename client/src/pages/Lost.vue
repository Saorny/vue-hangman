<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="play-game">Play again</a>
  </div>
</template>

<script>
export default {
  data () {
  	console.log(this);
    return {
      msg: 'You lost the game :('
    }
  }
}
</script>
