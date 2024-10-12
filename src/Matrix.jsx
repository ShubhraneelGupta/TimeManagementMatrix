import {useState, useRef, useEffect} from 'react'
import './Matrix.scss'

const Box = ({storageKey}) => {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem(storageKey);
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey]);

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
            className='add-button'
            onClick={handleAdd}
            >+</button>
        </div>
        <br />
        {items.map((val, index) => {
            return <li key={index}>{val}<button
            className='remove-button'
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
            <td><Box storageKey={'box1'}/></td>
            <td><Box storageKey={'box2'}/></td>
        </tr>
        <tr>
            <td className='side'><h1>Not Important</h1></td>
            <td><Box storageKey={'box3'}/></td>
            <td><Box storageKey={'box4'}/></td>
        </tr>
    </table>
}

export default Matrix;