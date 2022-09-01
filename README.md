# Login - Register - Logout process with Nodejs
This app is about system where academic status can be followed.
There are register, login and logout processes with nodejs in this app.

<h2>Install</h2>
<hr>
<br>
<code>
    npm install
    <pp> node login.js</p>
</code>
And open the http://localhost:3000/
<br>
<hr>

## Coding

### Frontend

After making the downloads, let's handle the frontend parts of the application. Firstly We need three page for this app. 
<br><strong><i>Login page:</i></strong> Users will see this page first. They will be able to login or go to the register page.

![image](https://user-images.githubusercontent.com/68349891/151665671-dd9b6866-5a6e-4611-bbf0-88cccaf9c649.png)

<br><strong><i>Register page:</i></strong> Users can register here.
![image](https://user-images.githubusercontent.com/68349891/151665660-965be0af-60a5-401c-8aec-9ab6cb1ca339.png)
<br><strong><i>Home page:</i></strong> Registered users are redirected here after login.

![image](https://user-images.githubusercontent.com/68349891/151665647-a07b6ce1-1e8d-48fd-9d27-85dcb6e2bcb7.png)

### Database
Mysql was used as database in this project. Database name is nodeapp. A table named "user" has been created.

<code>
    CREATE TABLE user ( <br>
    id(11) AUTO_INCREMENT PRIMARY_KEY, <br>
    name varchar(255), <br>
    surname varchar(255), <br>
    email varchar(255), <br>
    password varchar(255)<br>
);
</code>


### Backend
A js file will be created an named login.js The name is not important, and other name can also be used.


<strong><i>Login.js:<i><strong><br>

Firstly requirements are defined. <br/>
<code>
    var mysql = require('mysql');<br/>
    var express = require('express');<br/>
    var bodyParser = require('body-parser');<br/>
    var path = require('path');<br/>
    const { response } = require('express');<br/>
</code>

Database connection established
<code>
    var connection = mysql.createConnection({ <br>
	host     : 'localhost',  <br>
	user     : 'root',  <br>
	password : '',  <br>
	database : 'nodeapp'  <br>
});
</code>

