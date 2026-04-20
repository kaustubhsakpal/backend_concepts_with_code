import mongooose from 'mongoose';

export async function dbconnection (){
   await mongooose.connect(process.env.MONGOOSE_URI)
    .then(()=>{
        console.log("dbcoonection done ");
        
    })

}