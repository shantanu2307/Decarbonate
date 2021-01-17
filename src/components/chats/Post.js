import react, {useState} from 'react';
import axios from 'axios';
import {useAuth} from './../../firebase/auth';

export default function Post(props) {

    const {currentUser} = useAuth();
    const [votecount, setvotecount] = useState(props.votes);
    function sendLike(e) {
        var elt = e.target.parentNode.parentNode;
        var cid = props.cid;
        var uid = currentUser.uid;
        axios.post('http://localhost:8080/vote', {vid: uid, cid: cid})
            .then((res) => {
                if (res.data == 'new vote accepted!') {
                    console.log('voted');
                    setvotecount(votecount + 1);
                } else {
                    console.log('not accepted');
                }
            })
            .catch(err => console.log('err->', err));
    }

    return (
        <div className='post' id={props.cid}>
            <div className='posttext'>
                <p>{props.text}</p>
            </div>
            <div className='postlikearea'>
                <i className="fa fa-thumbs-o-up" style={{fontSize:'26px', color:'white', backgroundColor:'green', width:'36px', height:'36px', borderRadius:'50%', padding:'5px'}} onClick={sendLike}></i>
                <span style={{marginLeft:'1em'}} id='votes'>{votecount}</span>
                <span style={{marginLeft:'1em'}}> Likes</span>
                <input type='text' placeholder='Comment' style={{marginLeft:'1em'}}/>
                <i className="fa fa-send-o" style={{fontSize:'20px', color:'white', backgroundColor:'green', width:'30px', height:'30px', padding:'5px'}}></i>
                <span style={{marginLeft:'5em'}}>{props.date.split('T')[0]}</span>
            </div>
        </div>
    )
}