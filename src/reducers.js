const reducers =  {
  todos(state,action){
    const {type, payload} = action;
    switch (type) {
      case 'set':
        return payload
      case 'add':
        return  [...state,payload]
        
      case 'remove':
        return state.filter( todo => (todo.id !==payload) )
      default:
        return state;
    }
  },
  count(state,action){
    const {type} = action;
    switch (type) {
      case 'set':
        return state;
      case 'add':
        return  state + 1;
      default:
        return state;
    }
  }
}
function combineReducers(reducers) {
  return function reducer(state,action) {
    const change = {};
    for (let key in reducers) {
      change[key] = reducers[key](state[key],action);
    }
    return {
      ...state,
      ...change
    }
  }
}
export default combineReducers(reducers)