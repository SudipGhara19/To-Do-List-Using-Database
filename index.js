const express = require('express');
const path = require('path');
const app = express();
const port = 8039;

const db = require('./config/mongoose');
const TodoList = require('./models/todo_list');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./assets'));
app.use(express.urlencoded());


//to show the todo list
app.get('/',function(req, res){
    TodoList.find({}, function(err, task){
        if(err){
            console.log('error in fetching todo item from DB');
            return;
        }

        return res.render('home', {
            title: 'Todo List',
            task_list: task

        })
    })
});

//create Todo Task
app.post('/create-task', function(req,res){
    TodoList.create({
        task: req.body.task,
        category: req.body.category,
        date: req.body.date
    }, function(err,newTask){
        if(err){
            console.log('Error in creating new contact');
            return;
        }

        console.log('*******', newTask);
        return res.redirect('back');
    });
});

//delete task from db
app.get('/delete-task', function(req,res){
    let id = req.query.id;
    TodoList.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error deleting task from db')
            return;
        }

        return res.redirect('back');
    });
});


app.listen(port, function(err){
    if(err){
        console.log(`Error in running sever on: ${err}`);
    }

    console.log(`Server is Running on: ${port}`)
});