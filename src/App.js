import React, { Component } from 'react';
import './App.css';
import 'papercss/dist/paper.min.css';
import axios from 'axios';
class App extends Component {
  componentDidMount() {
    axios.get('http://localhost:8080/read').then((res => {
      this.setState({
        list: res.data
      });


    }))
  }
  constructor(props) {
    super(props);
    this.state = { list: [], newItem: "" }
  }

  getValue = (e) => {
    this.setState({
      newItem: e.target.value
    })
  }
  setValue = () => {
    if (this.state.newItem) {
      let a = this.state.list;
      let obj = { "name": this.state.newItem, "status": false, "index": a.length }
      axios.post('http://localhost:8080/create', obj).then((res => {
        a.push(res.data);
      this.setState({
        list: a,
        newItem: ""
      })
      }))
      
    }
  }
  up = (item) => {
    let a = this.state.list;
    let i = a.indexOf(item);

    if (i !== 0) {
      let temp = a[i];
      a[i] = a[i - 1];
      a[i - 1] = temp;
      this.setState({
        list: a
      })
      // axios.put(`http://localhost:8080/up/${i}`).then((res)=>{
      //     console.log(res.data);
      //   })
    }
  }
  down = (item) => {
    let a = this.state.list;
    let i = a.indexOf(item);
    if (i !== a.length - 1) {
      let temp = a[i];
      a[i] = a[i + 1];
      a[i + 1] = temp;
      this.setState({
        list: a
      })
    }

  }
  delete = (item) => {
    let a = this.state.list;
    let i = a.indexOf(item);
    axios.delete(`http://localhost:8080/delete/${a[i]._id}`).then((res => {

    }))
    a.splice(i, 1);
    this.setState({
      list: a
    })
  }
  statusChange = (item) => {
    let a = this.state.list;
    let i = a.indexOf(item);
    a[i].status = !a[i].status;
    // console.log(a[i]._id);
    axios.put(`http://localhost:8080/updateStatus/${a[i]._id}/${a[i].status}`).then((res) => {
      // console.log(res.data);
    })

    this.setState({
      list: a
    })

  }
  getList = () => {
    let arr = [];
    arr = this.state.list.map((item, i) => {
      return (
        <div key={i} style={{ marginBottom: "25px" }}>
          <li className={item.status ? "paper-btn btn-block btn-secondary" : "paper-btn btn-block"} onClick={() => this.statusChange(item)} >{item.name}</li>
          <button onClick={() => this.up(item)}>Up</button>
          <button onClick={() => { this.down(item) }}>Down</button>
          <button onClick={() => this.delete(item)}> X</button>
        </div>
      )
    })
    return arr;
  }
  render() {

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>To Do App</h1>
        <input type="text" onChange={this.getValue} value={this.state.newItem}></input>
        <button onClick={this.setValue}>Add</button>
        <ol >
          {this.getList()}
        </ol>
      </div>
    );
  }
}

export default App;
