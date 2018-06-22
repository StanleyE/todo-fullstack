import React from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
const axios = require('axios');

class App extends React.Component {
    constructor(){
        super();
        this.state = {
        toDoArray: [
            {
            title: "Add a New ToDo",
            done: false,
            id: 0
            },
            //  {
            // item: "Sleep",
            // done: false,
            // id: 2
            // },
            //  {
            // item: "Code",
            // done: false,
            // id: 3
            // }, 
            // {
            // item: "Repeat",
            // done: false,
            // id: 4
            // }
        ]
        }
        //Bind Off
        this.checkedOff = this.checkedOff.bind(this);
        this.newToDo = this.newToDo.bind(this);
        // this.organize = this.organize.bind(this);
    }

    componentDidMount(){
    console.log('/ was hit?')
    axios.get('http://localhost:8080/')
          .then(results =>{
              console.log(results.data);
              this.setState({
                  toDoArray:results.data
              })
          })
          .catch(error =>{
              console.log(error);
          })
}

        checkedOff(index){
            const shorten = Array.from(this.state.toDoArray);      
            //make a copy of the array      
            for (let i = 0; i < shorten.length; i++) {
                //loop copy
                if (index === shorten[i].id) {
                    //target
                    shorten[i].done = !shorten[i].done;
                        //exterminate!
                        let id = shorten[i].id;
                        axios.put('http://localhost:8080/todo/'+id)
                         // Despite best effort I could not get the PUT or DELETE to work, I would get this error "Failed to load http://localhost:8080/todo/215507: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response." Which made little sense as I had Cors added and Post and Get was working. Will attempt to fix in future.
                              .then(results=>{
                                  console.log(results);
                              })
                              .catch(error=>{
                                  console.log(error);
                              })
                        this.setState({
                        toDoArray: shorten
                        //assimilate
                    }) 
                    return
                }
            }
        } 


        newToDo(input){
            let task = {
                title: input,
                done: false,
                id: Math.floor(Math.random()*5e5)
            }//take input and make a new toDo
            axios.post('http://localhost:8080/', task)
                 .then(result =>{
                     console.log('added new task');
                 })
                 .catch(error =>{
                     console.log('could not add new task');
                 })
            let mimic = Array.from(this.state.toDoArray);
            mimic.push(task);
            this.setState({
                toDoArray:mimic
            })//copy array and push new toDo into copy array then reset original array
        };
    
    finished(){
        //on the clear button being clicked, get ride of the completed tasks
        let mimic = Array.from(this.state.toDoArray);
        let copy = [];
        for (let i = 0; i < mimic.length; i++) {
            //loop through array
            if (mimic[i].done === true) {
                mimic.splice(i,0);
                //find and exterminate completed tasks
                let id = mimic[i].id;
                axios.delete('http://localhost:8080/todo/'+id)
            // Despite best effort I could not get the PUT or DELETE to work, I would get this error "Failed to load http://localhost:8080/todo/215507: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response." Which made little sense as I had Cors added and Post and Get was working. Will attempt to fix in future.
                .then(result =>{
                    console.log(result);
                })
                .catch(error =>{
                    console.log(error);
                })
            } else {
            copy.push(mimic[i]);
            //push all others into copy array
            }
        }
        this.setState({
            toDoArray: copy
        });//reset originial array
    }
        
    // organzie(){
    //     let array = this.state.toDoArray;
    //     let value = this.refs.sort.value;
    //     let mimic = Array.from(this.state.toDoArray);
    //    for (let i = 0; i < array.length; i++) {
    //        if (value === "active" && array[i].done === false) {
    //            mimic.push(array[i]);
    //            this.setState({
    //                toDoArray:mimic
    //            });
    //        } else if (value === "complete" && array[i].done === true){
    //            mimic.push(array[i]);
    //            this.setState({
    //                toDoArray:mimic
    //            });
    //        } else{
    //            this.setState({
    //                toDoArray:this.toDoArray
    //            });
    //        }
           
    //    } original code attempt, but not really working...
    //            {this.done === false ? ... : null}
    //             //here i wanted to use the filter function and then add a class of hidden so don't have to change the array... but was not successfull, will need to fix in future
    //     }
    // }


    
  render() {
    return (
     <div className="App">
        {/* todo add form */}
        <div className="container">
            <h1 className="text-center jumbotron">This Weeks To Do's</h1>
            < TodoForm submit = {this.newToDo} />
        {/* todo List */}
             <TodoList itemArr = {this.state.toDoArray} checkedOff = {this.checkedOff} />            
        {/* Toggle Drop Down Button */}
        <select ref = "sort" className = "text" >
            <option value="all" >All</option>
            <option value="active" >Active</option>
            <option value="complete" >Complete</option>
        </select>
        {/* Clear Complete button */}
        <button className="pull-right btn btn-default text" onClick= { ()=>{this.finished() }} > Clear Complete</button>
        {/* Bug Found: When clear button is used for some reason the checkbox is activated on the remaining items (if any are below), the state doesn't change but the buttons are inverted (checked == false; unchecked == true). Also while button will not work if no items are marked as done === true, could not manage to 'disable' the button at time*/}
        </div>  
     </div>
    );
  }
}

export default App;
