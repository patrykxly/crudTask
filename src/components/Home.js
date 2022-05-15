import React,  {useEffect, useState} from 'react';
import {exampleDataArr} from '../data';
import {Link, useNavigate} from "react-router-dom";
import {BsFillTrashFill} from 'react-icons/bs';
import '../styles/Home.css';

//main page
export default function Home(){
    //useState hook to set emerald account funds
    const [funds,setFunds] = useState(1000000);

    //counting funds from the given items using useEffect 
    useEffect(() => {
        let sum = 0;
        for(let i = 0; i < exampleDataArr.length;i++){
            sum += Number(exampleDataArr[i].Fund);
        }
        setFunds(funds-Number(sum));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //useNavigate to navigate around page
    let navigate = useNavigate();

    //function putting item in storage to get it edited
    const putItemInStorage = item => {
        localStorage.setItem(0,JSON.stringify(item));
    }

    //delete handler removing item from array with a specified index after adding his funds amount to overall funds
    const handleDelete = itemId =>{
        const ind = exampleDataArr.map(el => el.id).indexOf(itemId); //getting array index of item to delete 
        setFunds(funds+Number(exampleDataArr[ind].Fund));
        exampleDataArr.splice(ind,1);
        navigate('/');
    }

    return(
        <div className="homeContainer">
            <h1>Home page</h1>
            <hr></hr>
            <h4>Emerald account funds: {funds}$</h4>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Keywords</th>
                        <th scope="col">Bid</th>
                        <th scope="col">Campaign fund</th>
                        <th scope="col">Status</th>
                        <th scope="col">Town</th>
                        <th scope="col">Radius</th>
                    </tr>
                </thead>
                <tbody>
                {exampleDataArr.map((item) => {
                    return(
                        //mapping over the array to get the proper values and set them on table
                        <tr key={item.id}>
                            {Object.keys(item).filter(key => key !== "id").map(prop => {
                                if(prop === "Radius" && !isNaN(item[prop]))
                                    return <td key={prop} data-label={prop}>{item[prop] + "km"}</td>
                                else if(prop ==="Fund")
                                    return <td key={prop} data-label="Campaign fund">{item[prop]}</td>
                                else
                                    return <td key={prop} data-label={prop}>{item[prop]}</td>
                            })}
                            {/*update button linking to update site and invoking putItemInStorage function
                               and delete button deleting the item from array using delete handler    
                            */}
                            <td colSpan = "2"><Link to = {'/Update'}><button className='updateBtn' onClick={(e) => {putItemInStorage(item)}}>Update</button></Link>
                                <button className='deleteBtn' onClick ={(e) => {handleDelete(item.id)}}><BsFillTrashFill /></button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table> 
            {/* create button linking to create site */}
            <Link to = {'/Create'} style={{textDecoration:"none"}}><button className ='addingBtn'>Add campaign</button></Link>  
        </div>
    )
}
