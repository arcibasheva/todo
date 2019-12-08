import React, {Component} from 'react'
import generate from "nanoid/generate"
import ItemForm from "./ItemForm"
import ListItems from "./ListItems"

const alphabet = "0123456789abcdefghiklmnopqrstvxyz"
const FILTERS = [{name: 'all', value: 2}, {name: 'active', value: 0}, {name: 'done', value: 1}]

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {id: '131c', item: 'Do first', done: true},
                {id: '7e8f', item: 'Do second', done: false},
                {id: '9bdc', item: 'Do third', done: false}
            ],
            filter: 2
        }
    }


    addListItem = (item) => {
        const id = generate(alphabet, 4)
        let newList = this.state.list
        newList.push({id: id, item: item, done: false})
        this.setState(state => ({
            list: newList
        }))
    }

    deleteListItem = (id) => {
        const list = this.state.list
        this.setState(state => ({
            list: list.filter(item => item.id !== id)
        }))
    }

    isItemDone = (id) => {
        const list = this.state.list
        let doneItem = this.state.list.find(item => item.id === id)
        doneItem.done = !doneItem.done;
        this.setState(state => ({
            list: list
        }))
    }

    setFilter = (event, filter) => {
        event.preventDefault()
        this.setState({filter})
    }

    render() {
        const {list, filter} = this.state
        const filteredList = filter === 0 ? list.filter(item => !item.done) :
            filter === 1 ? list.filter(item => item.done) : list
        return <div>
            <ItemForm onSubmit={this.addListItem}/>
            <ListItems list={filteredList} onDelete={this.deleteListItem} isDone={this.isItemDone}/>
            <p>Show:
                {FILTERS.map(filter => <span key={filter.name} style={{margin: '0 5px'}}>
                    <a href={`#${filter.name}`} onClick={(e) => this.setFilter(e, filter.value)}>{filter.name.charAt(0).toUpperCase() + filter.name.substring(1)}</a>,
                </span>)}
            </p>
        </div>
    }

}

export default Todo
