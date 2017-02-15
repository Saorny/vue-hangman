<template>
  <table v-else>
    <tr><td><a href="play-game">Quit current game</a></td></tr>
    <tr><td><span>{{ displayedWord }}</span></td></tr>
    <tr><td><span>{{ lives }}</span></td></tr>
    <tr><td><input type="text" maxlength="1" style="text-transform:uppercase" placeholder="Enter letter"
      v-model="letter" @keyup.enter="enterLetter" :disabled="!isPlaying" /></td></tr>

  </table>
</template>

<script>
  export default {
    methods: {
      hideWord(word) {
        return word.replace(/[a-z]/gi, '_');
      },
      enterLetter() {
        if (this.isInputAcceptable()) {
          this.letter = this.letter.toUpperCase();
          if (this.isLetterCorrect()) {
            this.displayOccurences();
            if (this.hasWon()) {
              this.gameOver(true);
            }
          }
          else {
            --this.lives;
            if (this.hasLost()) {
              this.gameOver(false);
            }
          }
          this.resetInput();
        }
      },
      isInputAcceptable() {
        return this.letter.length === 1;
      },
      isLetterCorrect() {
        return this.wordToFind.indexOf(this.letter) !== -1 && this.displayedWord.indexOf(this.letter) === -1;
      },
      displayOccurences() {
        let indices = [];
        for (let i = 0 ; i < this.wordToFind.length ; ++i) {
            if (this.wordToFind[i] === this.letter) {
              indices.push(i);
            }
        }
        indices.forEach((index) => {
          this.displayedWord = this.displayedWord.substr(0, index) +
                               this.letter +
                               this.displayedWord.substr(index + 1);
        });
      },
      hasWon() {
        return this.displayedWord.indexOf('_') === -1;
      },
      hasLost() {
        return this.lives === 0;
      },
      resetInput() {
        this.letter = '';
      },
      gameOver(hasWon) {
        this.playing = false;
        this.$emit('game-over', hasWon);
      }
    },
    data () {
      return {
        displayedWord: this.hideWord(this.wordToFind),
        lives: this.initialLives,
        letter: '',
        playing: true
      }
    },
    props: {
      initialLives: Number,
      wordToFind: String
    },
    computed: {
      isPlaying: function () {
        return this.playing
      }
    }
  }
</script>
