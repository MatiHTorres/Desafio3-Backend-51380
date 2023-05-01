import express from 'express';
import ProductManager from './tercerDesafio.js';

// const ProductManager = require('./tercerDesafio') commonjs

const container = new ProductManager("./src/productos.json");

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/products",async (req, res) => {

    try{
        const limit = req.query.limit
        const products = await container.getProducts()
        if(limit){
            res.status(200).json(products.slice(0, limit))
        }else{
            res.status(200).json(products)
        }
    }catch(error){
        res.status(500).json({message: 'We have an error'})
    }
    
})

app.get("/products/:id",async (req,res) => {
    try{
        const id = req.params.id
        const product = await container.getProductByid(parseInt(id))
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({error:'Product not found, try with a valid id'})
        }
    }catch(error){
        res.status(500).json({error:'We have an error'})
    }
    
})

app.listen(port, () => {
    console.log(`Server listening on PORT 8080 http://localhost:${port}`)
})