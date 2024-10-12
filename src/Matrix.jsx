import {useState, useRef} from 'react'
import './Matrix.scss'

const Box = () => {
    const [items, setItems] = useState([]);
    const inputRef = useRef()

    const handleAdd = () => {
        const input = inputRef.current.value;
        if(input){
            setItems([...items, inputRef.current.value])
        }
        inputRef.current.value = ''
    }

    const handleRemove = (index) => {
        setItems(items.filter((val, id) => id != index))
    }

    return <div className="box">
        <div className="header">
            <input 
            ref={inputRef}
            onKeyDown={(e) => {if(e.key === 'Enter') return handleAdd()}}
            type="text" />

            <button
            onClick={handleAdd}
            >+</button>
        </div>
        <br />
        {items.map((val, index) => {
            return <li key={index}>{val}<button
            onClick={() => handleRemove(index)}
            >-</button></li>
        })}
    </div>
}

const Matrix = () => {
    return <table className="matrix-table">
        <tr>
            <td></td>
            <td><h1>Urgent</h1></td>
            <td><h1>Not Urgent</h1></td>
        </tr>
        <tr>
            <td className='side'><h1>Important</h1></td>
            <td><Box/></td>
            <td><Box/></td>
        </tr>
        <tr>
            <td className='side'><h1>Not Important</h1></td>
            <td><Box/></td>
            <td><Box/></td>
        </tr>
    </table>
}

export default Matrix;