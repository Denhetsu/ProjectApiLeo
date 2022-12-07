const mongoose = require('mongoose');
const { connect, set } = mongoose;

mongoose.connection.on('connected', () =>{
    console.log('Connection mongodb Established');
});

mongoose.connection.on('reconnected', () =>{
    console.log('Connection reestablished');
});

mongoose.connection.on('disconnected', () =>{
    console.log('Connection reestablished');
});

mongoose.connection.on('closed', () =>{
    console.log('Connection closed');
});

set('debug', true);
connect(
    'mongodb+srv://Denhetsu:Slipknot93270@cluster0.r4iaici.mongodb.net/?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true}
);

