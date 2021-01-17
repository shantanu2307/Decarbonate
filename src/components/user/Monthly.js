import React, {useEffect, useState} from 'react';
import {useAuth} from './../../firebase/auth';
import axios from 'axios';
import {Chart} from 'react-google-charts';

export default function Monthly() {
    
    const [chartData, setChartData] = useState([['Month', 'Carbon emission in kgs']]);

    const { currentUser } = useAuth();

   
    useEffect(() => {
        if (currentUser && currentUser.uid) {
            let data = {uid: currentUser.uid};
            axios.post('http://localhost:8080/getmonthly', data)
                .then(response => {
                    var graphdata = [['Month', 'Carbon emission in kgs']];
                    const names = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    for (var i = 1; i <= 12; i++) {
                        graphdata.push([names[i], 0]);
                    }
                    console.log(response.data);
                    for (var i of response.data) {
                        graphdata[i.month][1] += i.total;
                    }
                    console.log(graphdata);
                    setChartData(graphdata);
                })
                .catch(err => console.log('error --> ', err));
        }
    }, []);

    return (
        <div style={{ display: 'flex', maxWidth: 1200 }}>
            <Chart
                width={1000}
                height={450}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                title: 'Monhtly Carbon Emission',
                chartArea: { width: '70%' },
                hAxis: {
                    title: 'Month',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Carbon Emission in kgs',
                },
                }}
                legendToggle
            />
            
            </div>
    )
};