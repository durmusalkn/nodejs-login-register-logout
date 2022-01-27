'use strict';
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { response } = require('express');

//Veritabanı bağlantısı
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodeapp'
});

var app = express();
var session = require('express-session');
const req = require('express/lib/request');

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//sayfanın ilk açıldığında buradaki işlemler gerçekleşir.
app.get('/', function(request, response) {
	
	//Eğer sessionda username var ise home sayfasına yönlendirilmesi yapılır,
	//Session yoksa login sayfasına yönlendirilir.
	if (request.session.username)
	{
		return response.sendFile(path.join(__dirname + '/views/home.html'));
	}
	
	response.sendFile(path.join(__dirname + '/views/login.html'));


});

//Kullanıcı çıkış yaptığında buradaki fonksiyon çalışmaktadır.
app.get('/logout', function(request, response) {
	
	response.sendFile(path.join(__dirname + '/views/login.html'));
	request.session.destroy();
});

//Kullanıcı giriş işlemi
app.post('/auth', function(request, response) {
	
	//formdan gelen veriler değikenlere atanır.
	var username = request.body.username;
	var password = request.body.password;

	//Eğer veri var ise veritabanından sorgulama yapılır.
	if (username && password) {
		connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log(results)

			//Eğer veri uzunluğu 0 dan büyük ise veri gelmiş demektedir. home sayfasına gönderilir.
			if (results.length > 0) {
				//sessiona veri atama işlemi:
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



const router = require('express').Router()


router.get('/register' , (req , res)=>{
    res.render('register.html');
})


router.get('/another-route' , (req , res)=>{
    // router code here
})

app.use('/', router);
app.engine("html", require('ejs').renderFile);

module.exports  = router


//Kullanıcı kayıt işlemi
app.post('/kayit', function(request, response) {
	
	//form dan gelen değerler değişkenlere atanır.
	var name = request.body.name;
	var surname = request.body.surname;
	var email = request.body.email;
	var password = request.body.password;

	//Eğer verilerin hepsi var ise veritabanı kayıt işlemi gerçekleştirilir.
	if (name && surname && email && password) {
		connection.query('INSERT INTO user (name, surname, email, password) VALUES(?,?,?,?)', [name, surname, email, password], function(error, results, fields) {
            console.log(results)
			
			if (results) {
				response.redirect('/kayit');
			} else {
				response.send('Kayıt Başarısız');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//Login sayfasına yönlendirilmektedir.
app.get('/kayit', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
	
});

//Kullanıcı login olmadan home sayfasına erişemez.
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		// response.send('Welcome back, ' + request.session.username + '!' + "<a href=\'/'>click to logout</a>");
		
		response.render('home.html');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//register sayfasına yönlendirilmektedir
router.get('/register' , (req , res)=>{
    res.render('register.html');
})


router.get('/another-route' , (req , res)=>{
    // router code here
})

app.use('/', router);
app.engine("html", require('ejs').renderFile);

app.listen(3000);