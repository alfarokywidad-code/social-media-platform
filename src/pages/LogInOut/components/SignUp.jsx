import React,{useState} from "react";

function SignUp() {
   const [Info,setInfo] = useState([]);
   const [name,setName] = useState('');
   const [Descr,SetDescr] = useState('');
   
   function Add(){

    setInfo({...Info,name:name,descrption:Descr})

    setName('');
    SetDescr('');
    }


    return(
    <div>

        <div>
            <div></div>

            <h1>Create your account</h1>
            <p>Join our community and start sharing your world. </p>
        </div>
        

         <form action="" onSubmit={Add}>

            <input type="text" placeholder="Full Name" /><br />
            <input type="text" placeholder="Username" /><br />
            <input type="email" placeholder="Email Adress" /><br />
            <input type="password" placeholder="Password" /><br />
            <button>Sign Up</button>

            <p>Already have an account <Link>Log in</Link></p>
        </form>
     
      
        
    )
    
}

export default SignUp