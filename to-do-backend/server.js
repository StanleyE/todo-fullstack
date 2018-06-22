const express = require('express'),
      app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/ToDoList');

const db = mongoose.connection;
db.on('open', ()=>{
    console.log('The mongoose is loose');
});

const ToDo = require('./models/ToDo');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res)=>{
    ToDo.find({})
        .then(results => {
            if(!results){
               console.log('no matches found');
            //result will be null if nothing found
            } else {
            //console.log(results);
               res.json(results);
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(400).json({error})
        })
});

app.post('/', (req, res)=>{
    let newItem = ToDo({
    title: req.body.title,
    done: req.body.done,
    id: req.body.id
    });
//Save
    newItem.save()
        .then(saved =>{
            console.log('New todo item added');
        })
        .catch(error =>{
            console.log(error)
        });
});

app.delete('/todo/:id', (req, res)=>{
    ToDo.findByIdAndRemove({id:req.params.id})
        .then(result =>{
            res.send(result);
        })
        .catch(error=>{
            res.send('deleted todo route');
        })
        res.redirect('/');
});

app.put('/todo/:id', (req, res)=>{
    ToDo.findByIdAndUpdate({id:req.params.id}, req.body)
    // ToDo.findOne({id:req.params.id})    
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            console.log(error);
        })
        res.redirect('/');
});

app.listen(8080, ()=>{
    console.log('Linked on server 8080');
})