/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState } from 'react'

const Todo = ({data,deleteTodo,update}) => {
    const [mode, setMode] = useState('read')
    const [ischecked, setIschecked] = useState(false)
    const [text, setText] = useState(data.text)
    
    let formClass = 'hidden'

    let className = 'form-check-labe'
    if (mode === 'edit') {
        className += ' hidden'
        formClass = ''
    }

    let deco = {}
    if (ischecked) {
        className += 'text-muted'
        deco = {textDecoration:'line-through'}
    }
    
    const handelChangeboxClick = (e) =>{
        setIschecked(!ischecked)
    }

    const todoDelete = () =>{
        deleteTodo(data.id)
    }

    const todoEdit =()=>{
        setMode('edit')
    }

    const handleEdit= (val) => {
        setText(val)
        console.log(text);
    }

    const changeMode = (val) =>{
        setMode(val)
    }

    const updatetodo = () =>{
        update(data.id , text)
    }

    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                value="" 
                id="flexCheckDefault" 
                onChange={handelChangeboxClick}
            />
            <label 
                className={className} 
                style={deco} 
                htmlFor={`todo${data.id}`}>
                {text}
            </label>
            <from className={formClass} onSubmit={updatetodo}>
                <input 
                    className="form-control" 
                    type="text" 
                    value={text}
                    onChange={(e)=>{
                        handleEdit(e.target.value)
                    }}
                />
                <button 
                    type="submit" 
                    className="btn btn-secondary btn-sm">
                    Update
                </button>
                <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={()=>{
                        changeMode('read')
                    }}>
                cancel
                </button>
            </from>
            <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={todoDelete}>
                Delete
            </button>
            <button 
                type="button" 
                className="btn btn-info btn-sm"
                onClick={todoEdit}>
                Edit
            </button>
        </div>
    )
}

export default Todo