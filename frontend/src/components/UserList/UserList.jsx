import React from 'react'

const UserList = () => {
  return (
    <>
            <div className="User-list-del-panel">
            {products.map((product) => (
                <div key={product._id} className="User-item-for-del">
                <img src={product.image} alt={product.title} className="User-img" />
                <div className="User-details">
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
                    <p>Id: {product._id}</p>
                </div>
                </div>
            ))}
            </div>
            <div className="fetch-button-admin-panel">
                <button type="button" onClick={fetchProducts}>Fetch Products</button>
            </div>
    </>
)
}

export default UserList