import React,{useState, useEffect,useContext} from 'react';
import {UserContext} from '../../App';
const Profile = () => {
    const {state, dispatch} = useContext(UserContext) 
    const [myPic, setPic] = useState([]);
    useEffect(() => {
        console.log(state)
        fetch('/mypost',{
            method:"get",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("JWT")
            }
        }).then(res => res.json()).then(result =>{
            setPic(result.myPost)
        })
    },[])
   
    return ( 
        <div>
          
             <div style = {{display:"flex", justifyContent:"space-around",margin:"18px,0px", borderBottom:"1px solid grey"}}>
                 <img style = {{width:"160px", height:"160px", borderRadius:"80px", margin:"18px 0px"}} src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTF8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                 <div>
                     <h4>{state?state.name:"loading"}</h4>
                     <div style = {{display:"flex", justifyContent:"space-between", width:"108%"}}>
                         <h6>40 posts</h6>
                         <h6>40 followers</h6>
                         <h6>40 following</h6>
                     </div>
                     </div>
                 </div>
        <div className ="gallery">
        {myPic.map(item => {
        return(
            <img className = "item" key={item._id} src={item.photo} />
        )
    })}
            
            

        </div>
        </div>
     );
}
 
export default Profile;