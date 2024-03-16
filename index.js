const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running localhost:${port}`);
});

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("dua_main.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the dua_main database.");
});

app.get("/categories", (req, res) => {
  db.all("SELECT DISTINCT * FROM category", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get("/subcategories/:category", (req, res) => {
  const category = req.params.category;
  db.all(
    "SELECT DISTINCT * FROM sub_category WHERE cat_id = ?",
    [category],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

// app.get("/duas/:subcategory", (req, res) => {
//   const subcategory = req.params.subcategory;
//   db.all(
//     "SELECT * FROM dua WHERE subcat_id = ?",
//     [subcategory],
//     (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       res.json(rows);
//     }
//   );
// });
app.get("/duasByCategory/:category", (req, res) => {
  const category = req.params.category;
  db.all("SELECT * FROM dua WHERE cat_id = ?", [category], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});
