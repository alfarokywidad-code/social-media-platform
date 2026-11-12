import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../../../utils/MyContext";
import "../components/Profil.css"
import MolengIcon from "../../../Assests/molengeekIcon.png"
import { IoPersonOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

function SignUp() {
    const thenavigater = useNavigate()

    const transfer = useNavigate()
    const [errorsc, setErrorsc] = useState("");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [Description, SetDescription] = useState('');

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const { users, setUsers } = useContext(MyContext);

    function Add(e) {
        e.preventDefault();

        const srchprfl = users.find((item) => item.email === email)

        if (srchprfl) {
            setErrorsc("the account already exist");
               setEmail('')
        setName('')
        setUsername('')
        setpassword('')
            //            localStorage.clear();
            // window.location.reload();
            return;
        }

        // ar then we use the oj
        setUsers([...users, {
            id: crypto.randomUUID(),
            isLoggedIn: false,
            name: name,
            username: username,
            email: email,
            password: password,
            age: '',
            bio: '',
            location: '',
            imageProfile: '',
            coverImage: '',
            followers: [],
            following: [],
            posts: []
        }]);
        setErrorsc('seccuss')
        setEmail('')
        setName('')
        setUsername('')
        setpassword('')
        // setTimeout(()=>{
        thenavigater('/')
        // },100)


    }




    return (
        <section className="themothercontainer">

            <div className="signside">
                <div className="siderimg"><img src={MolengIcon} alt="" /></div>

                <div className="thelefttext">
                    <div className="h2andicons"><h2>Connect</h2><GoDotFill style={{ fontSize: 'small', color: 'grey' }} /> <h2>Share</h2>  <GoDotFill style={{ fontSize: 'small', color: 'grey' }} /> <h2>Explore</h2>

                    </div>
                    <div className="thelefttext">
                        <p>Join our  community and be part</p>
                        <p> Of something bigger.</p>
                    </div>
                </div>

            </div>
            {/* the form part */}
            <div className="thesigncontainer">

                <div className="signuptext">
                    <div className="theimagebox">
                        <img className="theiconmoleng" src={MolengIcon} alt="" />
                        <h1>Create your account</h1>
                        <p>Join our community and start sharing your world. </p>
                    </div>

                </div>


                <form className="signform" action="" onSubmit={Add}>

          <div className="iconinput"><IoPersonOutline className="theicon"/><input className="inputsSign" type="text" placeholder="Full Name" value={name} onChange={event=>setName(event.target.value)}         required/></div> <br />
          <div className="iconinput"><IoPersonOutline className="theicon"/> <input className="inputsSign" type="text" placeholder="Username" value={username} onChange={event=>setUsername(event.target.value)}  required /></div> <br />
          <div className="iconinput"><MdOutlineEmail className="theicon"/><input className="inputsSign" type="email" placeholder="Email Adress" value={email} onChange={event=>setEmail(event.target.value)}   required /></div>  <br />
          <div className="iconinput"><RiLockPasswordFill className="theicon"/><input className="inputsSign" type="password" placeholder="Password" value={password} onChange={event=>setpassword(event.target.value)} required  /></div>  <br />
           <button type="submit" className="btnsign">Sign Up</button>
           <p className="error" style={{color: errorsc === "password or email is wrong" || "the account already exist" ? 'red' : 'green'}}>{errorsc}</p>
            <button className="loginlink">Already have an account <Link className="loginspan" to='/login' >Log in</Link></button>
        </form>

            </div>

        {/* </div> */}
        

         {/* <form className="signform" action="" onSubmit={Add}>

          <div className="iconinput"><IoPersonOutline className="theicon"/><input className="inputsSign" type="text" placeholder="Full Name" value={name} onChange={event=>setName(event.target.value)}         required/></div> <br />
          <div className="iconinput"><IoPersonOutline className="theicon"/> <input className="inputsSign" type="text" placeholder="Username" value={username} onChange={event=>setUsername(event.target.value)}  required /></div> <br />
          <div className="iconinput"><MdOutlineEmail className="theicon"/><input className="inputsSign" type="email" placeholder="Email Adress" value={email} onChange={event=>setEmail(event.target.value)}   required /></div>  <br />
          <div className="iconinput"><RiLockPasswordFill className="theicon"/><input className="inputsSign" type="password" placeholder="Password" value={password} onChange={event=>setpassword(event.target.value)} required  /></div>  <br />
           <button type="submit" className="btnsign">Sign Up</button>
           <p className="error" style={{color: errorsc === "password or email is wrong" ? 'red' : 'green'}}>{errorsc}</p>
            <button className="loginlink">Already have an account <Link className="loginspan" to='/login' >Log in</Link></button>
        </form> */}
     
      {/* </div> */}
            {/* the end of the form */}
        </section>


    )

}

export default SignUp