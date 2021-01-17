const router = require('express').Router();
const { model } = require('mongoose');
let User = require('../models/user.model');
const cors = require('cors');

const {PythonShell} = require('python-shell');

router.use(cors());

router.post('/user/add',async (req, res) => {
    try{
        console.log(req.body)
     const newUser = await new User(req.body.user);
     await newUser.save();
     res.send("User formed")
    }
    catch(e)
    {
console.log(e);
res.send("error in saving!")
    }
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