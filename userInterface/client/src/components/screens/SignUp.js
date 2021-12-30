import React, {useState} from 'react';
import{Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const postData = () => {
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid Email", classes:"#f44336 red"})
            return;
        }
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            //console.log(data.error)
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }else{
                M.toast({html: "successfully Loged in", classes:"#4caf50 green"}) 
                history.push('/SignIn')
            }
        })
    }
    return ( 
        
        <div className = "card auth-card">
        <h1>SignUp</h1>
            <input type="text" placeholder = "name" value = {name} onChange = {e => setName(e.target.value)}/>
            <input type="text" placeholder = "email" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "password" placeholder = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick = {postData}>Submit</button>
        <Link to = "/signin"><h5>Already have account</h5></Link> 

        </div>
       
     );
}
 
export default SignUp;