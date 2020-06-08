 const express=require("express");
var router=express.Router();
const pool=require("../pool.js");
let fs = require('fs');
const multer = require('multer');
// console.log(__dirname);
// console.log(Date.now());
//上传的文件保存在 upload
const storage = multer.diskStorage({
    //存储的位置
    destination(req, file, cb){
        cb(null, "public/admin/src/assets/imgs")
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb){
        let math=Math.random();
        math=math.toString().replace(".","");//随机字符串
        cb(null, math +"-"+ file.originalname)
    }
});
 //传入storage 除了这个参数我们还可以传入dest等参数
let upload = multer({
    storage
}).array('file'); 
//上传图片总函数
let imgs=(req,res)=>{
    return new Promise((resolve,reject)=>{
        upload(req, res, function (err) {
            if (err) return resolve(0)
            try{
                    //循环处理
                let imgPath=[];
                req.files.forEach(function (i) {
                    //获取临时文件的存储路径
                    imgPath.push(i.filename);
                    // console.log("i.path:",i.path)
                });
                resolve(imgPath)
            }catch(errr){
                return resolve(0)
            }
        });
    });
};



//上传头像
router.post('/img',async(req,res,next)=>{
    let result=await imgs(req,res);
    if(result===0) return res.send({code:500,message:"图片上传失败"});
    res.send({code:1,message:"图片上传成功",data:result})
    // console.log(req.file)
});
//添加学生数据
router.post("/addStudent",(req,res)=>{
    let sql="INSERT INTO student(name,sex,class,img) VALUES (?,?,?,?)",obj=req.body;
    pool.query(sql,[obj.name,obj.sex,obj.class,obj.img],(err,result)=>{
        if(err) return res.send({code:500,message:"添加学生信息错误",err});
        res.send({code:1,message:"添加学生信息成功"});
    });
});
//查询学生数据
router.get("/listStudent",(req,res)=>{
    let sql="SELECT id,name,sex,class,img FROM student";
    pool.query(sql,(err,result)=>{
        if(err) return res.send({code:500,message:"学生列表查询失败",err});
        res.send({code:1,message:"查询学生列表成功",data:result});
    });
});
//修改学生数据
router.post("/changeStudent",(req,res)=>{
    let sql="UPDATE student SET name=?,sex=?,class=? WHERE id=?",obj=req.body;
    pool.query(sql,[obj.name,obj.sex,obj.class,obj.id],(err,result)=>{
        if(err) return res.send({code:500,message:"修改学生信息错误",err});
        res.send({code:1,message:"修改学生信息成功"});
    });
});
//删除学生
router.post("/deleStudent",(req,res)=>{
    let sql="DELETE FROM student WHERE id=?",obj=req.body;
    pool.query(sql,[obj.id],(err,result)=>{
        if(err) return res.send({code:500,message:"修改学生错误",err});
        res.send({code:1,message:"删除成功"});
    });
});

//添加成绩
router.post("/addPer",(req,res)=>{
    let sql="INSERT INTO per(sid,minute,remark,img) VALUES (?,?,?,?)",obj=req.body;
    pool.query(sql,[obj.sid,obj.minute,obj.remark,obj.img],(err,result)=>{
        if(err) res.send({code:500,message:"添加成绩失败",err});
        res.send({code:1,message:"添加成绩成功"});
    });
});

//查询成绩
router.get("/selePer",(req,res)=>{
    let sql="SELECT id,sid,minute,remark,img FROM per WHERE sid=?",obj=req.query;
    pool.query(sql,[obj.id],(err,result)=>{
        if(err) return res.send({code:500,message:"查询成绩失败",err});
        if(result.length===0) return res.send({code:1,message:"成绩列表为空",data:[]});
        result.forEach(t=>t.img=JSON.parse(t.img));
        res.send({code:1,message:"查询成绩成功",data:result});
    });
});

//删除成绩
router.post("/delePer",(req,res)=>{
    let sql="DELETE FROM per WHERE id=?",obj=req.body;
    pool.query(sql,[obj.id],(err,result)=>{
        if(err) res.send({code:500,message:"删除成绩失败",err});
        res.send({code:1,message:"删除成功"});
    });
});



////////////////////////////////////////////////////////////////////////////////////

let check=(obj)=>{
    return new Promise((resolve,reject)=>{
        let sql="SELECT id FROM user WHERE name=?";
        pool.query(sql,[obj.name],(err,res)=>{
            if(err||res.length!==0) return resolve(0);
            return resolve(1);
        });
    })
};
//注册
router.post("/reg",async (req,res)=>{
    let obj=req.body;
    let sql="INSERT INTO user(name,pwd,img) VALUES (?,?,?)";
    let checkRes=await check(obj);
    if(checkRes===0) return res.send({code:1,message:"该用户名已被注册",data:{check:0}});
    pool.query(sql,[obj.name,obj.pwd,obj.img],(err,result)=>{
        if(err) return res.send({code:500,message:"注册出错",err})
        res.send({code:1,message:"注册成功",data:{check:1}});
    });
});

//登录
router.post("/login",(req,res)=>{
    let obj=req.body,
    sql="SELECT img,id FROM user WHERE name=? AND pwd=?";
    pool.query(sql,[obj.name,obj.pwd],(err,result)=>{
        if(err) return res.send({code:500,message:"登录出错",err});
        if(result.length===0) return res.send({code:1,message:"请输入正确的用户名和账号",data:{check:0}});
        return res.send({code:1,message:"登录成功",data:{check:1,user:{name:obj.name,img:result[0].img,id:result[0].id,pwd:obj.pwd}}});
    });
});
//修改账户信息
router.post("/changeUser",(req,res)=>{
    let sql="UPDATE user SET name=?,pwd=?,img=? WHERE id=?",obj=req.body;
    pool.query(sql,[obj.name,obj.pwd,obj.img,obj.id],(err,result)=>{
        if(err) return res.send({code:500,message:"修改信息错误",err});
        res.send({code:1,message:"修改成功"});
    });
});
module.exports=router;
