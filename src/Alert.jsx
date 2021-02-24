import React ,{useState,useEffect} from 'react';
import './App.css';
const Alert = ({msg ,type,removeAlert,list}) => {
  useEffect(() => {
    let interval = setTimeout(()=>{removeAlert();},3000);
    return () => {
        clearTimeout(interval);
    }
}, [list]);
    return(
        <div className={`alert ${type}`}>
          <p className="text-alert">{msg}</p>
        </div>
    )
}
export default Alert;