<template>
  <div v-if="wordToFind === ''">
    <game-setter
      v-bind:initial-settings=gameSettings
      v-on:change-setting=changeSetting
      ></game-setter>
    <div><button @click="getNewWord">Start</button></div>
  </div>
  <div v-else-if="hasWon === null">
    <game-interface
      v-bind:initial-lives=initialLives
      v-bind:word-to-find=wordToFind
      v-on:game-over=gameOver>
    </game-interface>

  </div>
  <div v-else>
    <score-display
      v-if="playerData !== null"
      v-bind:player-data=playerData
      v-bind:has-won=hasWon>
    </score-display>
  </div>
</template>

<script>
  import Bus from '../components/Bus';
  import { getWord } from '../vuex/getters';
  import { fetchWord } from '../vuex/actions';
  import randomWordService from '../libs/random-word';
  import GameSetter from '../components/Game/GameSetter';
  import GameRegistryService from '../libs/register-game';
  import ScoreDisplay from '../components/Game/ScoreDisplay';
  import GameInterface from '../components/Game/GameInterface';

  export default {
    vuex: {
      getters: {
        word: getWord
      },
      actions: {
        fetchWord
      }
    },
    data () {
      return {
        wordToFind: '',
        playerData: null,
        hasWon: null,
        initialLives: 5,
        gameSettings: {
          nickname: 'Player',
          level: 0,
          lang: 'fr'
        }
      }
    },
    ready () {
      this.fetchWord()
    },
    methods: {
      getNewWord () {
        let filters = {
          level: this.gameSettings.level,
          lang: this.gameSettings.lang
        };

        randomWordService
          .getRandomWord(filters)
          .then((word) => {
            this.wordToFind = word;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      gameOver(hasWon) {
//        let message = hasWon === true ? 'game.won' : 'game.lost';
        let that = this;
        let gameData = {
          player: this.gameSettings.nickname,
          level: this.gameSettings.level,
          hasWon: hasWon.toString()
        };

        this.hasWon = hasWon;
        GameRegistryService
          .registerGame(gameData)
          .then((res) => {
            that.playerData =  JSON.parse(res);
          });

//        Bus.$emit(message, this.wordToFind);
      },
      changeSetting(param) {
        this.gameSettings[param.key] = param.value;
      }
    },
    components: {
      'game-interface': GameInterface,
      'score-display': ScoreDisplay,
      'game-setter': GameSetter
    }
  }
</script>
