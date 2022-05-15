import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai";
import { Typeahead } from 'react-bootstrap-typeahead'; 
import Select from 'react-select';
import {exampleDataArr,towns, options, selectStyle} from '../data';
import '../styles/CreateAndUpdate.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

//creating new campaign
export default function Create(){
    //setting newly created campaign using useState hook
    const [newCampaign,setNewCampaign] = useState(
    {
        id: exampleDataArr.length > 0 ? exampleDataArr[exampleDataArr.length-1].id+1 : 0,
        Name:"",
        Keywords: "",
        Bid: 0,
        Fund: 0,
        Status: "",
        Town: "",
        Radius:""
    });
    //setSelectedOption used in radio buttons to set it off or on
    const [selectedOption,setSelectedOption] = useState('');
    //setValue used in dropdown town list to control the inputted value
    const [inputVal,setValue] = useState('');
    //setSelectedValue used in dropdown town list to set town of campaign
    const [selectedValue,setSelectedValue] = useState(null);
    //setMultiSelection to get multiple keywords from typeahead
    const [multiSelection,setMultiSelection] = useState([]);

    //useNavigate to navigate around page
    let navigate = useNavigate();

    //handling change of campaign name 
    const handleChange = e => {
        e.preventDefault();
        //setting new campaign name
        setNewCampaign({
            ...newCampaign,
            [e.target.name]: e.target.value
        });
    };

    //handling change of radius,bid amount and campaign funds
    const handleNumChange = e => {
        e.preventDefault();
        //setting campaign property to proper value if this value is not a number, 
        //otherwise giving the message and reseting e.target.value
        if(!isNaN(e.target.value)){
            setNewCampaign({
                ...newCampaign,
                [e.target.name]: e.target.value
            });
        }
        else{
            alert("This value must be a number.");
            e.target.value = "";
        }
    };

    //handling change of selected town
    const handleSelectChange = value => {
        setSelectedValue(value);
        //setting new campaign town
        setNewCampaign({
            ...newCampaign,
            Town: value.label
        });
    };

    //handling change of radio button option
    const handleSelectedOption = e => {
        setSelectedOption(e.target.value);
        //setting chosen option for new campaign
        setNewCampaign({
            ...newCampaign,
            [e.target.name]: e.target.value
        });
    };

    //handling change of given input to dropdown list
    const handleInputChange = value => {
        setValue(value);
    };

    //handling change of typeahead multiselect
    const handleMultiSelection = value => {
        setMultiSelection(value);
        //changing given value to the string and applying it to new campaign keywords
        setNewCampaign({
            ...newCampaign,
            Keywords: value.join(',')
        });
    };

    //handling submit 
    const handleSubmit = e =>{
        e.preventDefault();
        //checking if all fields are filled
        if(Object.keys(newCampaign).filter((key,index) => {
            return newCampaign[key] !== ""}).length === 8){
                //pushing new campaign to array if it's not empty,
                //otherwise setting first element of an array to newcampaign
                if(exampleDataArr[0] !== undefined){
                    exampleDataArr.push(newCampaign);
                }
                else if(exampleDataArr[0] === undefined){
                    exampleDataArr[0] = newCampaign;
                }
                //heading back home
                navigate('/');
        }
        //giving message if all inputs are not filled
        else
            alert("Please fill all rows.");
    };


    return (
        <div className="formContainer">
            {/*Button linking to home*/}
            <Link to='/' style={{textDecoration:"none"}}><button id="homeBtn"><AiOutlineArrowLeft style={{marginTop:".3em"}}/>Back to main page</button></Link>
            <form onSubmit={e => handleSubmit(e)}>
                <h3>Please enter the data</h3>
                <hr></hr>
                <h4>Campaign name</h4>
                <input type='text' name="Name" onChange={e => handleChange(e)} placeholder="Campaign name"></input>
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
                <input type='text' name="Bid" onChange={e => handleNumChange(e)} placeholder="Bid"></input>
                <h4>Campaign fund</h4>
                <input type='text' name="Fund" onChange={e => handleNumChange(e)} placeholder="Campaign funds"></input>
                <h4>Status</h4>
                <div className = "radioContainer"> 
                    <input type="radio" name="Status" className="radioBtn" value="on" checked={selectedOption==="on"} onChange={(e) => handleSelectedOption(e)}/><p>On</p>
                    <input type="radio" name="Status" className="radioBtn" value="off" checked={selectedOption==="off"} onChange={(e)=> handleSelectedOption(e)}/><p>Off</p>
                </div>
                <h4>Town</h4>
                <Select name="Town" options ={towns} styles = {selectStyle} value={selectedValue} inputValue={inputVal} placeholder="Town" onInputChange = {handleInputChange} onChange={handleSelectChange}/>
                <h4>Radius</h4>
                <input type='text' name="Radius" onChange={e => handleNumChange(e)} placeholder="Radius"></input>
                <button type='submit' id="submitBtn">Submit</button>
            </form>
        </div>
    )
}
