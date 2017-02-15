
import Bus from '../components/Bus';

export default {
  '/': 'Home',
  '/play-game': 'Game',
  '/won': 'Won',
  '/lost': 'Lost'
}

Bus.$on('game.won', function (word) {
  window.location = 'won';
});

Bus.$on('game.lost', function (word) {
  window.location = 'lost?word=' + word;
});