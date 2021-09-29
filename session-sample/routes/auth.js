const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const session = require("express-session");

router.get("/login", (req,res,next)=>{
    if(req.session.user === undefined){
        fs.readFile('./public/login.html',(err,data)=>{
            res.end(data);
        });
    }else{
        res.send(req.session.user.id);
    }

});
router.get("/register", (req,res,next)=>{
    fs.readFile('./public/register.html',(err,data)=>{
        res.end(data);
    });
});

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        id :  req.body.id,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ id: req.body.id });
        if (user === null) {
            res
                .status(401)
                .json("There is no user whose name is " + req.body.username);
        }

        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originPass = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(originPass);
        console.log(req.body.password);


        if (originPass !== req.body.password) {
            res.status(401).json("Wrong Credentials");
        } else {
            //세션 을 활용해서 로그인 처리하기
            req.session.user = user;
            req.session.save(err=>{
                if(err){
                    console.log(err);
                    return res.status(500).send("error");
                }
            })
            res.send("login completed");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
