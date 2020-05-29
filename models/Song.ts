import {Schema, model, Document} from 'mongoose';

export interface ISongSchema extends Document {
     name?: string;
     author?: string;
     picture?: string;
     newOne: boolean;
     popular: boolean;
     dateRelease: string;
     date: Date
   }


const SongSchema: Schema = new Schema({
     name: {
          type: String
     },
     author: {
          type: String
     },
     picture: {
          type: String
     },
     newOne: {
          type: String
     },
     popular: {
          type: String
     },
     dateRelease: {
          type: String
     },
     date: {
          type: Date,
          default: Date.now
     }
});


export default  model<ISongSchema>('Song', SongSchema);