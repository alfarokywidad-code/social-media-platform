import { createContext, useState } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {

    // All registered users
    const [users, setUsers] = useState([
        {
            id: crypto.randomUUID(),
            isLoggedIn: false,
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
            isLoggedIn: false,
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
            isLoggedIn: false,
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
            isLoggedIn: false,
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
            isLoggedIn: false,
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
            isLoggedIn: false,
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
            isLoggedIn: true,
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
    // search haeder
    const [search, setSearch] = useState("");


    const currentUser = users.find(
        (user) => user.isLoggedIn === true
    ) ?? null;


    function handleFollow(currentUserId, targetUserId) {

        if (currentUserId === targetUserId) return;

        setUsers((prevUsers) => {

            const currentUser = prevUsers.find(
                (user) => user.id === currentUserId
            );

            const targetUser = prevUsers.find(
                (user) => user.id === targetUserId
            );

            if (
                !currentUser ||
                !targetUser ||
                currentUser.following.includes(targetUserId)
            ) {
                return prevUsers;
            }

            return prevUsers.map((user) => {

                if (user.id === currentUserId) {
                    return {
                        ...user,
                        following: [...user.following, targetUserId]
                    };
                }

                if (user.id === targetUserId) {
                    return {
                        ...user,
                        followers: [...user.followers, currentUserId]
                    };
                }

                return user;
            });
        });
    }

    function handleUnfollow(currentUserId, targetUserId) {

        setUsers((prevUsers) => {

            return prevUsers.map((user) => {

                if (user.id === currentUserId) {
                    return {
                        ...user,
                        following: user.following.filter(
                            (id) => id !== targetUserId
                        )
                    };
                }

                if (user.id === targetUserId) {
                    return {
                        ...user,
                        followers: user.followers.filter(
                            (id) => id !== currentUserId
                        )
                    };
                }

                return user;
            });
        });
    }

    return (
        <MyContext.Provider value={{
            users, setUsers, search, setSearch,
            posts, setPosts, comments, setComments,
            likes, setLikes, follows, setFollows,
            handleFollow, handleUnfollow, currentUser
        }}>
            {children}
        </MyContext.Provider>
    );
}