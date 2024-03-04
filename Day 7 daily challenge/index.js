const fetchUserData = async () => {
    try {
        const data = await fetch("https://dummyjson.com/users");
        const result = await data.json();
        
        return result;
    
    }catch (error) {
     console.log('FATAL ERROR: ', error.message)
    } 
}


const processUserData = async (data) =>  {

    const userNameList = data["users"].filter(x => x.gender == 'male');
    
    const nameAndAge = userNameList.map(x => {
        const { firstName, lastName, age } = x;
        return  `Name: ${firstName} ${lastName}, Age: ${age 
}`});

    console.log("Processed Users:")
    for (const user of nameAndAge) {
        console.log(`${user}`);
    }
    
}
const summarizeAge = (data) => {
    const userNameList = data["users"].filter(x => x.gender == 'male');
    const ages = userNameList.reduce((acc,x) => acc + Number(x.age),0);
    console.log("Total Age of Active Users:" + ages);
}

const x = fetchUserData();
x.then(result => {
    
    processUserData(result);
    summarizeAge(result);
}).catch(error => {
    console.log('Error occurred: ', error.message);
});
