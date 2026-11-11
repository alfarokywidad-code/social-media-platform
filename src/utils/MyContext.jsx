import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const STORAGE_KEY = "newUser";

// Ensure every user has the required properties
function normalUser(user) {
    return {
        ...user,
        id: user.id || crypto.randomUUID(),
        isLoggedIn: user.isLoggedIn ?? false,
        name: user.name ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        password: user.password ?? "",
        age: user.age ?? "",
        bio: user.bio ?? "",
        location: user.location ?? "",
        imageProfile: user.imageProfile ?? "",
        coverImage: user.coverImage ?? "",
        followers: Array.isArray(user.followers) ? user.followers : [],
        following: Array.isArray(user.following) ? user.following : [],
        posts: Array.isArray(user.posts) ? user.posts : []
    };
}

export function MyProvider({ children }) {

    // All registered users
    const [users, setUsers] = useState(() => {
        try {
            const savedUsers = localStorage.getItem(STORAGE_KEY);

            if (!savedUsers || savedUsers === "undefined") {
                return [];
            }

            const parsedUsers = JSON.parse(savedUsers);

            // Support both an array and an old single-user object
            let usersArray = [];

            if (Array.isArray(parsedUsers)) {
                usersArray = parsedUsers;
            } else if (
                parsedUsers &&
                typeof parsedUsers === "object"
            ) {
                usersArray = [parsedUsers];
            }
            return usersArray.map(normalUser);

        } catch (error) {
            console.error("Error loading users:", error);
            return [];
        }
    });

    // Save all users whenever the list changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
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
