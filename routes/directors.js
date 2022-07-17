import express from "express";
import {Director} from "../models/director.js";

const directorsRouter = express.Router();

directorsRouter.get('/',async (req,res)=>
{
    let searchOptions = {};
    if(req.query.nameInput !==null && req.query.nameInput !=='')
    {
        searchOptions.name = new RegExp(req.query.nameInput,'i'); 
    }
    console.log(req.query)
    try
    {
        const directors = await Director.find(searchOptions)
        res.render('./directors/index',
        {
            directors:directors,
            searchOptions:req.query
        });
    }
    catch
    {
        res.redirect('/');
    }
});

directorsRouter.get('/new',(req,res)=>
{
    res.render('./directors/new', {director: new Director()});
});

directorsRouter.post('/', async(req,res)=>
{
    const director = new Director(
    {
       name:req.body.nameInput,    
    })
 
    try
    {
       const newDirector = await director.save();
       res.redirect('./directors');
    }
    catch
    {
        res.render('./directors/new',
        {
            director:director,
            /* director:new Director(), */
            errorMessage:'Error creating director'
        })
    }
});

export {directorsRouter}