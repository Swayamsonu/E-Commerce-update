const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path=require('path');
// Method to connect multiple Node.Js files
// const connection=require('./database')
const http=require('http')


const app = express();
const port = 4200;

//Bodyparser Usage
app.use(express.static(path.join(__dirname,'/css')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//FROM USER INPUT TO THE WEB PAGE 


const server=http.createServer((req,res)=>{
  if(req.url=='/')
  {
    return homePage(req,res)
  }

  if(req.url=='/username' && req.method.toLowerCase()=='post')
  {
    return submitUser(req,res)
  }

})

// function submitUser(req,res){
//   res.setHeader('Content-Type','text/html')
//   res.statusCode=302
//   res.setHeader('Location','/')
//   return res.end()
// }

function homePage(req,res) {
  res.setHeader('Content-Type','text/html')
  return res.end(`
    <!doctype html>
    <html>
    <head>
    <title>Connection </title>
    </head>
    <body>
    <form action='/username' method='post'>
    <div>
    <label>Enter the Username</label>
    <input type='text' name='username' />
    </div>
    <div>
    <input type='submit' value='Submit' />
    </div>
    </body>
    </html>
    `

  )
  
}

function submitUser(req,res){
  res.setHeader('Content-Type','text/html')
  const body=[]
  req.on('data',function(data){
    body.push(data)
  })

  req.on('end',()=>{
    console.log(body)
    const requestBody=Buffer.concat(body).toString();
    const userName=request.split('=')[1]
    console.log(requestBody)

  })

  res.statusCode=302;
  res.setHeader('Location','/')
  return res.end()
}



// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'e-commerce',
});


// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database');
  }
});


connection.query(`Select * from user_inputs`,(error,result,fields)=>{
  console.log(error)
  console.log(result)
  console.log(fields)
  getHomePage(result)
});

function getHomePage(req , res){
  fetchAllProducts().then(([user_inputs])=>{
    const viewData={
      products: getAllProducts(),
      pageTitle: 'Home Page - Products List'
    };
    res.render('vendor',viewData)
  }).catch((error)=>{
    console.log(error)
  });
}


getAddProduct=(res,req)=>{
  console.log(req.body)
  const viewData={
    pageTitle:' Add Product'
  };
  res.render('AddProduct',viewData)
}



// saveProduct(user_inputs)
// res.redirect('/')

function fetchAllProducts(callBack){
  const viewsData={
    admin:false,
    user_inputs,
    pageTitle:"Home Page-Product List"
  };
  const productpath=path.join('../views/utils','data','products.json')
  fs.readFile(productpath,(error,productsData)=>{
const products = JSON.parse(productsData);

callBack(products)
  })
  // return connection.query(`Select * from user_inputs`)
  
  
}

// function saveProduct(product){
//   const productpath=path.join('../views/utils','data','products.json')

//   fs.readFile(productpath,(error,productsData)=>{
//     let products=[]
//     if(!error){
//       products = JSON.parse(productsData);
//   }
//   products.push(product);
//   fs.writeFile(productpath,JSON.stringify(products),(error)=>{
//     console.log(error)
//   })
// })

// }





// // API endpoint for storing user input in the database
// app.post('/', (req, res) => {

//   // Retrieve user input data from the request
//   const {Name,Dress,Dress_code,Gender,Price} = req.body;


//   // Store the data in the database
//   const query = 'INSERT INTO user_inputs (Name,Dress,Dress_code,Gender,Price) VALUES (?,?,?,?,?)';
//   connection.query(query, [Name,Dress,Dress_code,Gender,Price], (err, result) => {
//     if (err) {
//       console.error('Error storing user input:', err);
//       res.status(500).json({ message: 'Error storing user input' });
//     } else {
//       console.log('User input stored successfully');
//       // res.json({ message: 'User input stored successfully' });
//       // res.sendFile(__dirname+'/public/vendor.html')
//       // res.render('vendor1.ejs',{data: result })

//       console.log("The result is ",result)
//     }
//   });
// });

// // API endpoint for retrieving and displaying user inputs
// app.get("/",(req,res)=>{
// //   var static_path=path.join(__dirname,"public");
// // res.sendFile(__dirname+'/public/vendor.html')
// res.render('response.html')
// })

// app.get('/vendor.css', (req, res) => {
//   res.sendFile("vendor.css");
// });

// app.get('/', (req, res) => {
//   // Retrieve data from the database
//   const query = 'SELECT * FROM user_inputs';
//   connection.query(query, (err, rows) => {
//     if (err) {
//       console.error('Error retrieving user inputs:', err);
//       res.status(500).json({ message: 'Error retrieving user inputs' });
//     } else {
//       // res.json(rows);
//       console.log("the value of row ",rows)
//       res.sendFile('super-admin.html', { data: rows }); // Render the 'vendor' view and pass the data to it
//       // res.render('vendor.ejs',{data: rows })


//       // res.sendFile(__dirname+'/public/vendor.html')
//     }
//   });
// });

// const pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
// connectionLimit:10
// });
// pool.query('select * from user_inputs',(err,res)=>{
//   return console.log("The values are ",res)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
