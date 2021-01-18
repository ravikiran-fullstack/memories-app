import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Postcard API');
});

app.use('/posts', postRoutes);

const uri = process.env.MONGODB_URI;
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

