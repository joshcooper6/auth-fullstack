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

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  
    next()
  });

app.get('/', async (req, res) => {
    res.send({success: false, user: null})
})

app.post('/login-user', async (req, res) => {
    try {
        const data = req.body;
        const UserFromDB = await User.findOne({username: data?.username});
        const verified = (data?.password === UserFromDB?.password);

        if (!UserFromDB) {
            res.send('user-not-exist')
        }

        // const sessionToken = randomUUID();
        // const now = new Date()
        // const expiresAt = new Date(+now + 120 * 1000)

        if (verified) {
            res.send({success: true, user: UserFromDB});
            console.log('User Verified... Information below:');
            console.log('USER FROM MONGO', UserFromDB);
            console.log('USER FROM FRONTEND', data);
        } else {
            res.status(401).end();
        }
    } catch (err) {
        console.log('ERROR', err)
    }
})

app.get('/dashboard', async (req, res) => {
    try {
        console.log('working')
    } catch (err) {
        console.log(err);
    }
});

app.post('/dashboard', async (req, res) => {
    try {
        const data = req.body;
        const current = data.currentUser;
        const formData = data.formData;
        // updates the user
        const UserFromDB = await User.findOneAndUpdate({username: current?.username}, formData);
        // returns the updated user
        const updatedUser = await User.findOne({username: current?.username});
        res.status(200).send({success: true, updatedUser: true, user: updatedUser});
    } catch (err) {
        console.log(err)
    }
});

app.post('/register-user', async (req, res) => {
    try {
        const data = req.body;
        const UserFromDB = await User.findOne({username: data?.username});

        if (UserFromDB?.username) {
            res.send({success: false, message: 'user-exists'});
            console.log('user-exists')
        } else {
            const newUser = await User.create({
                username: data?.username,
                password: data?.password,
                firstName: "",
                lastName: "",
                email: ""
            });

            console.log("***NEW USER", newUser);
            res.status(200).send({success: true, newlyCreated: true, user: newUser});
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