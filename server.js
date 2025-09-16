const app = require('./app')
const PORT = process.env.PORT || 5000;
const connectMongoDB = require('./src/config/db/mongoDB')

connectMongoDB()
    .then(()=>{
        app.listen(PORT, () => {
            console.log('Server running on port: '+ PORT)
        })
    })
    .catch((err)=>{
        console.error('Database connection failed', err);
        process.exit(1)
    })