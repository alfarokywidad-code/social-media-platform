import {useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../../../utils/MyContext";
import "../components/Profil.css"
import MolengIcon from "../../../Assests/molengeekIcon.png"
import { IoPersonOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

function LogIn() {
const thenavigate = useNavigate()

   const [error,setError] = useState("");
   const [thechecked,setIschecked] = useState(false);
   const [name,setName] = useState("");
//    const [Descr,SetDescr] = useState('');

   const[emailsc,setEmailsc] = useState("");
   const[usernamesc,setUsernamesc] = useState("");
   const [passwordsc,setpasswordsc] = useState("");

   const {users,setUsers} = useContext(MyContext);
   
   function Regist(e){
    e.preventDefault();

    const srchprfl = users.find((item)=>(item.email===emailsc || item.username === usernamesc) && item.password===passwordsc )

    if (!srchprfl) {

        // document.querySelector('.error').style.opacity = 1
        // document.querySelector('.error').textContent="the account doesn't exist"
        setEmailsc('')
        setpasswordsc('')
        setError("email or password is wrong!");
       
        return;
    }
  
    // if (thechecked === false) {
    //     setError("please click on the checkbox ")
    //     return;
    // }

    const updatedUsers = users.map(user => {
        if (user.id === srchprfl.id || user.email === srchprfl.email) {
            return { ...user, isLoggedIn: true };
        }
        return { ...user, isLoggedIn: false }; 
    });
    setUsers(updatedUsers);
//    document.querySelector('.error').style.opacity = 1
        setError("loged seccussfull!");
       
    // alert('loged seccussfull!')
    thenavigate('/')


    }
return(

    <section  className="themothercontainer">

            <div className="signside">
<div className="siderimg"><img src={MolengIcon} alt="" /></div>

<div className="thelefttext">
   <div className="h2andicons"><h2>Connect</h2><GoDotFill style={{fontSize:'small',color:'grey'}}/> <h2>Share</h2>  <GoDotFill style={{fontSize:'small',color:'grey'}}/> <h2>Explore</h2>
   
   </div>
    <div className="thelefttext">
        <p> Your community is waiting </p> 
       <p> explore and learn something new. </p>
    </div>
</div>

            </div>

{/* the container of the form */}
            <div className="thesigncontainer">

    <div className="signuptext">
              <div className="theimagebox">
                  <img className="theiconmoleng" src={MolengIcon} alt="" />
              </div>
  
              <h1>Log in</h1>
              <p>Log in into your account to continue</p>
          </div>
        

         <form className="signform" onSubmit={Regist}  action="" >

          <div className="iconinput"><MdOutlineEmail className="theicon"/><input className="inputsSign" type="text"  placeholder="Email Adress " value={emailsc} onChange={event=>setEmailsc(event.target.value)}   required /></div>  <br />
          <div className="iconinput"><RiLockPasswordFill className="theicon"/><input className="inputsSign" type="password" placeholder="Password" value={passwordsc} onChange={event=>setpasswordsc(event.target.value)} required  /></div>  <br />
        {/* the checkbox and the text of passwordForgotten */}
        {/* <div className="check">
           <input type="checkbox" className="thechek" checked={thechecked}  onChange={event=>setIschecked(event.target.checked)} />
            <p style={{color:'violet'}}>Password forgotten</p>
        </div> */}
           <button type="submit" className="btnsign">Log in</button>
           <p className="error" style={{color: error === "email or password is wrong!" ? 'red' : 'green' }}>{error}</p>

{/* the or condition with its lines */}
           <div className="divoftheorcondetion"><div className="line"></div><p>or</p><div className="line"></div></div>
{/* the or condition with its lines */}
<button className="thecreatebtn"><Link className="thelink" to='/sign'>Create an account</Link></button>
        </form>

      </div>
    </section>

)
}

export default LogIn