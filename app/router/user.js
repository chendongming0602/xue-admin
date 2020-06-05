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

const storage2 = multer.diskStorage({
    //存储的位置
    destination(req, file, cb){
        cb(null, "public/vue/public/text")
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb){
        cb(null, Date.now() +"-"+ file.originalname)
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
 const upload2 = multer({storage:storage2});//文件
router.post('/img',async(req,res,next)=>{
    let result=await imgs(req,res);
    if(result===0) return res.send({code:500,message:"图片上传失败"});
    res.send({code:1,message:"图片上传成功",data:result})
    // console.log(req.file)
});




router.post('/text',upload2.single('text'),(req,res,next)=>{
    let url=req.file.originalname;
	console.log(url)  
	res.send({code:1,message:"上传文件成功",data:[]})
});


////////////////////////////////////////////////////////////////////////////////////
//注册
let check=(obj)=>{
    return new Promise((resolve,reject)=>{
        let sql="SELECT id FROM user WHERE name=?";
        pool.query(sql,[obj.name],(err,res)=>{
            if(err||res.length!==0) return resolve(0);
            return resolve(1);
        });
    })
};
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
    sql="SELECT img FROM user WHERE name=? AND pwd=?";
    pool.query(sql,[obj.name,obj.pwd],(err,result)=>{
        if(err) return res.send({code:500,message:"登录出错",err});
        if(result.length===0) return res.send({code:1,message:"请输入正确的用户名和账号",data:{check:0}});
        return res.send({code:1,message:"登录成功",data:{check:1,user:{name:obj.name,img:result[0].img}}});
    });
});
// let uploadEvent=(req,folder)=>{//上传的总函数
// 	return new Promise((reslove,rejact)=>{
// 	   const url = `public\/${req.file.filename}`;
// 	   let name = /\.[^\.]+$/.exec(url);//后缀
// 	   let math=Math.random();
// 	   math=math.toString().replace(".","");//随机字符串
	   
// 	});
// }
// router.post("/reg",(req,res)=>{
// 	var id="";
// 	var uname=req.body.uname;
// 	var upwd=req.body.upwd;
// 	var email="";
// 	var phone="";
// 	var avatar=req.body.avatar;
// 	var real_name="";
// 	var sex="";
// 	// console.log(uname,upwd)
  
// 	var sql="INSERT INTO mv_user VALUES (?,?,?,?,?,?,?,?)";//密码加密
// 	pool.query(sql,[id,uname,upwd,email,phone,avatar,real_name,sex],(err,result)=>{
// 	  if(err) throw err;
// 	  if(result.affectedRows>0){
// 		res.send({code:1,msg:"注册成功"});
// 	  }else{
// 		res.send({code:-1,msg:"注册失败"});
// 	  }
// 	});
//   });
  
  
//   router.post("/verify",(req,res)=>{//验证用户名是否已经存在
// 	  var sql="SELECT uid FROM mv_user WHERE uname=?";
// 	  pool.query(sql,[req.body.uname],function(err,result){
// 		  if(err) throw err;
// 		  if(result.length>0){
// 			  res.send({code:-1,msg:"用户名已经存在"});
// 		  }else{
// 			  res.send({code:1,msg:"用户名可用"});
// 		  };
// 	  });
//   });



// router.post("/login",(req,res)=>{

// 	var obj=req.body;
// 	var sql="SELECT uid FROM mv_user WHERE uname=? AND upwd=?";//登录
// 	  pool.query(sql,[obj.uname,obj.upwd],function(err,result){
// 		  if(err) throw err
// 		  if(result.length>0){
// 		  req.session.uid=result[0].uid//session值
// 		  // console.log(req.session)
// 		  res.send({code:1,msg:"登录成功",session:req.session.uid});
// 			  }else{
// 		  res.send({code:-1,msg:"用户名或者密码错误"});
// 		  };
// 	  });
//   });
  
//   router.post("/loglog",(req,res)=>{//登录返回用户名
// 	var sql="SELECT uname,avatar FROM mv_user WHERE uid=?";
// 	  pool.query(sql,[req.session.uid],function(err,result){
// 		  if(err) throw err;
// 		  if(result.length>0){
// 			  res.send({code:1,data:result});
// 		  }else{
// 			  res.send({code:-1,msg:"请先登录"});
// 		  };
// 	  });
//   });

module.exports=router;
