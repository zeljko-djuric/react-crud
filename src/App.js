import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
class App extends Component {

  constructor(){
    super();
    this.state={
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [{
        id: 1, name: 'Play basketball'
      },{
        id: 2, name: 'Buy some clothes'
      },{
        id: 3, name: 'Write some code'
      },{
        id:4, name: 'Wach movies'
      }]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.alert = this.alert.bind(this);
  }

  // handleChange(event){
  //   this.setState({
  //     newTodo: event.target.value
  //   })
  // }

  alert(notification){
    this.setState({
      notification
    })

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 1000);
  }

  handleChange = (event) =>{
    this.setState({
      newTodo: event.target.value
    })
  }

  addTodo(){
    const newTodo={
      name: this.state.newTodo,
      id: this.generateTodoId()
    }
    
    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    })

    this.alert('Todo added successfully.');
  }

  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if(lastTodo){
      return lastTodo.id +1;
    }

    return 1;
  }

  deleteTodo(index){
    const todos = this.state.todos;
    delete todos[index];
    this.setState({todos: todos});
    this.alert('Todo deleted successfully.');

  }

  editTodo(index){
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    })
  }

  updateTodo(){
   const todo = this.state.todos[this.state.editingIndex];

   todo.name = this.state.newTodo;

   const todos = this.state.todos;
   todos[this.state.editingIndex] = todo;
   this.setState({todos, editing: false, editingIndex: null});

   this.alert('Todo updated successfully.');

  }

  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <div className="container">
        {
          this.state.notification && 
          <div className="alert mt-3 alert-success">
            <p className="text-center">{this.state.notification}</p>
          </div>
        }
          
          <input type="text" name="todo" className="my-4 form-control" placeholder="Add a new todo" onChange={this.handleChange} value={this.state.newTodo} />
          <button onClick={this.state.editing ? this.updateTodo : this.addTodo} className="btn-success mb-3 form control" disabled={this.state.newTodo.length < 4}>
            {this.state.editing ? 'Update todo' : 'Add todo'}
          </button>
          {
          !this.state.editing && 
          <ul className="list-group">
          {this.state.todos.map((item, index) => {
            return <ListItem
              key={item.id}
              item={item}
              editTodo={() => {this.editTodo(index);}}
              deleteTodo={() => {this.deleteTodo(index);}}
            />
            })}  
         </ul>
          }
        </div>


      </div>
    );
  }
}

export default App;
