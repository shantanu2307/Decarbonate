const router = require('express').Router();
const { model } = require('mongoose');
let User = require('../models/user.model');
const cors = require('cors');

const {PythonShell} = require('python-shell');

router.use(cors());

router.post('/user/add', (req, res) => {
    let user = req.body.user;
    console.log(user);
    let data = req.body;
    // User.findOne({uid: user.uid}, (err, result) => {
    //     if (err) {
    //         res.status(400).send(`Error: ${err}`);
    //     } else if (result) {
    //         res.status(402).send('User already exists');
    //     } else {
    //         let newUser = new User(user);
    //         newUser.save((err) => {
    //             if (err) {
    //                 res.status(402).send('Error in saving');
    //             } else {
    //                 res.status(200).send('OK');
    //             }
    //         });
            
    //     }
    // });
    let newUser = new User(user);
    newUser.save((err) => {
        if (err) {
            res.status(402).send('Error in creating user');
        } else {
            res.status(200).send('OK');
        }
    });
});

router.get('/user', (req, res) => {
    let data = req.body;
    User.findOne({uid: data.uid}, (err, user) => {
        if (err) {
            res.status(400).send(`Error: ${err}`);
        } else if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.get('/pythonscript', (req, res) => {
    var options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'],
        scriptPath: '/home/tanvee/Desktop/nitp/16JanV1/Decarbonate/server/python-scripts',
        args: [[1,2,3]]
    };

    PythonShell.run('hello.py', options, function(err, results) {
        console.log(results);
        res.json({data: results});
    })
});

router.post('/img', (req, res) => {
    let {img, height, width} = req.body;
    img = Object.values(img);
    console.log(img.length, height, width);
    console.log(img.length / (Number(height) * Number(width)));

    let data = {img, height, width};
    // var options = {
    //     mode: 'text',
    //     pythonPath: '/usr/bin/python3',
    //     pythonOptions: ['-u'],
    //     scriptPath: '/home/tanvee/Desktop/nitp/16JanV1/Decarbonate/server/python-scripts',
    //     args: [JSON.stringify(data)]
    // };

    // PythonShell.run('getCategoryAndFootprint.py', options, function(err, results) {
    //     console.log(results);
    //     res.json({data: results});
    // })
    let pyshell = new PythonShell('./server/python-scripts/getCategoryAndFootprint.py');

    // sends a message to the Python script via stdin
    pyshell.send(JSON.stringify(data));

    var result;
    pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        let temp = message.split(',');
        result = {
            item: temp[0],
            carbon: Number(temp[1]) / 1000
        };
        console.log(result);
    });
    // Paper bag,52.0
    // end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.json({data: result});
    });
});


// router.post('/signup', (req, res) => {
//     let data = {
//         username: req.body.username,
//         location: req.body.location,
//         uid: req.body.uid
//     };
//     let newUser = new User(data);
//     newUser.save((err) => {
//         if (err) {
//             res.status(404).send(`Error: ${err}`);
//         } else {
//             res.json({user: newUser});
//         }
//     })
// });




module.exports = router;