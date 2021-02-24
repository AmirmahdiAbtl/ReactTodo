import logo from './logo.svg';
import './App.css';
import Alert from './Alert';
import List from './List';
import React ,{useState,useEffect} from "react";

const getLocalstorage = () => {
  let localItems = localStorage.getItem("list");
  if( localItems ){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return [];
  }
}

function App() {
  const [value,setValue] = useState("");
  const [valuelist,setValuelist] = useState(getLocalstorage());
  const [alert,setAlert] = useState({show:false ,msg:'' ,type:''});
  const [edit,setEdit] = useState(false);
  const [editID,setEditID] = useState(null);
  const clickHandler = (e) => {
    e.preventDefault();
    if(!value){
      showAlert(true,"danger","Please Enter Value");
    }else if(value && edit){
      setValuelist( 
        valuelist.map((item)=>{
          if(item.key===editID){
            return {...item,title:value};
          }
          return item;
        })
      )
      setValue('');
      setEditID(null);
      setEdit(false);
      showAlert(true,'success',"the item editted")
    }else{
      showAlert(true,'success','the item added to List');
      const newItem = {key:new Date().getTime().toString(),title:value};
      setValuelist([...valuelist,newItem]);
      setValue('');
    }
  }

  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(valuelist));
  }, [valuelist]);
  

  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,msg,type})
  }
  const clearList = () => {
    showAlert(true,'danger','this is Empty List');
    setValuelist([]);
  }
  const removeItems = (key) => {
    showAlert(true,'danger','removed this items');
    setValuelist(valuelist.filter((item)=>item.key!==key));
  }
  const editItems = (key) => {
    showAlert(true,'success','you can edit your item');
    const edits = valuelist.find((item)=>item.key===key);
    setValue(edits.title);
    setEdit(true);
    setEditID(key);
  }
  return (
    <div className="App">
      <div className="content">
        
        {alert.show && <Alert list={valuelist} msg={alert.msg} type={alert.type} removeAlert={showAlert}/>}
        <h3 className="title">Grocery Bud</h3>
        <form onSubmit={clickHandler}>
          <input 
            type="text" 
            className="input" 
            placeholder="e.g eggs" 
            value={value} 
            onChange={(e)=>setValue(e.target.value)}
          />
          <input 
            type="submit" 
            className="submit"
            value={(edit?"Edit":"submit")}
          />
        </form>
        <div className="list">
          {valuelist.length>0 && 
            <>
              <List items={valuelist} removeItems={removeItems} editItems={editItems}/>
              <button className="clear-all-btn" onClick={clearList}>Clear All</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
