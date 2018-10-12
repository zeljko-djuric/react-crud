import React from 'react';

const ListItem = (props) =>{
    return <li className="list-group-item">
    {props.item.name}
    <button className="btn-sm ml-4 btn btn-info" onClick={props.editTodo}>Update</button>
    <button className="btn-sm ml-1 btn btn-danger" onClick={props.deleteTodo}>Delete</button>
    </li>

};

export default ListItem;