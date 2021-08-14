import React, { useState } from 'react'
import firebase from "../FireBase/firebase.js"
import { Input, Button } from '@material-ui/core'
import "./fire.css"

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const d1 = ""+Date.now()

    async function sendMessage(e) {
        e.preventDefault()
        

        await firebase.firestore().collection("messages").doc("321 - 123").collection("321 - 123").doc(d1).set({
            senderId:'123',
            anotherUserId:'321',
            timestamp:d1,
            content:msg,
            type:'soso'
          })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
