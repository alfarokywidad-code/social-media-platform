import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();


// Ensure every user has the required properties
// function normalUser(user) {
//     return {
//         ...user,
//         id: user.id || crypto.randomUUID(),
//         isLoggedIn: user.isLoggedIn ?? false,
//         name: user.name ?? "",
//         username: user.username ?? "",
//         email: user.email ?? "",
//         password: user.password ?? "",
//         age: user.age ?? "",
//         bio: user.bio ?? "",
//         location: user.location ?? "",
//         imageProfile: user.imageProfile ?? "",
//         coverImage: user.coverImage ?? "",
//         followers: Array.isArray(user.followers) ? user.followers : [],
//         following: Array.isArray(user.following) ? user.following : [],
//         posts: Array.isArray(user.posts) ? user.posts : []
//     };
// }

export function MyProvider({ children }) {

    // All registered users
    const [users, setUsers] = useState(() => {

        const theProfil = localStorage.getItem('newUser');
        if (theProfil && theProfil !== "undefined") {
            return JSON.parse(theProfil)
        }

        return [
            {
                id: crypto.randomUUID(),
                isLoggedIn: false,
                name: "nawfal",
                username: "NOVA",
                email: "nawfal@gmail.com",
                age: '20',
                bio: "hellow",
                location: "alhoceima",
                imageProfile: "",
                coverImage: "",
                followers: [],
                following: [],
                posts: []
            },
        ]
    })



    // Save all users whenever the list changes
    useEffect(() => {
        localStorage.setItem("newUser", JSON.stringify(users));
    }, [users]);

    //   current user
    const currentUser = users.find(
        (user) => user.isLoggedIn === true
    ) ?? null;

    // Follow a user
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

    // Unfollow a user
    function handleUnfollow(currentUserId, targetUserId) {

        if (currentUserId === targetUserId) return;

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
        <MyContext.Provider
            value={{
                users,
                setUsers,
                currentUser,
                handleFollow,
                handleUnfollow
            }}
        >
            {children}
        </MyContext.Provider>
    );
}
