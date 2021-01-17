import react, {useEffect, useState} from 'react';
import './../../css/chat.css'
import Post from './Post';
import {useAuth} from './../../firebase/auth';
import axios from 'axios';

export default function Forum() {

    const {currentUser} = useAuth();

    function getChats() {
        // var chats = await axios.get('http://localhost:8080/getchats')
        // for (var chat of chats) {
        //     <Post key='chat.cid' text={chats.content} chatdate={chats.date} votes={votes} />;
        // }
    }

    function addPost() {
        let text = document.getElementById('postinp').value;
        let uid = currentUser.uid;
        let data = {
            content: text,
            uid: uid
        }
        axios.post('http://localhost:8080/chat', data)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(err => console.log('error-->', err));
    }

    const [gotChats, setGotChats] = useState(false);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/getchats')
            .then(res => {
                function compare(a, b) {
                    if (a.date < b.date)
                        return 1;
                    else if (a.date > b.date)
                        return -1;
                    else
                        return 0;
                }
                let allchats = res.data;
                allchats.sort(compare);
                setChats(allchats);
                console.log(allchats);
                setGotChats(true);
            })
            .catch(err => console.log('error->', err));
        
    }, [])

    return (
        <>
            <div className='getPost'>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width:'85%'}}>
                                <textarea id='postinp'></textarea>
                            </td>
                            <td style={{textAlign:'right'}}>
                                <button className='btn btn-dark' onClick={addPost}>Add Post</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {gotChats && chats.map(chat => <Post key={chat._id} cid={chat._id} text={chat.content} date={chat.date} votes={chat.votes} />)}
            </div>
        </>
    );
}