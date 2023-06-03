
console.clear();
const elToggle = document.querySelector('.toggle--wrapper');
const elApp = document.querySelector('.container');


const machine = {
  initial: elApp.dataset.state,//'day',
  states: {
    day: {
      on: {
        TOGGLE: 'night'
      }
    },
    night: {
      on: {
        TOGGLE: 'day'
      }
    },
  }
};


elToggle.addEventListener('click', (e) => {
  const currentState = elApp.dataset.state;
  const nextState = machine.states[currentState].on.TOGGLE;
  toggleState(nextState);
})

const toggleState = (state) => {
  elApp.dataset.state = state;
}