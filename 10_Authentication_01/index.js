const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());


const DIARY = {};
const EMAIL = new Set();

app.get('/my-diary', (req, res) => {
    return res.status(200).json({data: DIARY});
})

app.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    if(EMAIL.has(email)) {
        return res.status(400).json({error:'Email already taken'})
    }
    // Create a token for user
    const token = `${Date.now()}`;
    // do a entry for dairy
    DIARY[token] = {name, email, password};
    EMAIL.add(email);
    return res.json({status: 'SUCCESS', token})
})

// like I want to take my card 
app.post('/me', (req, res) =>{
    const {token} = req.body;
    if(!token) {
        return res.status(400).json({error: 'Missing Token'});
    }

    if(!(token in DIARY)) {
        return res.status(400).json({error: 'Invalid Token'});
    }

    const entry = DIARY[token];
    return res.status(200).json({data : entry});
})


app.post('/private-data', (req, res) =>{
    const {token} = req.body;
    if(!token) {
        return res.status(400).json({error: 'Missing Token'});
    }

    if(!(token in DIARY)) {
        return res.status(400).json({error: 'Invalid Token'});
    }

    const entry = DIARY[token];
    return res.status(200).json({data : 'Access Granted'});
})



app.listen(PORT, () => console.log(`Server Is Ready To Listen On Port ${PORT}`)); 