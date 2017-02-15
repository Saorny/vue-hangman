import * as randomWordService from '../libs/random-word'

export const fetchWord = function ({dispatch}) {
  randomWordService.get().then(word => {
    dispatch('FETCH_WORD', word.data)
  })
}
