
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const cors = require('cors');
// const { dblClick } = require('@testing-library/user-event/dist/click');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


//app.use(cors());
app.use(
	cors({
		origin: ['http://localhost:3001'],
		methods: ['GET', 'POST'],
		credentials: true,
	})
);

// create mysql coonection
const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'students'
});
// connect to the database
connection.getConnection(function (error) {
	if (error) throw error
	else console.log('Connected to the student database successfully!')

});
// module.exports = connection;  

app.post('/signup', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        // const sqlSearch = "SELECT * FROM userinfo WHERE user_name = ? OR user_email = ?"
        // const searchQuery = mysql.format(sqlSearch, [user_name, user_email])
        const sqlInsert = "INSERT INTO etc_studs VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert, [username, password])
        // ? will come from client in order

		connection.query(insert_query, (err, result) => {
			connection.release();
			if (err)
				throw (err);
			console.log("-------- new user created --------");
			res.status(201).json({
				msg: "New User Created",
				user: {
					user_id: result.insertId,
					user_name: username
				}
			});
		})
    })
})

app.get('/', (req, res, next) => {
	res.send('hahaha')
})

// set app port
app.listen(3002, () => {
		console.log("running server successfully");
	});
