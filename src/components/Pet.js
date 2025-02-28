import React from "react";

function Pet({pet, onAdoptPet}) {

  function handleAdoptClick() {
    onAdoptPet(pet.id)
  }

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {pet.gender === "female" ? '♀' : '♂'}
          {pet.name}
        </span>
        <div className="meta">
          <span className="date">{pet.type
          .charAt(0).toUpperCase()+pet.type.slice(1)}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age}</p>
          <p>Weight: {pet.weight}kg</p>
        </div>
      </div>
      <div className="extra content">
        {pet.isAdopted ? <button className="ui disabled button">Already adopted</button> :
        <button className="ui primary button"
        onClick={handleAdoptClick}>Adopt pet</button>}
      </div>
    </div>
  );
}

export default Pet;