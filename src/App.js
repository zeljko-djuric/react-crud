import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';
import loadingGif from './loading.gif';

class App extends Component {

  constructor(){
    super();
    this.state={
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    }

    this.apiUrl = 'https://5bc0b60684e95e001342c259.mockapi.io';

    // this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.alert = this.alert.bind(this);
  }

  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);
    this.setState({
      todos: response.data,
      loading: false
    })
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

  async addTodo(){
    const response = await  axios.post(`${this.apiUrl}/todos`,{
    name: this.state.newTodo
    });    
    const todos = this.state.todos;
    todos.push(response.data);

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

  async deleteTodo(index){
    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

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

  async updateTodo(){
   const todo = this.state.todos[this.state.editingIndex];
   const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
     name: this.state.newTodo
   })
   const todos = this.state.todos;
   todos[this.state.editingIndex] = response.data;
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
            this.state.loading &&
            <img src={loadingGif} alt=""/>
          }

          {
          (!this.state.editing || this.state.loading) && 
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
