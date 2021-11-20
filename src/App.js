const express = require('express');
const path = require('path');
const Farmer = require('./model/Farmer.js');
const app = express();
const bcrypt = require('bcrypt');
const hbs = require('hbs');
require('./model/Farmer.js');
require('./db/conn.js');

const partialsPath = path.join(__dirname,'../template/partials')

const port = process.env.PORT || 5000;
const staticPath = path.join(__dirname,'../public');

const templatePath = path.join(__dirname,'../template/views');
app.set('views',templatePath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/home',(req,res)=>{ 
    res.render('home');
});
app.get('/signUp',(req,res)=>{
    res.render('signUp');
});
app.get('/contact',(req,res)=>{
    res.status(201).render('contact');
});
app.get('/logIn',(req,res)=>{
    res.status(200).render('logIn');
});
app.get('/about',(req,res)=>{
    res.status(200).render('about');
});
app.get('/content',(req,res)=>{
    res.render('content');
});

app.post('/signUp',async(req,res)=>{
    try{
        const password = req.body.password;
        const cPassword = req.body.confirmPassword;
        if(password === cPassword){
            const registerFarmer = new Farmer({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            phone:req.body.phone,
            password:password,
            confirmPassword:cPassword
           })
        

          
            
        //    console.log('the success part is:'+ registerFarmer)
         
         const token = await registerFarmer.generateAuthToken();
           console.log('the token part is '+ token)


        
         const registered = await registerFarmer.save();
         res.status(201).render('home');
        }else{
            res.send('password not matched');
        }
    }catch(err){
        res.send(err);
        console.log(err);
    }
})

app.post('/logIn',async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Farmer.findOne({email:email});
        // res.send(userEmail);
        // console.log(userEmail);

        // const isMatch = await bcrypt.compare(password,userEmail.password);
        if(userEmail.password === password){
            res.status(201).render('home');
        }else{
            res.status(400).send('invalid password details');
        }
    }catch(error){
        console.log(error);
     }
})
app.listen(port,()=>{
    console.log('server creation successful')
});
