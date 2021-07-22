import  {useState} from 'react'
import axios from 'axios'

const Apis = () => {
    const onClicks = () => {
        axios.get("http://192.168.1.7:50163/SignIn")
        .then(res => {
            console.log(res)
        })
    }
   
   
    return (
<div>
<div>hi</div>
</div>


    )
}
export default Apis



