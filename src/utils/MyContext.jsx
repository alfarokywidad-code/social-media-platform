import { createContext, useState } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {

    // All registered users
    const [users, setUsers] = useState([
                {
            id: crypto.randomUUID(),
            name: "Ahmed Makrini",
            username: "ahmed",
            age: 22,
            bio: "Passionate about technology and programming.",
            location: "Al Hoceima, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Walid Tghz",
            username: "walid",
            age: 24,
            bio: "React developer and technology enthusiast.",
            location: "Al Hoceima, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Warda",
            username: "warda",
            age: 21,
            bio: "Creative mind and social media lover.",
            location: "Tangier, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Widad",
            username: "widad",
            age: 23,
            bio: "Technical Lead and web developer.",
            location: "Al Hoceima, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Ashraf",
            username: "ashraf",
            age: 22,
            bio: "Interested in web development and design.",
            location: "Nador, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Nawfal",
            username: "nawfal",
            age: 25,
            bio: "Learning, building and sharing ideas.",
            location: "Fes, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        },
        {
            id: crypto.randomUUID(),
            name: "Zakaria",
            username: "zakaria",
            age: 23,
            bio: "Technology, creativity and innovation.",
            location: "Rabat, Morocco",
            imageProfile: "https://img.magnific.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
            coverImage: "",
            followers: [],
            following: [],
            posts: []
        }

    ]);

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