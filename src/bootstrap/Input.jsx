/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Todo from '../Todo';

const Input = () => {
    const [todoid,setTodoid] = useState(2)

    const [todo , setTodo] = useState([
        {id:1, text:'learn web', checked:false},
        {id:2, text:'get a job', checked:false}
    ])

    // const personObj = JSON.parse(personString) 문자열 -> 객체,배열 변경
    // const objString = JSON.stringify(todo) // 객체, 배열 -> 문자열 변경
    // window.localStorage.setItem('todo') // 스토리지 값 읽기
    // window.localStorage.setItem('todo',objString) // 스토리지 저장

    const getTodoList = () =>{
        let todoListFromStorage = window.localStorage.getItem('todo')
        console.log(todoListFromStorage);
        if (todoListFromStorage !== null) {
            const todoObj = JSON.parse(todoListFromStorage)
            // let lastId = todoObj[todoObj.length -1].id
            setTodo(todoObj)
            // setTodo(lastId)
        }
    }
    
    useEffect(()=>{
        getTodoList()
    },[])

    const [inputValue, setInputValue] = useState('');

    const deleteTodo = (id) =>{
        let newTodos = [...todo]
        let index = newTodos.findIndex(item=>(item.id === id))
        newTodos.splice(index,1)
        setTodo(newTodos)
    }
    const update = (id,val) =>{
        let newTodos = [...todo]
        let index = newTodos.findIndex(item=>(item.id === id))
        newTodos[index] = {id:id, text:val, checked:false}
        setTodo(newTodos)
        getTodoList()
    }

    let todos = todo.map(item=>(
        <Todo data={item} key={item.id} deleteTodo={deleteTodo} update={update}/>
    ))

    let addTodo = (value)=>{

        let newTodos = [...todo]
        let newId = todoid + 1
        setTodoid(newId)
        newTodos.push({id:newId , text:value , checked:false})
        setTodo(newTodos)
        // document.getElementById('todo').value=''
        setInputValue('');
    }
    const setStorage = () =>{
        const todoString = JSON.stringify(todo)
        window.localStorage.setItem('todo', todoString)
        console.log('storage 저장');
    }

    useEffect(()=>{
        setStorage()
    },[todo])

    return (
        <div className='container'>
            <h1>Todo list</h1>
            <Form onSubmit={e=>{
                e.preventDefault() 
                addTodo(e.target.todo.value)
            }}>
                <Form.Group className="mb-3" controlId="todo1">
                    <Form.Label>Todo Input</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='todo' 
                        placeholder="할 일을 입력하세요." />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit">
                    Submit
                </Button>
            </Form>
            <hr/>
            <div>
            {todos}
            </div>
        </div>
    )
}

export default Input