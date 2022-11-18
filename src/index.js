const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const db = require("./db/pool");
require("./db/connect");

/* ==================== GET ROUTES ==================== */

app.get("/getUserClients", (req, res) => {
    const architectId = req.body.architectId;

    try {
        db.query(`SELECT * FROM tb_client WHERE architect_id = ${architectId}` , (err, data) => {
            if (err) throw new Error(err);

            res.json(data.rows);
        });
    } catch (error) {
        res.json({"error": error});
    }

});

app.get("/getConstructions", (req, res) => {
    const clientId = req.body.clientId;

    try {
        db.query(`SELECT * FROM tb_jobsite WHERE client_id = ${clientId}`, (err, data) => {
            if (err) throw new Error(err);

            res.json(data.rows);
        })
    } catch (error) {
        res.json({"error": error});
    }
})

/* ==================== POST ROUTES ==================== */

app.post("/createNewClient", (req, res) => {
    const architectId = req.body.architectId;
    const clientName = req.body.clientName;

    try {
        db.query("INSERT INTO tb_client (architect_id, client_name) VALUES ($1, $2)", [architectId, clientName], (err) => {
            if (err) throw new Error(err);

            res.json({"message": "success"});
        });
    } catch (error) {
        res.json({"error": error});
    }
});

app.post("/createNewConstruction", (req, res) => {
    const clientId = req.body.clientId;
    const constructionName = req.body.constructionName;

    try {
        db.query("INSERT INTO tb_jobsite (client_id, jobsite_name) VALUES ($1, $2)", [clientId, constructionName], (err, data) => {
            if (err) throw new Error(err);

            res.json(data);
        });
    } catch (error) {
        res.json({"error": error});
    }
});

/* ==================== PATCH ROUTES ==================== */

app.patch("/editCustomer", (req, res) => {
    const clientId = req.body.clientId;
    const clientName = req.body.clientName;

    try {
        db.query(`UPDATE tb_client SET client_name = ($1) WHERE id = ${clientId}`, [clientName], (err) => {
            if (err) throw new Error(err);

            res.json({"message": "success"});
        });

    } catch (error) {
        res.json({"error": error});
    }
});

app.patch("/editConstruction", (req, res) => {
    const constructionId = req.body.constructionId;
    const constructionName = req.body.constructionName;

    try {
        db.query(`UPDATE tb_jobsite SET jobsite_name = ($1) WHERE id = ${constructionId}`, [constructionName], (err) => {
            if (err) throw new Error(err);

            res.json({"message": "success"});
        });
    } catch (error) {
        res.json({"error": error});
    }
});

/* ==================== DELETE ROUTES ==================== */

app.delete("/deleteCustomer", (req, res) => {
    const clientId = req.body.clientId;

    try {
        db.query(`DELETE FROM tb_client WHERE id = ${clientId}`, (err) => {
            if (err) throw new Error(err);

            res.json({"message": "success"});
        });
    } catch (error) {
        res.json({"error": error});
    }
});

app.delete("/deleteConstruction", (req, res) => {
    const constructionId = req.body.constructionId;

    try {
    db.query(`DELETE FROM tb_jobsite WHERE id = ${constructionId}`, (err) => {
        if (err) throw new Error(err);

        res.json({"message": "success"});
    })
    } catch (error) {
        res.json({"error": error});
    }
});

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));