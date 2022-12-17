import { useState, useEffect } from 'react';

export default function Toast(props) {

    const [hidden, onHidden] = useState('hidden');

    useEffect(() => {
        onHidden('');
        setTimeout(() => {onHidden('hidden');}, 7000);
    }, []);

    return (
        <div className={`p-5 drop-shadow-lg toast ${hidden} ${props.style}`}>
            <p>{props.image} {props.message}</p>
        </div>
    );
};