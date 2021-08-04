import React from 'react'
const Loading = require("../assets/loader.svg") as {default: string};

function Loader() {
    console.log(Loading.default);
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}><img src={Loading.default} alt="Loading..." height={100} width={100} /></div>
    )
}

export default Loader
