var mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "n.s31Se.v0u.1embr4r",
    database: "mysql"
});

function createTable(){
    const sql = "CREATE TABLE IF NOT EXISTS comentariosDB (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255), comentario VARCHAR(255), horario DATETIME NOT NULL DEFAULT NOW())";

    connection.query(sql, function (error, results){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}
exports.adicionar_comentario = function(nome, comentario, callback){
    const sql = "INSERT INTO comentariosDB(nome, comentario) VALUES ?"
    var dados = [[nome, comentario]];
    connection.query(sql, [dados], function(error, result){
        if (error){ return console.log(error);}
        connection.query("SELECT * FROM comentariosDB WHERE id="+result.insertId, function (err, resultado){
            if (err) throw err;
            callback(resultado[0]);
        });
    });
}

exports.carregarComentarios = function(callback){
    connection.query("SELECT * FROM comentariosDB", function (err, result, fields) {
        if (err) throw err;
        callback(result);
      });
}

exports.conectar = function(){

    connection.connect(function(err){
        if(err) return console.log(err);
        console.log('Conectado');
    })
    /*
    var sql = "DROP TABLE comentariosDB";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
    */
    createTable();

}