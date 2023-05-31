import React from 'react';
import './App.css';

function Card({user}) {
  return (
    <div className="card">
      <p>Name: {user.name}</p>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite sport: {user.favorite_sport}</p>
    </div>
  )
}

export default Card;