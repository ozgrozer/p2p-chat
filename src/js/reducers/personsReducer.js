const fakePersons = require('./fakePersons.js')

const initialValues = {
  list: fakePersons,
  selectedPersonIndex: 2
}

const personsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PERSON':
      state = {...state, selectedPersonIndex: action.payload}
      break
  }

  return state
}

export default personsReducer
