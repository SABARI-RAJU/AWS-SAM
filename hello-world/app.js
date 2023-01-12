// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
let response;
let re;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    
    try {
        // const ret = await axios(url);
        
        mongoose.set('strictQuery', true)

        var mongoAtlasUri="mongodb+srv://raju:raju@cluster0.d55ipzc.mongodb.net/demo?retryWrites=true&w=majority"

        try {
            // Connect to the MongoDB cluster
            mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected")
            );

        } catch (e) {
            console.log("could not connect");
        }
        
        // // Database connection
        // // mongoose.connect('', {
        // //     useNewUrlParser: true,
        // //     useUnifiedTopology: true
        // // },() => console.log(" Mongoose is connected"));
        
        // User model
        var skillSchema = new mongoose.Schema({
            name: String,
            role: String,
        });

        var User = mongoose.model('Employee', skillSchema,'Employee');
        
        // // Only one parameter [query/condition]
        // // Find all documents that matches the
        // // condition name='Punit'

        // // User.find({}, function (err, docs) {
        // //     if (err){
        // //         console.log(err);
        // //     }
        // //     else{
        // //         console.log("First function call : ", docs);
        // //     }
        // // });

        var users=await  User.find({});

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message:users
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};


exports.lambdaPostHandler = async (event, context) => {
    
    try {
        // const ret = await axios(url);

        mongoose.set('strictQuery', true)

        var mongoAtlasUri="mongodb+srv://raju:raju@cluster0.d55ipzc.mongodb.net/demo?retryWrites=true&w=majority"

        try {
            // Connect to the MongoDB cluster
            mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected")
            );

        } catch (e) {
            console.log("could not connect");
        }
        
        // // Database connection
        // // mongoose.connect('', {
        // //     useNewUrlParser: true,
        // //     useUnifiedTopology: true
        // // },() => console.log(" Mongoose is connected"));
        
        // User model
        var skillSchema = new mongoose.Schema({
            name: String,
            role: String,
        });

        var User = mongoose.model('Employee', skillSchema,'Employee');

        var value=JSON.parse(event.body)
    
        var new_employee = new User({
            name: value.name,
            role: value.role
        })

        await new_employee.save();
          
        // new_employee.save(function(err,result){
        //     if (err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log(result)

        //     }
        // })

        
            
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message:"data inserted"
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

