import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux';

function HooksCakeContainer() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes)
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch()
    return (
        <div>
            <h2>Num of Cakes - {numOfCakes}</h2>
            <input type='text' value={number} onChange={event => {setNumber(event.target.value)}} />
            <button onClick={ () => dispatch(buyCake(number))}>Buy Cake</button>
        </div>
    )
}

export default HooksCakeContainer
