import mysql from 'mysql'

const pool = mysql.createPool({
    "user":"root",
    "password":"316599database",
    "database":"api-devas",
    "host":"localhost",
    "port":3306
})

export { pool };