const mongoose= require('mongoose');
const validator = require('mongoose-validator');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const farmerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        // validate(value){
        //     if(validator.isEmail(value)){
        //         throw new Error('mongoose validation error');
        //     }
        // },
        unique:true,
        required:true

    },
    phone:{
        type:String,
        min:10,
        max:10,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
farmerSchema.methods.generateAuthToken = async function(){
    try{ 
        const token = jwt.sign({_id:this._id.toString()},'mynameismohammadabubakkarseddekmerndeveloper')
        this.tokens = this.tokens.concat({token:token})
        // this.tokens = this.tokens.concat({token});
        
        await this.save();
        return token;
    }catch(error){
        console.log(error)
    }
}
farmerSchema.pre('save',async function(next){
    // console.log(this.password);
   
    if(this.isModified('password')){
        
        const passwordHash = await bCrypt.hash(this.password,10);
        this.password=passwordHash;
        console.log(passwordHash);
        next();
        // this.confirmPassword= undefined;
    }
   
    });
    
   



const Farmer = new mongoose.model('Farmer',farmerSchema);
module.exports = Farmer;
