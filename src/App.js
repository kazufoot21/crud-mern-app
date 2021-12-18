import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [item, setItem] = useState({
    title: '',
    description: '',
  });

  const [items, setItems] = useState([
    {
      title: '',
      description: '',
      _id: '',
    },
  ]);

  useEffect(() => {
    fetch('/items')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setItems(jsonRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function AddItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post('/newitem', newItem);
    console.log(newItem);
    alert('item added');

    setItem({
      title: '',
      description: '',
    });
  }

  function deleteItem(id) {
    axios.delete('/delete/' + id);
    alert('item deleted');
    console.log(`deleted item with id: ${id} `);
  }

  return (
    <div className="App">
      <div className="main">
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
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{ background: 'skyblue', width: '40%', margin: 'auto auto' }}
          >
            <p>{item.title}</p>
            <p>{item.description}</p>
            <button
              onClick={() => {
                deleteItem(item._id);
              }}
            >
              Delete
            </button>
            <button>Update</button>
          </div>
        );
      })}
    </div>
  );
}
export default App;
