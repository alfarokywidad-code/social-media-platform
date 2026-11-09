import { createContext, useState } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {

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
        <MyContext.Provider value={[users, setUsers, posts, setPosts, comments, setComments, likes, setLikes, follows, setFollows
        ]}>
            {children}
        </MyContext.Provider>
    );
}