import mongoose from 'mongoose'
import config from 'config'


export const startDB = async () => {
     try {
          await mongoose.connect(config.get('mongoURI'), {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true
          })
          console.log("запуск ракеты")
     }
     catch (error) {
          console.log(error.message);
         process.exit(1);
     }
} 
