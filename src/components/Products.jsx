import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import './Products.css';
import SingleProduct from './SingleProduct';

function Products() {
  // komponentas kuris parsisiuncia duomenis
  // 1. sugeneruojam komponenta su tusciu masyvu be duomenu
  const [mainProductsArray, setMainProductsArray] = useState([]);
  // 2. tik sugeneravus useEffecte parsiunciam duomenis
  useEffect(() => {
    getProducts();
  }, []);
  // 3. parsiuntus atnaujinam tuscia state masyva su gautais duomenimis
  // react pats nubraizo pakeitimus html

  const [isLoading, setIsLoading] = useState(false);
  const [toShowForm, setToShowForm] = useState(false);

  async function getProducts() {
    try {
      // console.log('try');
      // loading starts
      setIsLoading(true);
      let url = 'https://golden-whispering-show.glitch.me';
      url = '/api/products.json';
      const resp = await fetch(url);
      const dataInJs = await resp.json();
      // console.log('dataInJs ===', dataInJs);
      // irasyti i state gautus produktus
      setMainProductsArray(dataInJs);
      // setIsLoading(false); // moved to finally
    } catch (error) {
      // console.log('catch');
      console.warn('did not get products');
      // setIsLoading(false); // moved to finally
    } finally {
      // vyksta bet kuriuo atveju
      // console.log('finally');
      setIsLoading(false);
    }
  }

  function productDeleteHandler(idToDelete) {
    // console.log('deleting...', idToDelete);
    setMainProductsArray((prevState) =>
      prevState.filter((pObj) => pObj.id !== idToDelete)
    );
  }

  // susikurti productAddHandler(newProduct)
  function productAddHandler(newProduct) {
    //
    // console.log('productAddHandler ran');
    // console.log('newProduct ===', newProduct);
    const newProductWhitId = {
      id: Math.random().toString().slice(5),
      ...newProduct,
    };
    // console.log('newProductWhitId ===', newProductWhitId);
    setMainProductsArray((prevProducts) => [...prevProducts, newProductWhitId]);
    setToShowForm(false);
  }
  // perduoti i AddProduct
  // productAddHandler kviecia setMainProductsArray()
  // atnaujinam su arrow funkcija (spread (...))

  const pObj = {
    id: 1,
    image:
      'https://pagrindinis.barbora.lt/api/images/GetInventoryImage?id=d0fb9982-06e1-469d-ae79-e7efd69c59a1',
    title: 'Gerimanto Sūris',
    price: 2.99,
  };

  function toShowFormOrNotToShow() {
    // pakeisti toShowForm reiksme i true
    // setToShowForm(true);
    // pakeisti toShowForm reiksme i priesiga esamai.
    setToShowForm((prevShowValue) => !prevShowValue);
  }

  return (
    <div>
      <h2>Products</h2>
      <button onClick={toShowFormOrNotToShow}>
        {toShowForm ? 'Hide' : 'Show'} Add Product
      </button>
      {toShowForm && <AddProduct onAddProduct={productAddHandler} />}

      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <ul className='unlisted grid--pr'>
          {/* mapinti per mainProductsArray ir generuoti li */}
          {mainProductsArray.map((pObj) => (
            // SingleProductui paduoti id props
            <SingleProduct
              key={pObj.id}
              id={pObj.id}
              price={pObj.price}
              image={pObj.image}
              onDelete={productDeleteHandler}
            >
              {pObj.title}
            </SingleProduct>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Products;
