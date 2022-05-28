import React, { PureComponent } from 'react';

//components
import Header from './components/Header';
import Todolist from './components/Todolist';
import Footer from './components/Footer';

//css
import './App.css';
import './css/Todo.css'

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)
const filtersByStatus = (todos = [], status = '', id = '') =>{
  debugger
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETE':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !==id)
    default:
      return todos
  }
}

class App extends PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'todo1',
      isCompleted: true
    },{
      id: 2,
      text: 'todo2',
      isCompleted: false
    }],
    todoEditingId: '',
    isNotCheckedAll: false,
    status: 'ALL'
  }
  componentWillMount(){
    this.setState({
      isNotCheckedAll: isNotCheckedAll(this.state.todosList)
    })
  }

  addTodo = (todo = {}) =>{
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  getTodoEditingId = (id = '') =>{
    this.setState({ todoEditingId : id})
  }

  onEditTodo = (todo = {}, index = -1) =>{
    if(index >=0) {
      const { todosList: list } = this.state
      list.splice(index, 1, todo)
      this.setState({ 
        todosList: list,
        todoEditingId: ''
      })
    }
  }

  checkAllTodos = () => {
    const { todosList, isCheckedAll } = this.state
    this.setState(preState => ({
      todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll})),
      isCheckedAll: !preState.isCheckedAll
    }))
  }

  markCompleted = (id = '') => {
    const { todosList } = this.state
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted}) : todo)
    this.setState(preState => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)
    }))
  }

  setStateFilter = (status = '') => {
    debugger
    const { todosList } = this.state
    this.setState({
      todosList: filtersByStatus(todosList, status),
      status
    })
    
  }

  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filtersByStatus(todosList, 'ACTIVE')
    })
  }

  removeTodo = (id = '') =>{
    const {todosList} = this.state
    this.setState({
      todosList: filtersByStatus(todosList, 'REMOVE', id)
    })
  }

  render(){
    const { todosList, todoEditingId, isCheckedAll, status } = this.state
    return (
      <div className="todoapp">
        
          <Header 
            addTodo={this.addTodo}
            isCheckedAll={isCheckedAll}
          />
          <Todolist 
            todosList={filtersByStatus(todosList, status)}
            getTodoEditingId={this.getTodoEditingId}
            todoEditingId={todoEditingId}
            onEditTodo={this.onEditTodo}
            markCompleted={this.markCompleted}
            isCheckedAll={isCheckedAll}
            checkAllTodos={this.checkAllTodos}
            removeTodo={this.removeTodo}
          />
          <Footer
            setStateFilter = {this.setStateFilter}
            status={status}
            clearCompleted={this.clearCompleted}
            numOfTodos={todosList.length}
            mumOfTodosLeft={filtersByStatus(todosList, 'ACTIVE').length}
          />
      </div>
    );
  }
 
}

export default App;
