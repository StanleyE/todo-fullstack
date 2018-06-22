import React from 'react';


class ToDo extends React.Component {
    render() {
        return (
        <li className="list-group-item"  id = {this.props.id} done = {this.props.done}>
            <input type="checkbox" value="on" onChange = { () => this.props.checkedOff(this.props.id) }/>
            <label className= {this.props.done ? "done" : null} > {this.props.item}</label>
        </li>        
        );
        
    }
}


export default ToDo;