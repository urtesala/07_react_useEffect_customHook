/* 
<SingleProduct key={pObj.id} price={pObj.price} image={pObj.image}>
  germanto suris
</SingleProduct>
*/

function SingleProduct(props) {
    // props.onDelete === productDeleteHandler (esanciame Products cmp)
  
    function deleteTrigger() {
      props.onDelete(props.id);
    }
  
    return (
      <li className='singleProduct'>
        <img src={props.image} alt={props.children} />
        <h3>{props.children}</h3>
        <p className='singleP__price'>$ {props.price}</p>
        {/* pasiiimti id is props ir paduoti i onDelete */}
        <button onClick={deleteTrigger}>delete ⁉ </button>
      </li>
    );
  }
  export default SingleProduct;