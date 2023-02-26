import React,{useState} from "react";


function PlantCard({plant, onDeletePlant, onUpdatePlant}) {
  const {name,id, image, price} = plant

  const [isInStock, setIsInStock] = useState(true)
  const [updatePrice, setUpdatePrice] = useState(price)

  function handleToggleStock() {
    console.log(isInStock)
    setIsInStock((isInStock) => !isInStock)
  }

  function handleDeleteClick(){
    fetch(`http://localhost:6001/plants/${id}`,{
      method: 'DELETE'
    })
    onDeletePlant(id)
  }

  function handlePriceFormSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({price: updatePrice})
    })
    .then(r=>r.json())
    .then((updatedPlant)=> {
      onUpdatePlant(updatedPlant)
    })
  }
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary"
        onClick={handleToggleStock}>In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input
          type='number'
          step='0.01'
          placeholder="New price..."
          value={updatePrice}
          onChange={(e)=> setUpdatePrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
