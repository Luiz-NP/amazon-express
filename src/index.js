const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const db = require("./db/pool");
require("./db/connect");

/* ==================== GET ROUTES ==================== */

app.get("/getUserCustomers/:architectId", (req, res) => {
    const architectId = req.params.architectId;
    console.log(architectId);

    try {
        db.query("SELECT * FROM tb_customer WHERE architect_id = ($1)", [architectId] , (err, data) => {
            if (err) return res.json({"error": err});

            return res.json(data.rows);
        });
    } catch (error) {
        res.json({"error": error});
    }

});

app.get("/getConstructions/:customerId", (req, res) => {
    const customerId = req.params.customerId;

    db.query(`SELECT * FROM tb_construction WHERE customer_id = ${customerId}`, (err, data) => {
        if (err) return res.json({"error": err});

         return res.json(data.rows);
    })
})

/* ==================== POST ROUTES ==================== */

app.post("/createNewCustomer", (req, res) => {
    const architectId = req.body.architectId;
    const customerName = req.body.customerName;

    db.query("INSERT INTO tb_customer (architect_id, customer_name) VALUES ($1, $2)", [architectId, customerName], (err) => {
        if (err) return res.json({"error": err});

        return res.json({"message": "success"});
    });
});

app.post("/createNewConstruction", (req, res) => {
    const customerId = req.body.customerId;
    const constructionName = req.body.constructionName;

    try {
        db.query("INSERT INTO tb_construction (customer_id, construction_name) VALUES ($1, $2)", [customerId, constructionName], (err, data) => {
            if (err) return res.json({"error": err});

            return res.json({"message": "success"});
        });
    } catch (error) {
        res.json({"error": error});
    }
});

/* ==================== PATCH ROUTES ==================== */

app.patch("/editCustomer", (req, res) => {
    const customerId = req.body.customerId;
    const customerName = req.body.customerName;

    try {
        db.query(`UPDATE tb_customer SET customer_name = ($1) WHERE id = ${customerId}`, [customerName], (err) => {
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
        db.query(`UPDATE tb_construction SET construction_name = ($1) WHERE id = ${constructionId}`, [constructionName], (err) => {
            if (err) return res.json({"error": err});

            res.json({"message": "success"});
        });
    } catch (error) {
        res.json({"error": error});
    }
});

/* ==================== DELETE ROUTES ==================== */

app.delete("/deleteCustomer", (req, res) => {
    const customerId = req.body.customerId;

    try {
        db.query(`DELETE FROM tb_customer WHERE id = ${customerId}`, (err) => {
            if (err) return res.json({"error": err});

            db.query(`DELETE FROM tb_construction WHERE customer_id = ${customerId}`, (err) => {
                if (err) return res.json({"error": err});

                res.json({"message": "success"});
            })
        });
    } catch (error) {
        res.json({"error": error});
    }
});

app.delete("/deleteConstruction", (req, res) => {
    const constructionId = req.body.constructionId;

    try {
    db.query(`DELETE FROM tb_construction WHERE id = ${constructionId}`, (err) => {
        if (err) throw new Error(err);

        res.json({"message": "success"});
    })
    } catch (error) {
        res.json({"error": error});
    }
});

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
