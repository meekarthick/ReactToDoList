import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItems from "./SearchItems";
import apiRequest from "./apiRequests";
import "./index.css"
import React, { useState, useEffect } from 'react'
function App() {

  const [items, state] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newSearch, setSearch] = useState('')
  const [fetchError, SetError] = useState('')
  const [isLoading, SetLoading] = useState(true)

  const API_URL = "http://localhost:5000/items"
  useEffect(() => {
    const fetcItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("data not received")
        const listItems = await response.json();
        state(listItems)
        SetError(null)
      } catch (err) {
        SetError(err.message);
      }
      finally {
        SetLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetcItems())()
    }, 2000)
  },
    [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item }
    const listItems = [...items, addNewItem]
    state(listItems)


    const postoptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, postoptions)
    if (result) SetError(result)
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    state(listItems);
    const updateCheck = listItems.filter(item => item.id === id) 
    const reqUrl = `${API_URL}/${id}`
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: updateCheck[0].checked })
    }
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) SetError(result)

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    state(listItems);
    console.log(listItems);
    const reqUrl = `${API_URL}/${id}`
    const deleteOptions = {
      method: 'DELETE',
    }
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) SetError(result)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Task Management System" />
      <AddItem
        newItem={newItem}
        handleSubmit={handleSubmit}
        setNewItem={setNewItem}
      />
      <SearchItems
        newSearch={newSearch}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading list items</p>}
        {fetchError && <p>{`${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
          items={items.filter(result => ((result.item).toLowerCase()).includes(newSearch.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        }
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
