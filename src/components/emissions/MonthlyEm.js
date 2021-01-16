import React, {useEffect, useState} from 'react';

export default function MonthlyEm() {
    const [flightTime, setFlightTime] = useState(0);
    const [flightEm, setFlightEm] = useState(0);

    const [electricity, setElectricity] = useState(0);
    const [peopleCount, setPeopleCount] = useState(1);
    const [elecEm, setElecEm] = useState(0);

    function setVal(callback, val) {
        callback(Number(val));
    }

    useEffect(() => {
        setFlightEm(90 * flightTime);
    }, [flightTime]);

    useEffect(() => {
        setElecEm((0.9 * electricity) / peopleCount);
    }, [electricity, peopleCount]);

    return (
        <div className='transparent'>
            <table style={{width:'100%'}}>
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
                    </form>
                    </td>

                    <td style={{width:'30%',}}>
                        <h4>Your emissions</h4>
                        <p>Flights: {flightEm} kgs</p>
                        <p>Electricity: {elecEm} kgs</p>
                        <h6>Total: {flightEm + elecEm} kgs</h6>
                        <button className='submit-btn'>Save emissions</button>
                    </td>
                </tr>
            </table>
        </div>
    )
};