import React, {useState, useContext} from 'react';
import{Link, useHistory} from 'react-router-dom';
import M from "materialize-css";
import{UserContext} from '../../App';
const SignIn = () => {
    const {state, dispatch} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const postData = () => {
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid Email", classes:"#f44336 red"})
            return;
        }
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }else{
                localStorage.setItem("JWT", data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                dispatch({type:"User",payload:data.user})
                M.toast({html: "successfully Loged in", classes:"#4caf50 green"}) 
                history.push('/create')
            }
        })
    }



    return ( 
       
        <div>
            <div className = "card auth-card">
            <h1>SignIn</h1>
            <input type="text" placeholder = "email" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "password" placeholder = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick = {postData}>Submit</button>
            <Link to = "/signup"><h5>Don't have account</h5></Link> 

            </div>
            

        </div>
     );
}
 
export default SignIn;