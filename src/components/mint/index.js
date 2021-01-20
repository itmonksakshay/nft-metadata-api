import React,{useState}from 'react';
import axios from 'axios';

function Mint(){

    const [uploadFile,setFile]= useState(null);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const submitForm =(e) => {
        e.preventDefault();
        let formData = new FormData(); 
        formData.append("name",name);
        formData.append("description",description);
        formData.append("file",uploadFile);
     axios.post('/api/token/mint',formData)
      .then(() => console.log('Book Created'))
      .catch(err => {
        console.error(err);
      });
    };

    return(<main>
                <div>
                    <form method="post" encType="multipart/form-data">
                            <input type="text" onChange={(e) =>setName(e.target.value)}/><br/>
                            <input type="text" onChange={(e) =>setDescription(e.target.value)}/><br/>
                            <input type="file" name="mint" onChange={(e) => setFile(e.target.files[0])}/><br/>
                            <input type="submit" value="submit" onClick={submitForm}/>

                    </form>
                </div></main>);

}
export default Mint;
