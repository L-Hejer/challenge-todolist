import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // 1. initialize the state
    this.state = {
      // empty input field to use to add a todo
      inputText: '',
      // todos array containing our first items
      todos: [
        { id: 1, text: 'Item 1', isCompleted: false },
        { id: 2, text: 'Item 2', isCompleted: false },
      ],
    };
  }

  // 3. set the input value
  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  // 5. Create the addTodo function
  addTodo = (e) => {
    // stop the default behaviour of the form
    e.preventDefault();
    // Check if the input is not empty
    this.state.inputText &&
      // return the old todos and add a new one
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: this.state.todos.length + 1,
            text: this.state.inputText,
            isCompleted: false,
          },
        ],
        // Clear the input value
        inputText: '',
      });
  };

  // 7. Create the deleteTodo function
  deleteTodo = (i) => {
    this.setState({
      // filter the todos depending on their ids
      todos: this.state.todos.filter((todo, index) => index !== i),
    });
  };

  // 9. Create the completeTodo function
  completeTodo = (i) => {
    this.setState({
      // map the todos and depending on the id change the value of isCompleted
      todos: this.state.todos.map((todo, id) =>
        id === i ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Todos</h1>
        <form>
          <input
            type="text"
            placeholder="Add todo"
            name="todo"
            // 4. Add the onChange event and the input value
            value={this.state.inputText}
            onChange={this.handleChange}
          />
          {/* 6. add the onClick event to the submit button */}
          <button onClick={this.addTodo}>Submit</button>
        </form>
        <ul className="todo-list">
          {/* 2. Map the todos array */}
          {this.state.todos.map((todo, i) => (
            <li key={i}>
              {/* 10. add the onChange event to the checkbox and pass the key as argument */}
              <input type="checkbox" onChange={() => this.completeTodo(i)} />
              <span
                contentEditable="true"
                className="editable"
                // 11. Style the todo item depending on the value of isComleted
                // isCompleted === true => add a line throug the text of the item
                style={{ textDecoration: todo.isCompleted && 'line-through' }}
              >
                {todo.text}
              </span>
              {/* 8. add the onClick event to the delete button and pass the key as argument */}
              <button className="delete" onClick={() => this.deleteTodo(i)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
