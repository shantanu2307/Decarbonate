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
    let newUser = new User(user);
    newUser.save((err) => {
        if (err) {
            console.log('error in saving');
            res.status(402).send('Error in creating user');
        } else {
            console.log('user created')
            res.status(200).send('OK');
        }
    });
});

router.post('/user/get', (req, res) => {
    let data = req.body;
    console.log(data);
    User.findOne({uid: data.uid}, (err, user) => {
        if (err) {
            console.log('mongo error');
            res.status(400).send(`Error: ${err}`);
        } else if (user) {
            console.log(user);
            res.json(user);
        } else {
            console.log('user not found');
            res.status(404).send('User not found');
        }
    });
});

router.post('/img', (req, res) => {
    let {img, height, width} = req.body;
    img = Object.values(img);
    console.log(img.length, height, width);
    console.log(img.length / (Number(height) * Number(width)));

    let data = {img, height, width};
    let pyshell = new PythonShell('./server/python-scripts/getCategoryAndFootprint.py');

    // sends a message to the Python script via stdin
    pyshell.send(JSON.stringify(data));

    var result;
    pyshell.on('message', function (message) {
        console.log(message);
        let temp = message.split(',');
        result = {
            item: temp[0],
            carbon: Number(temp[1]) / 1000
        };
        console.log(result);
    });
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.json({data: result});
    });
});




module.exports = router;