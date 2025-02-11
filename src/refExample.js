import { useEffect, useRef, useState } from "react";

export default function RefExample() {
    const [count, setCount] = useState(0);
    const refVar = useRef(0);

    const handleClick = () => {
        setCount(prev => prev + 1);
        console.log("State Count (before render):", count); // Logs old value
    };

    const handleCountClick = () => {
        refVar.current += 1;
        console.log("Ref Count:", refVar.current); // Logs updated value immediately
    };

    // Log the updated state value after re-render
    useEffect(() => {
        console.log("Updated State Count (after render):", count);
    }, [count]);

    return (
        <>
            <button onClick={handleClick}>UseState Count</button>
            <button onClick={handleCountClick}>Ref Count</button>
            <p>State Count: {count}</p>
            <p>Ref Count (not updating UI): {refVar.current}</p>
        </>
    );
}
