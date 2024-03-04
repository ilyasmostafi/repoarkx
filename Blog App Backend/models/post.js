//getAllPosts,
// createPost


// function qui font le traitement 
const fs = require('fs');

let data;


function readDataFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile("models/blog.json", (err, rawdata) => {
            if (err) {
                console.error("Error reading file:", err);
                reject(err);
            } else {
                try {
                    data = JSON.parse(rawdata);
                    resolve(data);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    reject(error);
                }
            }
        });
    });
}
 
 function writefile(path , content, dataFromController , message){
    return new Promise((resolve,reject) =>{
        fs.writeFile(path , content , (err) =>{
            if(err){
                console.log("Error writing file : " ,err);
                reject(err);
            }
            else{ 
                console.log("blog with the Id :" , dataFromController , "was " , message ," successfully");
                resolve(true);
            }
        });
    })
    
 }

 async function getAllPosts() {
    if (!data) {
        try {
            await readDataFromFile();
        } catch (error) {
            throw new Error("Failed to read data from file.");
        }
    }
    return data;
}


async function createPost(dataPost){
    try {
    if(JSON.stringify(dataPost) != '{}'){
    let data2 = await getAllPosts();
    data2.push(dataPost);
    const jsonData = JSON.stringify(data2, null , 2);

    await writefile("models/blog.json" , jsonData , dataPost.Id , "created" );
    console.log(data);
    return true;
    }
    else{
        console.log("Request body is empty");
      return null;
    }
    }  
    catch (err){
      console.error("Error : ",err);
      return false;;
    }
}

async function updatePost(postData){
    try {
    let data2 = await getAllPosts();
    const post = data2.findIndex(x => x.Id == postData.Id);
    if(post !== undefined){
        data2[post].Title = postData.Title;
        data2[post].Content = postData.Content;     
            const jsonData = JSON.stringify(data2, null , 2);
            await writefile("models/blog.json" , jsonData , postData.Id , "updated" );
            return true;       
    }  
    else{
        console.log("There is no post with this Id");
        return null;
    }    
    }catch (error) {
        console.error("Error updating post:", error);
        return false;
    } 
}

async function deletePost(Id){
    try{
    let data2 = await getAllPosts();
    const postToDelete = data2.findIndex(x => x.Id == Id); 
    if (!postToDelete) {
        console.log("Post with ID", Id, "not found.");
        return null; 
    }else{
        data2.splice(postToDelete, 1);
        const jsonData = JSON.stringify(data2, null , 2);
    
            await writefile("models/blog.json" , jsonData , Id , "deleted" );
            return true; 
    } 
    }
    catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }        
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}