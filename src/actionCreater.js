export function createSet(payload){
  return {
    type: 'set',
    payload
  }
}
export function createAdd(payload){
  return (dispatch, getState) => {
    setTimeout(() => {
      const {todos} = getState();
      if (!todos.find(todo => todo.text === payload.text)) {
        dispatch({
          type: 'add',
          payload
        })
      }
    },3000);
  }
}
export function createRemove(payload){
  return {
    type: 'remove',
    payload
  }
}