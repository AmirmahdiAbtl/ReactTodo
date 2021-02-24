import React ,{useState,useEffect} from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({items,removeItems,editItems}) => {
    return (
        <>
        {items.map((item)=>{
            const {key,title} = item;
            return(
            <div className="list-item" key={key}>
                <p className="list-text">{title}</p>
                <div className="btn">
                    <button className="edit">
                    <FaEdit onClick={()=>editItems(key)}/>
                    </button>
                    <button className="trash" onClick={()=>removeItems(key)}>
                    <FaTrash/>
                    </button>
                </div>
            </div>
            )
        })}
        </>
    )
}
export default List;