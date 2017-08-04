import React from 'react';
const App = (props) =>{console.log('props', props);
    return (
        <div>
            <h3>React App</h3>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default App;