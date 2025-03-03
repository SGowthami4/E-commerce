const app=require('./app.cjs')

const dotenv=require('dotenv');

dotenv.config();

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`)
})