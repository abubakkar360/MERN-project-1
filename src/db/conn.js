const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/farmerApi',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log('mongoose connection successful....');
})
.catch((error)=>{
    console.log(error);
});
