import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [item, setItem] = useState({
    title: '',
    description: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(item);
  }

  function AddItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post('/newitem', newItem);
    console.log(newItem);
  }

  return (
    <div className="App">
      <input
        onChange={handleChange}
        name="title"
        value={item.title}
        placeholder="title"
      ></input>
      <input
        onChange={handleChange}
        name="description"
        value={item.description}
        placeholder="description"
      ></input>
      <button onClick={AddItem}>Add Item</button>
    </div>
  );
}
export default App;
