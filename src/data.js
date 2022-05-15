const exampleDataArr = [
    {
        id: 1,
        Name: "Campaign1",
        Keywords: "campaign,1",
        Bid: 200,
        Fund: 10000,
        Status: "on",
        Town: "Kraków",
        Radius:"30km"
    },
    {
        id: 2,
        Name: "Campaign2",
        Keywords: "campaign,2",
        Bid: 400,
        Fund: 1000,
        Status: "on",
        Town: "Warszawa",
        Radius:"1000km"
    },
    {
        id: 3,
        Name: "Campaign3",
        Keywords: "campaign,3",
        Bid: 100,
        Fund: 100000,
        Status: "off",
        Town: "Poznań",
        Radius:"300km"
    },
]

//example towns to choose on dropdown list
const towns = [
    {label: "Kraków", value: "kraków"},
    {label: "Wrocław", value: "wrocław"},
    {label: "Warszawa", value: "warszawa"},
    {label: "Gdańsk", value: "gdańsk"},
    {label: "Gdynia", value: "gdynia"},
    {label: "Poznań", value: "poznań"},
    {label: "Łódź", value: "łódź"},
    {label: "Częstochowa", value: "częstochowa"}];

//options used while picking keywords
const options = ['campaign1', 'campaign2', 'campaign3','somecampaign','example'];

//styles for React Select
const selectStyle = {
    option: (base) => ({
        ...base,
        borderRadius:100
    }),
    control: (provided) => ({
        ...provided,
        height:10,
        marginTop:15,
        marginLeft:9,
        marginRight:9,
        borderColor: 'rgb(121, 121, 121)',
        borderRadius:5,
        fontSize:15,
        font:'Arial',
    }),
    placeholder: (provided) => ({
        ...provided,
        marginBottom:16,
        marginLeft:-5,
        textAlign: 'left'
    }),
    singleValue: (provided) => ({
        ...provided,
        marginBottom:16,
        marginLeft:-5,
        textAlign: 'left'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        marginBottom:16
    }),
    input: (provided) => ({
        ...provided,
        marginTop:-16,
        marginLeft:-5,
        fontSize:15
    }),
    menuList: (provided) => ({
        ...provided,
        height:220
    })
};

export {exampleDataArr,towns, options,selectStyle};