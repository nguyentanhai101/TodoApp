import React, {memo, useState} from "react";
import Todo from "./Todo";

const Todolist = memo(props =>{
    const{ todosList, isCheckedAll, checkAllTodos } = props
    const [checker, setChecker] = useState(false)
    return(
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={checker} onChange={()=>setChecker(isCheckedAll)}/>
            <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => <Todo key={todo.id} {...{todo}} {...props} index={index}/>)
                }
            </ul>
        </section>
    )
}
)
export default Todolist