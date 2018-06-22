const mongoose = require('mongoose');
Schema = mongoose.Schema;

const todoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    done: Boolean,
    id: Number
});

const ToDo = mongoose.model('ToDo', todoSchema);


module.exports = ToDo;