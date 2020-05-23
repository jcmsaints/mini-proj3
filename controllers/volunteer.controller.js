const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require("../config/connectMySQL");

function read(req, res) {
  connect.con.query("SELECT id, nome, email FROM volunteer ", function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
    } else {
      if (rows.length == 0) {
        res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      } else {
        res.send(rows);
      }
    }
  });
}

function readID(req, res) {
  const idvolunteer = req.sanitize("id").escape();
  const post = { idSponsor: idvolunteer };
  connect.con.query(
    "SELECT id, nome, email FROM volunteer where id = ?",
    post,
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      } else {
        if (rows.length == 0) {
          res
            .status(jsonMessages.db.noRecords.status)
            .send(jsonMessages.db.noRecords);
        } else {
          res.send(rows);
        }
      }
    }
  );
}

function save(req, res) {
  const nome = req.sanitize("nome").escape();
  const email = req.sanitize("email").escape();
  req.checkBody("nome", "Insira apenas texto").matches(/^[a-z ]+$/i);
  req.checkBody("email", "Insira um email válido.").isEmail();

  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (nome != "NULL" && email != "NULL") {
      const post = {
        nome: nome,
        email: email,
      };
      //criar e executar a query de gravação na BD para inserir os dados presentes no post
      const query = connect.con.query(
        "INSERT INTO volunteer SET ?",
        post,
        function (err, rows, fields) {
          console.log(query.sql);
          if (!err) {
            res
              .status(jsonMessages.db.successInsert.status)
              .location(rows.insertId)
              .send(jsonMessages.db.successInsert);
          } else {
            console.log(err);
            res
              .status(jsonMessages.db.dbError.status)
              .send(jsonMessages.db.dbError);
          }
        }
      );
    } else
      res
        .status(jsonMessages.db.requiredData.status)
        .end(jsonMessages.db.requiredData);
  }
}

function update(req, res) {
  const idvolunteer = req.sanitize("id").escape();
  const nome = req.sanitize("nome").escape();
  const email = req.sanitize("email").escape();
  req.checkBody("nome", "Insira apenas texto").matches(/^[a-z ]+$/i);
  req.checkBody("email", "Insira um email válido.").isEmail();
  req.checkParams("id", "Insira um ID de volunteer válido").isNumeric();
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (
      idvolunteer != "NULL" &&
      typeof nome != "undefined" &&
      typeof email != "undefined" &&
      typeof idvolunteer != "undefined"
    ) {
      const update = [nome, email, idvolunteer];
      const query = connect.con.query(
        "UPDATE volunteer SET nome =?, email =? WHERE id=?",
        update,
        function (err, rows, fields) {
          console.log(query.sql);
          if (!err) {
            res
              .status(jsonMessages.db.successUpdate.status)
              .send(jsonMessages.db.successUpdate);
          } else {
            console.log(err);
            res
              .status(jsonMessages.db.dbError.status)
              .send(jsonMessages.db.dbError);
          }
        }
      );
    } else
      res
        .status(jsonMessages.db.requiredData.status)
        .send(jsonMessages.db.requiredData);
  }
}

function deleteL(req, res) {
  const update = [0, req.sanitize("id").escape()];
  const query = connect.con.query(
    "UPDATE volunteer SET active = ? WHERE id=?",
    update,
    function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
        res
          .status(jsonMessages.db.successDelete.status)
          .send(jsonMessages.db.successDelete);
      } else {
        console.log(err);

        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      }
    }
  );
}

function deleteF(req, res) {
  const update = req.sanitize("id").escape();
  const query = connect.con.query(
    "DELETE FROM volunteer WHERE id=?",
    update,
    function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
        res
          .status(jsonMessages.db.successDeleteU.status)
          .send(jsonMessages.db.successDeleteU);
      } else {
        console.log(err);
        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      }
    }
  );
}

module.exports = {
  read: read,
  readID: readID,
  save: save,
  update: update,
  deleteL: deleteL,
  deleteF: deleteF,
};
