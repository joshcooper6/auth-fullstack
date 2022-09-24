const express = require("express")
const connectDB = require('./db')
const app = express()
const path = require('path');
const User = require("./model/User");
const { randomUUID } = require("crypto");

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
 PORT = 4000;
}

connectDB();

// app.use(express.static(path.resolve(__dirname, './public/index.html')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  
    next()
  });


app.post('/login-user', async (req, res) => {
    try {
        const data = req.body;
        const UserFromDB = await User.findOne({username: data?.username});
        const verified = (data?.password === UserFromDB?.password);

        // const sessionToken = randomUUID();
        // const now = new Date()
        // const expiresAt = new Date(+now + 120 * 1000)

        if (verified) {
            res.send('verified');
            console.log('User Verified... Information below:')
            console.log('USER FROM MONGO', UserFromDB);
            console.log('USER FROM FRONTEND', data);
        } else {
            res.status(401).end();
        }
    } catch (err) {
        console.log('ERROR', err)
    }
})

app.post('/register-user', async (req, res) => {
    try {
        const data = req.body;

        const UserFromDB = await User.findOne({username: data?.username});

        if (UserFromDB?.username) {
            res.send('User exists.')
        } else {
            const newUser = await User.create({
                username: data?.username,
                password: data.password,
            })

            console.log("***NEW USER", newUser)
            res.status(200).send({user: newUser})
        }

    } catch (err) {
        console.log(err)
    }
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})

app.listen(PORT, () => console.log(`Hey girl, your server is connected to port ${PORT}`))