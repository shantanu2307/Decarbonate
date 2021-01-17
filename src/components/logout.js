import react, {useEffect} from 'react';
import {useAuth} from './../firebase/auth';
import {useHistory} from 'react-router-dom';

export default function Logout() {
    let {logout} = useAuth();
    const history = useHistory();
    async function loggingout() {
        await logout();
        history.push("/");
    }
    useEffect(() => {
        loggingout();
    }, []);
    return (<div></div>);
}