import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postRoutes);

const uri = "mongodb+srv://mem-user:test123@urlshortener.6jhak.mongodb.net/post-memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
          .then(() => {
            app.listen(PORT, () => {
              console.log(`Server is running on ${PORT}`);
            })
          })
          .catch((err) => {
            console.log('error occurred while database connection establishment', err.message);
          });

mongoose.set('useFindAndModify', false);          

