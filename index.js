var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
var Sequelize = require('sequelize');
var db = require('./db/db');

var app = express();

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

var sequelize = new Sequelize(db);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


var pageTitle = 'Inku.js - a static API generator for Your SPA websites';

app.get('/', function(req, res){
  var scope = {
    data: {
      title: pageTitle,
      labels: {
        newFile: 'New file',
        openFile: 'Open file',
        saveFile: 'Save file',
        compileAll: 'Compile all',
        preview: 'Preview',
        removeFile: 'Remove file',
        help: 'Help',
        notes: 'Notes',
        trash: 'Trash'
      }
    },
    vue: {
      head: {
        title: 'Another title'
      },
      components: ['Sidebar']
    }
  };

  res.render('index', scope);
});

app.listen(3000);
console.log('Express server listening on port 3000!');
