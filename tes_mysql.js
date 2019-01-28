const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sekolahku'
})
db.connect(()=>{
    console.log('Terhubung ke MySQL!')
    // db.end()
    var sql = 'select * from users'
    db.query(sql, (err, result)=>{
        if(err)throw err
        console.log(result)
    })
})
db.connect(()=>{
    console.log('Terhubung ke MySQL!')
    // db.end()
    var sql = 'select * from courses'
    db.query(sql, (err, result)=>{
        if(err)throw err
        console.log(result)
    })
})
db.connect(()=>{
    console.log('Terhubung ke MySQL!')
    // db.end()
    var sql = 'select * from userCourses'
    db.query(sql, (err, result)=>{
        if(err)throw err
        console.log(result)
    })
})
// ambil all data
var perintah = 'select * from users'
db.query(perintah, (error, hasil)=>{
    if(error) throw error;
    console.log(hasil)
})

var perintah = 'select * from courses'
db.query(perintah, (error, hasil)=>{
    if(error) throw error;
    console.log(hasil)
})

var perintah = 'select * from userCourse'
db.query(perintah, (error, hasil)=>{
    if(error) throw error;
    console.log(hasil)
})