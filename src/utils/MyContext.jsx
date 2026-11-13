import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
    // All registered users
    const [users, setUsers] = useState(() => {

        const theProfil = localStorage.getItem("newUser");

        if (theProfil && theProfil !== "undefined") {
            return JSON.parse(theProfil);
        }

        return [
            {
                id: crypto.randomUUID(),
                isLoggedIn: false,
                name: "nawfal",
                username: "NOVA",
                email: "nawfal@gmail.com",
                age: "20",
                bio: "hellow",
                location: "alhoceima",
                imageProfile: "",
                coverImage: "",
                followers: [],
                following: [],
                posts: []
            }
        ];
    });


    // Save all users in localStorage
    useEffect(() => {
        localStorage.setItem("newUser", JSON.stringify(users));
    }, [users]);


    // Current logged-in user
    const currentUser = users.find(
        (user) => user.isLoggedIn === true
    ) ?? null;


    function toggleBookmark(postId) {
        if (currentUser == null || postId == null) return;

        setUsers((previousUsers) => previousUsers.map((user) => {
            if (user.id !== currentUser.id || !user.isLoggedIn) return user;

            const savedPostIds = user.savedPostIds ?? [];
            return {
                ...user,
                savedPostIds: savedPostIds.includes(postId)
                    ? savedPostIds.filter((id) => id !== postId)
                    : [...savedPostIds, postId]
            };
        }));
    }

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


    // Search
    // const [search, setSearch] = useState("");


    return (
        <MyContext.Provider
            value={{
                users,
                setUsers,
                currentUser,
                toggleBookmark,
                handleFollow,
                handleUnfollow,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}