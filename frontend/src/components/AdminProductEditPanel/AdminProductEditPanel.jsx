import React, {useState} from 'react'
import axios from 'axios'
import './AdminProductEditPanel.css'
const AdminProductEditPanel = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [url, setUrl] = useState("")
    const [productId, setProductId] = useState("");
    
    const editProduct = async (e) =>{
        e.preventDefault();
        const request = await axios.put(`localhost:3000/api/products/update/${productId}`,{
            "price":price,
            "image":url,
            "title":title
        });
        const response = request.message
        console.log(response)
        setTitle("")
        setPrice(0)
        setUrl("")
    }
  return (
    <>
        <div className="product-edit-form-wrapper">
        <h2 id='product-edit-form-h2'>Edit Products</h2>
            <form className='product-edit-form'>
                <label htmlFor="title">Title:</label>
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" id="title-edit" name="title" required/>
                
                <label htmlFor="price">Price:</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" id="price-edit" name="price" required/>
                
                <label htmlFor="image">Image URL:</label>
                <input value={url} onChange={(e)=>{setUrl(e.target.value)}} type="url" id="image-edit" name="image" required/>
                
                <label htmlFor="productId">Product Id:</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} type="text" id="productId" name="productId" required/>

                <button type='submit' id='product-edit-form-button' onClick={(e)=>{editProduct(e)}}>Submit</button> 
            </form>
        </div>
    </>
)
}

export default AdminProductEditPanel