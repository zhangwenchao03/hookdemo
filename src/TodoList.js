import React, {useState} from 'react'
 const TodoList = () => {
  const [inputValue, setInputValue] = useState("aaa");
  const [list, setInputList] = useState([]);
  function handleChange (e) {
    setInputValue(e.target.value)
  }
  function handleClick () {
     const newList = JSON.parse(JSON.stringify(list))
     newList.push(inputValue)
     setInputValue('')
     setInputList(newList)
  }
  function handleDelete (index) {
    const newList = JSON.parse(JSON.stringify(list))
    newList.splice(index, 1)
    setInputList(newList)
  }
  return (
    <div>
      <input 
        value={inputValue}
        onChange={handleChange}
      ></input>
      <button 
        onClick = {handleClick}
      >提交</button>
      <ul>
        {
          list.map((item, index) => (
            <li onClick={() => {handleDelete(index)}} key={index}>{item}</li>
          ))
        }
      </ul>
    </div>
  )
}
export default TodoList