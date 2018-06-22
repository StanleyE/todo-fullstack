import React from 'react';


class TodoForm extends React.Component {
    constructor(){
        super();
        this.newData = this.newData.bind(this);
    }
    newData(event){
        event.preventDefault();
        let inputDom = this.refs.newInput;
        let task = inputDom.value;
        if (task === '' || task === ' ' || task === '  ') {
            window.alert('Don\'t be lazy! You can\'t set a to do as nothing!')
        } else if (task === 'nothing' || task === 'Nothing'){
            this.props.submit(task = 'Smart Ass...')
        } else {
        this.props.submit(task); 
        }
        this.refs.newInput.value = '';
    }
    render() {
        return (
          <div>
            <form onSubmit = {this.newData} >
                <div className="input-group text">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </span>
                    <input className="form-control" placeholder="Add A New To Do" ref= "newInput" />
                </div>
            </form>
            
          </div>
        );
    }
}


export default TodoForm;