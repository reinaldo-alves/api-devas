import mysql from 'mysql'

const pool = mysql.createPool({
    "user":"ba88b52f7a093b",
    "password":"788571ae",
    "database":"heroku_a9498be90f83399",
    "host":"us-cdbr-east-06.cleardb.net",
    "port":3306
})

export { pool };