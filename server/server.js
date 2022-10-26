require('dotenv').config()
const express = require('express')
const cors = require('cors');
const axios = require('axios');
const path = require('path')
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())


// // Connection to mongoDB database
const mongoUrl = process.env.MONGO_URI

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    dbName:"plants"
}).then(() => {
    console.log('connected to database');
    
}).catch(e => console.log(e));

// require('./userDetails');

app.use(express.static(path.resolve(__dirname, '../client/build')))


app.use(express.urlencoded({ extended: true }));

app.use('/toilets', require('./controllers/toilets_controller'))
app.use('/users', require('./controllers/user_controller'))
app.use('/authentication', require('./controllers/auth_controller'))

app.get('/message', (req, res) => {
    res.json({message: "message"});
});


// app.get('/', (req, res) => {
//     res.json('hi')
// })

// app.get('/', (req, res) => {
//     res.json('Hello API')
// })

// for sign-up and maybe log-in??? (Shane)
// app.post('/post', async (req, res) => {
//     console.log(req.body);
//     const { data } = req.body;

//     try {
//         if (data == "") {
//             res.send({ status: 'ok'});
//         } else {
//             res.send({ status: 'User not found'});
//         }
//     } catch (error) {
//         res.send({ status: 'Something went wrong try again'});
//     }
// });

// require('./userDetails');

// const User = mongoose.model('UserInfo');

// app.post('/register', async (req, res) => {

//     const { name, email } = req.body;
//     try {
//         await User.create({
//             name: name,
//             email: email,
//         });
//         res.send({ status: 'ok'})
//     } catch (error) {
//         res.send({ status: 'error' });
//     }
// });
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
