
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../utils/MyContext";

function Logout() {
    const { setUsers } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => ({
                ...user,
                isLoggedIn: false
            }))
        );

        navigate("/login", { replace: true });
    }, [setUsers, navigate]);

    return null;
}

export default Logout;
