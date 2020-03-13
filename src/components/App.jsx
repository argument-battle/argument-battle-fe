import React, { useEffect, useState } from 'react';

const App = () => {
    const [bobbu] = useState(0);
    useEffect(() => {
        console.log(bobbu);
    }, []);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function robby() {
        await sleep(3000);
        console.log('hallo');
    }

    const bob = { messages: { cool: 'textas' } };
    return (
        <>
            <h1>{bob.message?.cool}</h1>
            <h1>{bob.messages?.cool}</h1>
            <button onClick={() => robby()}>Click me!</button>
        </>
    );
};

export { App };
