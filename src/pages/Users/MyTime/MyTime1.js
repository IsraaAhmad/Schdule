import React , {Component} from "react";
import TodoItems from "./TodoItems/TodoItems.js";
import AddItem from "./AddItem/AddItem.js";
import './myitem.css';
import DrawerUser from "../DrawerUser.js"

class MyTime extends Component {
  state = {
    items:[
      // {id:1,causes:"go1",start:"07:30",end:"09:00",sat:"true",sun:"false",mon:"true",tus:"true",wed:"false",thu:"true"},
      // {id:2,causes:"go2",start:"07:30",end:"09:00",sat:"true",sun:"false",mon:"true",tus:"true",wed:"false",thu:"true"},
      // {id:3,causes:"go3",start:"07:30",end:"09:00",sat:"true",sun:"false",mon:"true",tus:"true",wed:"false",thu:"true"},
      // {id:4,causes:"go4",start:"07:30",end:"09:00",sat:"true",sun:"false",mon:"true",tus:"true",wed:"false",thu:"true"}
    ]
  }
  deleteItem = (id)=>{
    let items = this.state.items;
    let i = items.findIndex(item=> item.id === id)
     items.splice(i,1);
     this.setState({items})
  }
  addItem = (item) =>{
    item.id = Math.random();
   let items = this.state.items;
   items.push(item);
   console.log(items)
   this.setState({items:items})
  }

  render(){
    return(
      <div  style={{height:1000}}className="back">
        <DrawerUser/>

      <div className="tot">
        {/* <div className="title">اوقات الدوام</div>
     <AddItem addItem ={this.addItem}/>
     <div className="tom"> أوقات الفراغ المضافه</div>
   
     <TodoItems items={this.state.items} deleteItem ={this.deleteItem}/> */}
      </div>
      </div>
    );
    }
  }
  export default MyTime;
 
  

