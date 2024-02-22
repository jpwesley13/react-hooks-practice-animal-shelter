import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handleChangeType = (type) => {
    // const newType = {...filters, type: e.target.value}
    // setFilters(newType) // Overly complicated for no reason. The following also works:
    setFilters({type: type}) //by making the e.target.value part of the Filters handleChange function, I can make this part look a little prettier by just dong type: type instead of type: e.target.value, but both work.
}

  const handleFindPetsClick = () => {
    let url = `http://localhost:3001/pets`

    if(filters.type !== "all") {
      url += `?type=${filters.type}`
    } //Keep whatever's going on here in mind, as it may come in handy later.

    fetch(url)
    .then(res => res.json())
    .then(setPets)
    
  }

  const handleAdoptPet = (petId) => {
    const newPets = pets.map(pet => pet.id === petId ? {...pet, isAdopted: true } : pet);
  
    setPets(newPets)
  }

  useEffect(() => {
    if(filters.type === "all") {
      fetch(`http://localhost:3001/pets`)
      .then(res => res.json())
      .then(setPets)
    } else {
      handleFindPetsClick(filters)
    }
  }, [])
  //This isn't apparently necessary for the assignment, but it does let the pets be rendered when the app loads, so I think it's fine.

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
            onChangeType={handleChangeType}
            onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser 
            pets={pets}
            key={pets.id}
            onAdoptPet={handleAdoptPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;