import { useState } from 'react';
import './Products.css';

function Products(props) {
  // komponentas parsiuncia duomenis
  //1. sugeneruoja komponenta su tusciu masyvu be duomenu
  const [mainProductsArray, setMainProductsArray] = useState([]);
  //2. tik sugeneravus useEffecte parsisiunciam duomenis
  useEffect(() => {
    getProducts();
  });

  //3. parsisiuntus atnaujinam tuscia mastyva su gautais duomenimis.
  //react pats nubraizo pakeitimus html

  async function getProducts() {
    const url = 'https://golden-whispering-show.glitch.me';
    const resp = await fetch(url);
    const datainJs = await resp.json();
    console.log('datainJs ===', datainJs);
  }

  return (
    <div>
      <h2>Products</h2>
      <ul className='unlisted grid--products'>
        <li className='singleProduct'>One</li>
        <li className='singleProduct'>One</li>
        <li className='singleProduct'>One</li>
      </ul>
    </div>
  );
}
export default Products;
