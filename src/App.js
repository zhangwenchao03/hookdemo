import React, {useState,useEffect,useRef,useCallback} from 'react';
import {createSet,createAdd,createRemove} from './actionCreater';
import reducer from './reducers';
//  import {TodoList} from './TodoList'
// const TodoList = lazy(() => import('./TodoList'))
// const BatteryContext = React.createContext(60);
// function App() {
//   return (
//     <div>
//       <Suspense fallback = {<div>loading</div>}>
//         <TodoList></TodoList>
//       </Suspense>
      
//     </div>
//   //  <BatteryContext.Provider value={60}>
//   //     <Leaf/>
//   //   </BatteryContext.Provider>
//   );
// }
let idEE = Date.now();
let keySee = "KET";

function Control (props) {
  const {dispatch} = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) {
      return;
    }
    var newTodo = {
      id: idEE++,
      text: newText
    }
    dispatch(createAdd(newTodo));
    inputRef.current.value = '';
  }
  return (
    <form onSubmit = {onSubmit}>
      <input ref={inputRef}></input>
    </form>
  )
}
function Todos (props) {
  const {todos, dispatch} = props;
  return (
    <ul>
      {
        todos.map((todo) => {
          return (
            <TodoItem 
              key = {todo.id}
              todo={todo}
              dispatch={dispatch}
            >
            </TodoItem>
          )
        })
      }
    </ul>
  )
}
function TodoItem(props) {
  const {todo , dispatch} = props;
  return (
  <li onClick = {()=>{dispatch(createRemove(todo.id))}}>{todo.text}</li>
  )
}
// function bindActionCreatorToDispatch (actionCreators, dispatch){
//   const ret = {};
//   for (let key in actionCreators) {
//     ret[key] = function (...arg) {
//       const actionCreator = actionCreators[key];
//       const action = actionCreator(...arg);
//       dispatch(action);
//     }
//   }
//   return ret
// }
let store = {
  todos:[],
  count: 0
}
const TodoList2 = function () {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  // const addTodo =useCallback((todoItem) => {
  //   setTodos(todos =>[...todos,todoItem]);
  // },[]) 
  // const removeTodo =useCallback((id) => {
  //   setTodos(todos => todos.filter( todo => (todo.id !==id) ))
  // },[]) 
  useEffect(() => {
    Object.assign(store, {todos,count})
  }, [todos,count])
  useEffect(() => {
   const todos=JSON.parse(localStorage.getItem(keySee));
   //setTodos(todos);
   dispatch(createSet(todos));
  }, [])
  // const reducer = (state, action)=> {
  //   const {type, payload} = action;
  //   switch (type) {
  //     case 'set':
  //       return {
  //         ...state,
  //         todos: payload
  //       }
  //     case 'add':
  //       return {
  //         ...state,
  //         todos: [...todos,payload],
  //         count: count+1
  //       }
  //     case 'remove':
  //       return {
  //         ...state,
  //         todos:todos.filter( todo => (todo.id !==payload) ),
  //         count: count-1
  //       }
  //     default:
  //       break;
  //   }
  // }
  
  // const dispatch = useCallback((action) => {
  //   const {type, payload} = action;
  //   switch (type) {
  //     case 'set':
  //       setTodos(payload);
  //       break;
  //     case 'add':
  //       setTodos(todos =>[...todos,payload]);
  //       break;
  //     case 'remove':
  //         setTodos(todos => todos.filter( todo => (todo.id !==payload) ))
  //       break;
  //     default:
  //       break;
  //   }
  // },[])
  const dispatch = useCallback((action) => {
    // const state = {
    //   todos,
    //   count
    // };
    const setters = {
      todos: setTodos,
      count: setCount
    }
    debugger
    if ('function' === typeof(action)) {
      action(dispatch, () => store);
      return;
    }
    const newState = reducer(store, action);
    for (let key in newState) {
      setters[key](newState[key])
    }
  },[])
  useEffect(() => {
    localStorage.setItem(keySee,JSON.stringify(todos))
  }, [todos])
  return (
    <div>
      {/* <Control {...bindActionCreatorToDispatch({addTodo:createAdd},dispatch)}></Control> */}
      <Control dispatch={dispatch}></Control>
      <Todos todos={todos} dispatch={dispatch}></Todos>
      <div>{count}</div>
    </div>
  )
}
// function Middle () {
//   return (
//     <Leaf/>
//   )
// }
// function Leaf () {
//   return (
//     <BatteryContext.Consumer>
//       {val => <h1>{val}</h1>}
//     </BatteryContext.Consumer>
//   )
// }
export default TodoList2;
