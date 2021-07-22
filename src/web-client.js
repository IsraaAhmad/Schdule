let url = `http://192.168.1.237:50162/SignIn`;
fetch(url)
   .then(response=> response.json())
   .then(content =>{
       console.log(content);

       

   })
   .catch(err =>{
       console.error(err);

   })