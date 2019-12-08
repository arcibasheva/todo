import React from 'react'

export default function ListItems(props) {
    const list = props.list;
    const listItems = list.map((item) => {
        return <li key={item.id}
                   style={{textDecoration: item.done ? 'line-through' : 'none', listStyle: 'none', cursor: 'pointer'}}>
            <input type="checkbox" checked={item.done} onChange={() => props.isDone(item.id)}/>
            <span>{item.item}</span>
            <button onClick={() => props.onDelete(item.id)}>x</button>
            <small>({item.id})</small>
        </li>
    });
    return (
        <ul style={{paddingLeft: 0}}>{listItems}</ul>
    );
}