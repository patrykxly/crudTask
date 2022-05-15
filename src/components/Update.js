import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai";
import { Typeahead } from 'react-bootstrap-typeahead'; 
import Select from 'react-select';
import {exampleDataArr,towns,options, selectStyle} from '../data';
import '../styles/CreateAndUpdate.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

//updating existing campaign
export default function Update(){
    const [editedCampaign,setEditedCampaign] = useState({});
    //setValue used in dropdown town list to control the inputted value
    const [inputVal,setValue] = useState("");
    //setSelectedOption used in radio buttons to set it off or on
    const [selectedOption,setSelectedOption] = useState("");
    //setMultiSelection to get multiple keywords from typeahead
    const [multiSelection,setMultiSelection] = useState([]);
    //setSelectedValue used in dropdown town list to set town of campaign
    const [selectedValue,setSelectedValue] = useState("");

    //retrieving campaign to update from localStorage and proper data
    useEffect(() => {
        setEditedCampaign(JSON.parse(localStorage.getItem(0)));
        //setting selectedOption to the value of status from campaign to edit
        setSelectedOption(JSON.parse(localStorage.getItem(0))["Status"]);
        //setting multiSelection to the value of keywords from campaign to edit
        setMultiSelection(JSON.parse(localStorage.getItem(0))["Keywords"].split(","));
    },[])

    //useNavigate to navigate around page
    let navigate = useNavigate();

    //handling change of campaign name
    const handleChange = e => {
        e.preventDefault();
        //editing campaign name
        setEditedCampaign({
            ...editedCampaign,
            [e.target.name]: e.target.value
        });
    }

    //handling change of radius,bid amount and campaign funds
    const handleNumChange = e => {
        e.preventDefault();        
        //setting campaign property to proper value if this value is not a number, 
        //otherwise giving the message and reseting e.target.value
        if(!isNaN(e.target.value)){
            setEditedCampaign({
                ...editedCampaign,
                [e.target.name]: e.target.value
            });
        }
        else{
            alert("This value must be a number.");
            e.target.value = "";
        }
    }
    
    //handling change of selected town
    const handleSelectChange = value => {
        setSelectedValue(value);
        //editing campaign town
        setEditedCampaign({
            ...editedCampaign,
            Town: value.label
        });
    }

    //handling change of selected radio button option
    const handleSelectedOption = e => {
        setSelectedOption(e.target.value);
        //editting chosen option for campaign
        setEditedCampaign({
            ...editedCampaign,
            [e.target.name]: e.target.value
        });
    };

    //handling change of given input to dropdown list
    const handleInputChange = value => {
        setValue(value);
    }

    //handling change of typeahead multiselect
    const handleMultiSelection = value => {
        setMultiSelection(value);
        //changing given value to the string and applying it to campaign keywords
        setEditedCampaign({
            ...editedCampaign,
            Keywords: value.join(',')
        });
    };

    //handling submit 
    const handleSubmit = e =>{
        e.preventDefault();
        const ind = exampleDataArr.map(el => el.id).indexOf(editedCampaign.id);
        //checking if all fields are filled
        if(Object.keys(editedCampaign).filter((key,index) => {
            return editedCampaign[key] !== ""}).length === 8){
                //applying edited campaign object to data array if all fields are filled
                exampleDataArr[ind] = editedCampaign;
                navigate('/');
        }
        //giving proper message if all fields aren't filled
        else{
            alert("Please fill all rows.");
        }
    };

    return (
        <div className="formContainer">
            {/*Button linking to home*/}
            <Link to='/' style={{textDecoration:"none"}}><button id="homeBtn"><AiOutlineArrowLeft style={{marginTop:".3em"}}/>Back to main page</button></Link>
            <form onSubmit={e => handleSubmit(e)}>
                <h3>Update the data</h3>
                <hr></hr>
                <h4>Campaign name</h4>
                <input type='text' name="Name" onChange={e => handleChange(e)} placeholder="Campaign name" value={editedCampaign.Name || ''}></input>
                <h4>Keywords</h4>
                <Typeahead multiple 
                    id="multiple-typeahead"
                    options={options} 
                    placeholder="Keywords" 
                    labelKey="name"
                    name="Keywords" 
                    onChange={handleMultiSelection} 
                    selected={multiSelection}
                />
                <h4>Bid amount</h4>
                <input type='text' name="Bid" onChange={e => handleNumChange(e)} placeholder="Bid" value={editedCampaign.Bid || ''}></input>
                <h4>Campaign fund</h4>
                <input type='text' name="Fund" onChange={e => handleNumChange(e)} placeholder="Campaign funds" value={editedCampaign.Fund || ''}></input>
                <h4>Status</h4>
                <div className = "radioContainer"> 
                    <input type="radio" name="Status" className="radioBtn" value="on" checked={selectedOption==="on"} onChange={(e) => handleSelectedOption(e)}/><p>On</p>
                    <input type="radio" name="Status" className="radioBtn" value="off" checked={selectedOption==="off"} onChange={(e)=> handleSelectedOption(e)}/><p>Off</p>
                </div>                
                <h4>Town</h4>
                <Select name="Town" options ={towns} styles = {selectStyle} value={selectedValue} inputValue={inputVal} placeholder={editedCampaign.Town} onInputChange = {handleInputChange} onChange={handleSelectChange}/>
                <h4>Radius</h4>
                <input type='text' name="Radius" onChange={e => handleNumChange(e)} placeholder="Radius" value={editedCampaign.Radius || ''}></input>
                <button type='submit' id="submitBtn">Submit</button>
            </form>
        </div>
    )
}