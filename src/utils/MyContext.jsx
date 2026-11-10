import { createContext, useState, useEffect } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {

// !nawfal code 
      const [profil,setProfil] = useState(()=>{

          const theProfil = localStorage.getItem('user');
          if (theProfil && theProfil !== "undefined") {
              return JSON.parse(theProfil)
          }
          
         return[
           {
            id: crypto.randomUUID(),
            isLoggedIn:false,
            name: "",
            username: "",
            age: '',
            bio: "",
            location: "",
            imageProfile: "",
            coverImage: "",
            followers: [],
            posts: []
        },   
           ]
})

       useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(profil))
       },[profil])
    

// !nawfal code


    // All registered users
    const [users, setUsers] = useState([]);

    // All posts
    const [posts, setPosts] = useState([]);

    // All comments
    const [comments, setComments] = useState([]);

    // All likes
    const [likes, setLikes] = useState([]);

    // All follow relationships
    const [follows, setFollows] = useState([]);


    return (
        <MyContext.Provider value={[profil,setProfil,users, setUsers, posts, setPosts, comments, setComments, likes, setLikes, follows, setFollows
        ]}>
            {children}
        </MyContext.Provider>
    );
}