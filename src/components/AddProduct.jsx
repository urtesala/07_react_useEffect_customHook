import { useState, useRef } from 'react';
import useInput from './../hooks/useInput'

function AddProduct(props) {
  const formRef = useRef(null);
  // sukurti handleSubmit funkcija
  function handleSubmit(event) {
    // paleisti ja patekiant forma
    // sustabdyti perkrovima
    event.preventDefault();
    // console.log('handling submit');

    // surinkti visas input reiksmes i viena objekta
    const newProducObj = {
      title: title.value,
      image: image.value,
      price: price.value,
    };
    // ir iskviesti tevinio komponento funckija productAddHandler(newProdObj)
    props.onAddProduct(newProducObj);
    // paduodant argumentu newProdObj

    // kad iskviesti tevinio komponento funkcija, mes aprasom ta funkcija Products
    // komponente ir perduodam ja i AddProducts per props
  }

  // const [titleValue, setTitle] = useInput();
  const title = useInput('');
  const image = useInput('');
  const price = useInput('');

  function formResetHandler() {
    //
    console.log('formRef.current ===', formRef.current);
    // formRef.current.reset(); // neveikia
    title.reset();
    image.reset();
    price.reset();
  }

  return (
    <fieldset>
      <legend>AddProduct</legend>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={title.setter}
          value={title.value}
          placeholder='title'
        />
        <input
          onChange={image.setter}
          value={image.value}
          type='text'
          placeholder='image url'
        />
        <input
          type='number'
          step={0.01}
          onChange={price.setter}
          value={price.value}
          placeholder='price'
        />
        <button type='submit'>Create</button>
        <button onClick={formResetHandler} type='button'>
          Reset
        </button>
      </form>

      <p>
        Title: {title.value}
        <br />
        ImageUrl: {image.value} <br />
        Price: {price.value}
        <br />
      </p>
    </fieldset>
  );
}
export default AddProduct;
