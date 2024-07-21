import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql';

dotenv.config();

const app= express();
app.use(cors());
app.use(express.json())


//connect to db
const db= mysql.createConnection({
    host:'localhost',
    database:'dbmsmp',
    user:'root',
    password:'zaod123'
});

db.connect((err)=>{
    if(err){
        console.error('Database connection error', err);
    } else{
        console.log('Connected to the database')
    }
})

//Define your API endpoints
/* // New endpoint to handle order placement
app.post('/placeOrder', async (req, res) => {
    try {
      const { fullName, address, email } = req.body;
  
      // Step 1: Insert user details into Users table
      const userInsertResult = await insertUser(fullName, address, email);
  
      // Step 2: Insert color details into Color table
      const colorInsertResult = await insertColor();
  
      // Step 3: Insert logo details into Logo table
      const logoInsertResult = await insertLogo(userInsertResult.insertId);
  
      // Step 4: Insert shirt instance details into Shirtinstance table
      const shirtInstanceInsertResult = await insertShirtInstance(
        colorInsertResult.insertId,
        logoInsertResult.insertId
      );
  
      // Step 5: Insert order details into Order table
      const orderInsertResult = await insertOrder(
        userInsertResult.insertId,
        shirtInstanceInsertResult.insertId
      );
  
      res.status(200).json({ message: "Order placed successfully", orderId: orderInsertResult.insertId });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Helper functions to insert data into respective tables
  async function insertUser(fullName, address, email) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Users (user_id, username, address, emailid) VALUES (?, ?, ?)';
      db.query(query, [userId, fullName, address, email], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  async function insertColor() {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Color (color_id, color_code, price) VALUES (?, ?)';
      db.query(query, [colorId, 'default_color_code', 0.40], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  async function insertLogo(userId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Logo (logo_id, name, price, userid) VALUES (?, ?, ?)';
      db.query(query, [logoId,'default_logo_name', 10, userId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  async function insertShirtInstance(colorId, logoId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Shirtinstance (shirtInstance_id, colorid, logoid, tshirtid) VALUES (?, ?, 1)';
      db.query(query, [shirtInstanceId, colorId, logoId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  async function insertOrder(userId, shirtInstanceId) {
    return new Promise((resolve, reject) => {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = 'INSERT INTO Order (userid, shirtinstanceid, totalprice, orderdate) VALUES (?, ?, 10.40, ?)';
      db.query(query, [userId, shirtInstanceId, currentDate], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  } */

  app.post('/placeOrder', async (req, res) => {
    try {
      const { fullName, address, email, colorCode, logoName } = req.body;
  
      // Generate random IDs
      const userId = generateRandomId();
      const colorId = generateRandomId();
      const logoId = generateRandomId();
      const shirtInstanceId = generateRandomId();
      const orderId = generateRandomId();
  
      // Insert user data into Users table
      await db.query(
        'INSERT INTO Users (user_id, username, address, email) VALUES (?, ?, ?, ?)',
        [userId, fullName, address, email]
      );
  
      // Insert color data into Color table
      await db.query(
        'INSERT INTO Color (color_id, color_code, price) VALUES (?, ?, ?)',
        [colorId, colorCode, 0.40]
      );
  
      // Insert logo data into Logo table
      await db.query(
        'INSERT INTO Logo (logo_id, name, price, user_id) VALUES (?, ?, ?, ?)',
        [logoId, logoName, 10, userId]
      );
  
      // Insert shirt instance data into ShirtInstance table
      await db.query(
        'INSERT INTO ShirtInstance (shirtinstance_id, color_id, logo_id, tshirt_id) VALUES (?, ?, ?, 1)',
        [shirtInstanceId, colorId, logoId]
      );
  
      // Calculate total price
      const totalPrice = 240+ 10 + 0.40;
  
      // Insert order data into Order table
      await db.query(
        'INSERT INTO Order (order_id, user_id, shirtinstance_id, totalprice, order_date) VALUES (?, ?, ?, ?, NOW())',
        [orderId, userId, shirtInstanceId, totalPrice]
      );
  
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Function to generate a random ID (you can replace this with your own logic)
  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }
  
  

  

app.get('/', (req, res)=>{
    res.status(200).json({message:"Hello from MYSQL WORKBENCH :)"})
})

app.listen(8080, ()=> console.log('Server has started on port 8080'))