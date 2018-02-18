const initialValues = {
  list: [
    {id: 1, name: 'jeff bezos'},
    {id: 2, name: 'bill gates'},
    {id: 3, name: 'warren buffett'},
    {id: 4, name: 'bernard arnault'},
    {id: 5, name: 'amancio ortega'},
    {id: 6, name: 'mark zuckerberg'},
    {id: 7, name: 'carlos slim helu'},
    {id: 8, name: 'larry ellison'},
    {id: 9, name: 'charles koch'},
    {id: 10, name: 'david koch'}
  ],
  selectedPersonId: 2
}

const personsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_PERSON':
      state = {...state, selectedPersonId: action.payload}
      break
  }

  return state
}

export default personsReducer
