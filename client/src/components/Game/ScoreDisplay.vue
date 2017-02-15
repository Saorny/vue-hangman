<template>
    <div>
        <button><a href="play-game">Play again</a></button>
        <h1>{{ getMessage }}</h1>
        <h3>{{ player.name }}, here is your history game score</h3>
        <div>
            <h3>Victories</h3>
            <ul>
                <li v-for="value, key in player.victories">
                    {{ key }}: {{ value }}
                </li>

            </ul>
        </div>
        <div>
            <h3>Defeats</h3>
            <ul>
                <li v-for="value, key in player.defeats">
                    {{ key }}: {{ value }}
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {

        },
        data () {
            return {
                player: this.playerData.response
            }
        },
        props: {
            playerData: Object,
            hasWon: Boolean
        },
        computed: {
            getMessage: function () {
                return this.hasWon ? 'You won!' : 'You lost!';
            }
        }
    }
</script>
