const router = require("express").Router();
const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if(user)
            return res.status(400).send({ message: "User with given email already exists" })
        
        const salt = bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User ({ ...req.body, password:hashPassword }).save();
        res.status(201).send({ message: "User Created and Saved Successfully" })

        
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

module.exports = router;