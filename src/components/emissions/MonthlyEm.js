import React, {useEffect, useState} from 'react';
import {useAuth} from './../../firebase/auth';
import axios from 'axios';

export default function MonthlyEm() {
    const [flightTime, setFlightTime] = useState(0);
    const [flightEm, setFlightEm] = useState(0);

    const [electricity, setElectricity] = useState(0);
    const [peopleCount, setPeopleCount] = useState(1);
    const [elecEm, setElecEm] = useState(0);

    const [lpg, setLpg] = useState(0);
    const[gasEm, setGasEm] = useState(0);

    function setVal(callback, val) {
        callback(Number(val));
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        setFlightEm(90 * flightTime);
    }, [flightTime]);

    useEffect(() => {
        setElecEm((0.9 * electricity) / peopleCount);
    }, [electricity, peopleCount]);

    useEffect(() => {
        setGasEm(1.77 * lpg / peopleCount);
    }, [lpg]);

    function saveEm() {
        let data = {
            uid: currentUser.uid,
            flights: flightEm,
            electricity: elecEm,
            gas: gasEm,
            total: (Number(flightEm) + Number(elecEm) + Number(gasEm))
        };
        console.log(data);
        axios.post('http://localhost:8080/monthly', data)
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
                            <h4>Flights</h4>
                            <label>Total time in air in hrs </label>
                            <input type='number' min={0} onChange={e => setVal(setFlightTime, e.target.value)} />
                            <br/>

                            <h4>Electricity</h4>
                            <label>Number of people in the house </label>     
                            <input type='number' min={1} onChange={e => setVal(setPeopleCount, e.target.value)} />
                            <br />
                            <label>Electricity used in kWh </label>
                            <input type='number' min={0} onChange={e => setVal(setElectricity, e.target.value)} />
                            <br/>
                            <h4>Gas</h4>
                            <label>LPG used in L </label>
                            <input type='number' min={0} onInput={e => setVal(setLpg, e.target.value)} />
                            <br/>
                        </form>
                        </td>

                        <td style={{width:'30%',}}>
                            <h4>Your emissions</h4>
                            <p>Flights: {flightEm} kgs</p>
                            <p>Electricity: {elecEm} kgs</p>
                            <p>gasEm: {gasEm} kgs</p>
                            <h6>Total: {flightEm + elecEm + gasEm} kgs</h6>
                            {isLoggedIn && <button className='submit-btn' onClick={saveEm}>Save emissions</button>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};