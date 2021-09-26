const { executePgQuery } = require("../database/database");
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const config = require('../config/app')

const generateToken = (user) => {

    delete user.password;
	console.log(user);
    const token = jwt.sign(user, config.appKey, { expiresIn: 129800 })

    return { ...{ user }, ...{ token } }
}

exports.login = async (req,res)=>{
	
	try{
		const {email,password} = req.body;

		let {rows} = await executePgQuery(`SELECT * from "Users" where "email"='${email}' LIMIT 1`);

		if(rows.length===0)
			return res.status(404).json({message:"Пользователь не найден"});

		const user = rows[0];

		//if(!bcrypt.compareSync(password,rows[0].password))
		// 	return res.status(401).json({message:"Неверный пароль"});
		
		const userWithToken = generateToken(user);
		res.json(userWithToken);
	}
	catch(e){
		throw e;
	}
}

exports.register = async (req,res)=>{
	
	let {firstName,lastName,email,password} = req.body;
	try{
		
		await executePgQuery(`INSERT INTO "Users"("firstName","lastName","email","password","role") VALUES('${firstName}','${lastName}','${email}','${password}',2)`)
		
		const {rows} = await executePgQuery(`SELECT * from "Users" where "email"='${req.body.email}' LIMIT 1`);
	
		const userWithToken = generateToken(rows[0]);
		res.json(userWithToken);
	}
	catch(e){
		throw(e);
	}
};

