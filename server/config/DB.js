import mysql from 'mysql2'

//connect to db
const pool= mysql.createPool({
    host: '127.0.0.1', //my localhost
    user: 'root',
    password:'zaod123',
    database:'3decommerce'
}).promise()

//fetch from db
async function fetchFromDB(){
    const [result]= await pool.query("SELECT * FROM color")
    return result
}
//delete ALL THE rowS from a db
async function DeleteFromDB(){
    const [result]= await pool.query("DELETE FROM color")
    return result
}

// insert into db
async function insertIntoDB( email, address ){
    const result= await pool.query(`INSERT INTO  orders ( totalprice, shirtinstance_id)
    VALUES ( ?, ?)`, [ email, address])
    return result
}

const tshirt= await insertIntoDB('250.40', '2')
console.log(tshirt)
/* const tshirt= await fetchFromDB()
console.log(tshirt) */