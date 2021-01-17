import React, {useEffect, useState} from 'react';
import '../../css/emission.css'
import { useAuth } from './../../firebase/auth';
import axios from 'axios';

export default function DailyEm() {
    const [showerTime, setShowerTime] = useState(0);
    const [waterEm, setWaterEm] = useState(0);

    const [petrol, setPetrol] = useState(0);
    const [diesel, setDiesel] = useState(0);
    const [busAndRick, setBusAndRick] = useState(0);
    const [locTrain, setLocTrain] = useState(0);
    const [commuteEm, setCommuteEm] = useState(0);

    const [gsearch, setGsearch] = useState(0);
    const [edeviceEm, setEdeviceEm] = useState(0);

    const [lpg, setLpg] = useState(0);
    const[gasEm, setGasEm] = useState(0);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            setIsLoggedIn(true);
        }
    }, []);

    function setVal(callback, val) {
        callback(Number(val));
    }

    useEffect(() => {
        setWaterEm(0.2126 * showerTime);
    }, [showerTime]);

    useEffect(() => {
        setCommuteEm(2.32 * petrol + 2.68 * diesel + 0.05 * busAndRick + 0.1 * locTrain);
    }, [petrol, diesel, busAndRick, locTrain]);

    useEffect(() => {
        setEdeviceEm(0.0002 * gsearch);
    }, [gsearch]);

    useEffect(() => {
        setGasEm(1.77 * lpg);
    }, [lpg]);

    function saveEm() {
        let data = {
            uid: currentUser.uid,
            water: waterEm,
            commute: commuteEm,
            electronicDevices: edeviceEm,
            gas: gasEm,
            total: (Number(waterEm) + Number(commuteEm) + Number(edeviceEm) + Number(gasEm))
        }
        axios.post('http://localhost:8080/daily', data)
            .then(response => console.log(response))
            .catch(err => console.log('error --> ', err));
    }

    return (
        <div className='transparent'>
            <table style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td>
                        <form>                       
                            <h4>Water</h4>
                            <label>Shower Time in mins </label>
                            <input type='number' min={0} onInput={e => setVal(setShowerTime, e.target.value)} />
                            <br/>

                            <h4>Commute</h4>
                            <label>Petrol used in L </label>
                            <input type='number' min={0} onInput={e => setVal(setPetrol, e.target.value)} />
                            <br/>
                            <label>Diesel used in L </label>
                            <input type='number' min={0} onInput={e => setVal(setDiesel, e.target.value)} />
                            <br/>
                            <label>Km travelled in Bus and Rickshaw </label>
                            <input type='number' min={0} onInput={e => setVal(setBusAndRick, e.target.value)} />
                            <br/>
                            <label>Km travelled in Local Train </label>
                            <input type='number' min={0} onInput={e => setVal(setLocTrain, e.target.value)} />
                            <br/>

                            <h4>Electronic Devices</h4>
                            <label>Number of google searches </label>
                            <input type='number' min={0} onInput={e => setVal(setGsearch, e.target.value)} />
                            <br/>

                            <h4>Gas</h4>
                            <label>LPG used in L </label>
                            <input type='number' min={0} onInput={e => setVal(setLpg, e.target.value)} />
                            <br/>
                        </form>
                        </td>

                        <td style={{width:'30%',}}>
                            <h4>Your emissions</h4>
                            <p>Water: {waterEm} kgs</p>
                            <p>Commute: {commuteEm} kgs</p>
                            <p>Electronic Devices: {edeviceEm} kgs</p>
                            <p>gasEm: {gasEm} kgs</p>
                            <h6>Total: {waterEm + commuteEm + edeviceEm + gasEm} kgs</h6>
                            {isLoggedIn && <button className='submit-btn' onClick={saveEm}>Save emissions</button>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};