const initialValues = {
  list: [],
  selectedPersonId: 0
}

const personsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PERSON':
      state = {...state, selectedPersonId: action.payload}
      break
    case 'UPDATE_PERSONS_LIST':
      state = {...state, list: action.payload}
      break
  }

  return state
}

export default personsReducer
