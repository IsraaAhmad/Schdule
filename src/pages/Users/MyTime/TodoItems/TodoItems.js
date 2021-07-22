import React from 'react'
import './TodoItems.css'


const TodoItems =(props) =>{
    const {items ,deleteItem} = props;
    let length = items.length;
    const listItems = length ? (items.map(item =>{
        return (
            <div key = {item.id} className="view">
                <div onClick={()=>deleteItem(item.id)} style={{color:'red',fontSize:'23px'}}>حذف الفراغ</div>
                
                
                
                {item.thu&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.thu}</div>}
                {item.wed&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.wed}</div>}
                {item.tus&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.tus}</div>}
                {item.mon&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.mon}</div>}
                {item.sun&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.sun}</div>}
                {item.sat&&<div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.sat}</div>}
                <div style={{color:'#045F5F',fontSize:'23px'}}>:الايام </div>
                <div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.end}</div>
                <div style={{color:'#045F5F',fontSize:'23px'}}>:نهاية الفراغ</div>
                <div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.start}</div>
                <div style={{color:'#045F5F',fontSize:'23px'}}>:بدء الفراغ</div>
                <div style={{marginLeft:'10px',marginRight:'4px',fontSize:'20px'}}>{item.causes}</div>
                <div style={{color:'#045F5F',fontSize:'23px'}}>:سبب الفراغ</div>

            </div>
        )
    })):(
        <div className="view">ليس هناك فراغ مضاف بعد</div>
    )
    return (
        <div>
            {listItems}
        </div>
    )
}
export default TodoItems;