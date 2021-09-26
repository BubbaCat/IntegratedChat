const {Client} = require('pg');
const dotenv = require('dotenv').config();
let connection;

const getPgConnection = ()=>{
	if(!connection)
	{
		connection = new Client({
			host:process.env.DB_HOST,
			port:5432,
			user:process.env.DB_USER,
			password:process.env.DB_PASSWORD,
			database:process.env.DB_DATABASE
		});
		connection.connect();
	}
	return connection;
};

exports.executePgQuery = async(query,params) =>{
	let client = getPgConnection();
	let result = await client.query(query,params);
	return result;
};

exports.getPgConnection = getPgConnection;
