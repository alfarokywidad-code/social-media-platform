import { createContext, useState, useEffect } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {

// !nawfal code 
      const [users, setUsers] = useState(()=>{

          const theProfil = localStorage.getItem('newUser');
          if (theProfil && theProfil !== "undefined") {
              return JSON.parse(theProfil)
          }
          
         return[
           {
            id: crypto.randomUUID(),
            isLoggedIn:true,
            name: "nawfal",
            username: "NOVA",
            email:"nawfal@gmail.com",
            age: '20',
            bio: "hellow",
            location: "alhoceima",
            imageProfile: "",
            coverImage: "",
            followers: [],
            following:[],
             posts: []
        },   
           ]
})

       useEffect(()=>{
        localStorage.setItem('newUser',JSON.stringify(users))
       },[users])
    

// !nawfal code


    // All posts
    const [posts, setPosts] = useState([]);

    // All comments
    const [comments, setComments] = useState([]);

    // All likes
    const [likes, setLikes] = useState([]);

    // All follow relationships
    const [follows, setFollows] = useState([]);


    return (
        <MyContext.Provider value={{users,setUsers, posts, setPosts, comments, setComments, likes, setLikes, follows, setFollows
        }}>
            {children}
        </MyContext.Provider>
    );
}