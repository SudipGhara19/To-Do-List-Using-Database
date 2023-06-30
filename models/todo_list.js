const mongoose = require('mongoose');
const { stringify } = require('querystring');

const todoListSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true
    }
});

const TodoList = mongoose.model('TodoList', todoListSchema);

module.exports = TodoList;