import React, { useEffect, useState } from "react";
import{BsCheckCircleFill}from 'react-icons/bs'
import shortid from "shortid";

function App() {
  // logic
const [activeBtn ,setActiveBtn]=useState(false)
const [alltodos,setAlltodos]=useState([])
const [newtitle,setNewtitle]=useState("")
const [newdiscription,setNewdiscription]=useState("")
const [Comblete,setComblete]=useState([])



// handleAddtodo 
const handleAddtodo =()=>{
  const newtodoitem ={
    title:newtitle,
    decription:newdiscription,
    id:shortid.generate()

  
  }
  if (newtitle === '') {
    return alert('Please enter the task')
    
  }

// add and change in the state
  // save perv sate 
  const updateTodoarr =[...alltodos];
  //push data (title,decription)in newtodoitem =>title=newtitle...
  updateTodoarr.push(newtodoitem);
  // eny change in the state evening in arr =eny update in the newtodos
  setAlltodos(updateTodoarr);
  //save data in localStorage (key, saving data)
  localStorage.setItem('todolist', JSON.stringify(updateTodoarr));
// becuse remove task when add task
  setNewdiscription('')
  setNewtitle('')

}

  // handleToDoDelete statetodo

// reducetodo.filter((el)=> el.id !==id) =>
const handleToDoDelete = (id) => {
  const reducetodo = [...alltodos];
  //هبد بالصدفه
  reducetodo.splice(id,1)

    localStorage.setItem('todolist',JSON.stringify (reducetodo));
    setAlltodos(reducetodo)
};

// btn Comblete //
const handlecomnblte =(id)=>{
  let filteritem ={
    ...alltodos[id],
  }
  
  let updateCombletearr=[...Comblete];

     updateCombletearr.push(filteritem)
     setComblete(updateCombletearr)
     localStorage.setItem('Comblete', JSON.stringify(updateCombletearr));
     handleToDoDelete(id)
}
// handleCombleteDelete

const handleCombleteDelete = (id) => {
  let reducedCompletedTodos = [...Comblete];
  reducedCompletedTodos.splice (id,1);
  // console.log (reducedCompletedTodos);
  localStorage.setItem (
    'Comblete',
    JSON.stringify (reducedCompletedTodos)
  );
  setComblete (reducedCompletedTodos);
};




useEffect(()=>{
  // arry
    let savedTodo =JSON.parse(localStorage.getItem('todolist'));
    let saveComblete =JSON.parse(localStorage.getItem('Comblete'));
    
    if (savedTodo) {
      setAlltodos(savedTodo)
    }
    if (saveComblete) {
      setComblete(saveComblete)
    }
    
},[])




  return (
    <div className="App">
          <div className="h1"><h1>My To do list</h1></div>
          <div className="todo-wrapper">
            <div className="todo-input">
                        <div className="todo-input-item">
                            <label>Title Task</label>
                            <input type="text" placeholder="what's the task title?" value={newtitle} onChange={(e)=>setNewtitle(e.target.value)}/>
                        </div>

                        <div className="todo-input-item">
                            <label>description</label>
                            <input type="text" placeholder="what's the task description?"value={newdiscription} onChange={(e)=>setNewdiscription(e.target.value)}/>
                        </div>

                        <div className="todo-input-item">
                  
                          <button type="button" className="button" onClick={handleAddtodo}>
                            <span className="button__text" >Add Task</span>
                            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                          </button>

                        </div>
               </div>

               <div className="btn-area">
                  <button className={`activeBtn ${activeBtn === false && 'active'}`} onClick={()=>setActiveBtn(false)}>Todo</button>
                  <button className={`activeBtn ${activeBtn === true && 'active'}`} onClick={()=>setActiveBtn(true)}>Comblete</button>
               </div>
{/* body: to do // cart todo */}
               {/* <div className="todo-list-item"> */}
                 
                  {
                   activeBtn ===false && alltodos.map((item ,id)=>{
                      return(
                    
                 
                     <div className="todo-list-item" key={item.id} >
                        <div className="left" >
                         <h3>{item.title}</h3>
                         <p>{item.decription}</p>
                     </div>
                     <div className="right"  >
                          <button className="btn" onClick={()=>handleToDoDelete(id)}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon"><path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path> </svg>
                            </button>
                       <BsCheckCircleFill className="icons" title="Comblete?" onClick={()=>handlecomnblte(id)}/>
                      
                     </div>
                     </div>
              
           
                    
                      )
                    })
                  }
                  {
                   activeBtn === true && Comblete.map((item,id)=>{
                      return(
                     <div className="todo-list-item" key={item.id} >
                        <div className="left" >
                         <h3>{item.title}</h3>
                         <p>{item.decription}</p>
                     </div>
                     <div className="right"  >
                          <button className="btn" onClick={()=>handleCombleteDelete(id)}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon"><path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path> </svg>
                            </button>

                     </div>
                     </div>
              
           
                    
                      )
                    })
                  }

                 
               {/* </div> */}


          </div>

    </div>
  );
  
                }

export default App;
