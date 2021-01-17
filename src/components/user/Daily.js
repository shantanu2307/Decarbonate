import React, {useEffect, useState} from 'react';
import {useAuth} from './../../firebase/auth';
import axios from 'axios';
import {Chart} from 'react-google-charts';

export default function Daily() {
    
    const [chartData, setChartData] = useState([['Day', 'Carbon emission in kgs']]);

    const { currentUser } = useAuth();

   
    useEffect(() => {
        if (currentUser && currentUser.uid) {
            let data = {uid: currentUser.uid};
            axios.post('http://localhost:8080/getdaily', data)
                .then(response => {
                    var graphdata = [['Day', 'Carbon emission in kgs']];
                    for (var i = 1; i <= 31; i++) {
                        graphdata.push([i, 0]);
                    }
                    console.log(response.data);
                    for (var i of response.data) {
                        graphdata[i.date][1] += i.total;
                    }
                    console.log(graphdata);
                    setChartData(graphdata);
                })
                .catch(err => console.log('error --> ', err));
        }
    }, []);

    return (
        <div style={{ display: 'flex', maxWidth: 900 }}>
        
        <Chart
        width={'800px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
            title: 'Daily Carbon Emission',
            hAxis: {
            title: 'Day',
            },
            vAxis: {
            title: 'Carbon Emission in kgs',
            },
        }}
        rootProps={{ 'data-testid': '1' }}
        />
        </div>
    )
};