
import React from "react";
function App() {
    let url = `http://192.168.1.237:50162/SignIn`;
    let res
    fetch(url)
       .then(response=> response.json())
       .then(content =>{
        console.log("response = ")
           console.log(content);
           res = content

       })
       .catch(err =>{
           console.error(err);

       });

    
    
  return (
    <div >
       <div>{res}</div>
      
      
    </div>
  );
}

export default App;