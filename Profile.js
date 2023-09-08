import React ,{useEffect, useState} from 'react';
function Profile(){
    const [count, setCount]=useState(0);
    useEffect(() =>{
        console.log("component rendered successfully");
    }, []);
    return(
        <>
        <h1>you clicked {count} times</h1>
        <button onClick={()=> setCount(count + 1)}>Click me</button>
        
        </>
    );
}
export default Profile;