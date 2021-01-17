import react, {useEffect} from 'react';
import {useAuth} from './../firebase/auth';
import {useHistory} from 'react-router-dom';

export default function Logout() {
    let {logout} = useAuth();
    const history = useHistory();
    async function loggingout() {
        await logout();
        let show = document.getElementsByClassName('loggedout');
        let hide = document.getElementsByClassName('loggedin');
        for (var i of show) {
            i.style['display'] = '';
        }
        for (var i of hide) {
            i.style['display'] = 'none';
        }
        history.push("/");
    }
    useEffect(() => {
        loggingout();
    }, []);
    return (<div></div>);
}