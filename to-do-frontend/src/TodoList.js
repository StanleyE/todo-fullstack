import React from 'react';
import ToDo from './ToDo';


class TodoList extends React.Component {   
    render() {
        let itemListJSX = this.props.itemArr.map((itemObject)=>{
            return <ToDo item = {itemObject.title} id = {itemObject.id} done = {itemObject.done} checkedOff = {this.props.checkedOff}/>; 
        });
        return (
            <div>
                <ul className="list-group text">
                    {itemListJSX}
                </ul>
            </div>
        );
    }
}



export default TodoList;