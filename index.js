const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testnode'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("You are now connected mysql database.....");
});

app.get('/customers',(req,res)=>{
    connection.query('SELECT * FROM customer',(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.get('/customers/:id',(req,res)=>{
    connection.query('SELECT * FROM customer WHERE id=?',[req.params.id],(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});


app.post('/customers',(req,res)=>{
    let params = req.body;
    // console.log(params);
    connection.query('INSERT INTO customer SET ?',params,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.delete('/customers',(req,res)=>{
    connection.query('DELETE FROM customer WHERE id =  ?',[req.body.id],(err,results,fields)=>{
        if(err) throw err;
        res.end('record has been deleted');
    });
})

app.put('/customers',(req,res)=>{
    connection.query('UPDATE customer SET Name=? , Address=? ,Country=? , Phone=? WHERE Id=?',[req.body.Name, req.body.Address, req.body.Country, req.body.Phone, req.body.Id],(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.listen(3000, ()=>{
    console.log("listen on port 3000....");
});