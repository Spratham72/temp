const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
function connect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/assignment2')
}
const sectionSchema=new mongoose.Schema({
  name:{type:String,required:true}, 
  book_id:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  ],
},
{
    versionKey: false,
    timestamps: true,
  })
const section=mongoose.model("section",sectionSchema);

const booksSchema=new mongoose.Schema({
    name:{type:String,required:true},
},
{
    versionKey: false,
    timestamps: true,
  })

const Book= mongoose.model("book",booksSchema);

const authorSchema=new mongoose.Schema({
    name:{type:String, required:true},
    book_id:[{type:mongoose.Schema.Types.ObjectId,ref:"book", required:true}]
},
{
    versionKey: false,
    timestamps: true,
  })
const author= mongoose.model("author",authorSchema);

const checkedOut=new mongoose.Schema({
    name:{type:String,required:true},
    book_id:{type:mongoose.Schema.Types.ObjectId,ref:"book", required:true},
},
{
    versionKey: false,
    timestamps: true,
  })
  const check=mongoose.model("check",checkedOut)

//Book
app.post('/book', async(req,res)=>{
    try {
        const item=await Book.create(req.body);
        return res.send(item);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/book', async(req,res)=>{
    try {
        const item=await Book.find().lean().exec();
        return res.send(item);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

//Author
app.post('/author',async(req,res)=>{
    try {
        const item=await author.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/author',async(req,res)=>{
    try {
         const item=await author.find().lean().exec();
         return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/author/:a',async(req,res)=>{
    try {
         const item=await author.findOne({"name":req.params.a}).lean().exec();
         return res.send(item.book_id)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

//Section
app.post('/section',async(req,res)=>{
    try {
        const item=await section.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/section',async(req,res)=>{
    try {
         const item=await section.find().lean().exec();
         return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/section/:a',async(req,res)=>{
    try {
         const item=await section.findOne({"name":req.params.a}).lean().exec();
         return res.send(item.book_id)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/section/:a/:auth',async(req,res)=>{
    try {
         const item=await section.findOne({"name":req.params.a}).lean().exec();
         const item1=await author.findOne({"name":req.params.auth}).lean().exec();
        let a=[];
         ar=item.book_id;
         arr=item1.book_id; 
         return res.send(ar)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

//checkout
app.post('/checkout',async(req,res)=>{
    try {
        const item=await check.create(req.body)
        return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})
app.get('/checkout',async(req,res)=>{
    try {
         const item=await check.find().lean().exec();
         return res.send(item)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.get('/checkout/:a',async(req,res)=>{
    try {
         let sec=await section.findOne({"name":req.params.a}).lean().exec();
             sec=sec.book_id;
         let ch=await check.find().lean().exec();
         let k=[];
         ch.forEach(element => {
             k.push(element.book_id)
         });
         let result=[];
         sec.forEach(el => {
             if(!k.includes(el)){
                 result.push(el)
             }
         });
         return res.send(result)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

app.listen(1111,async()=>{
    await connect();
    console.log("server is running");
})

