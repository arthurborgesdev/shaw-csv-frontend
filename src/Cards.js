import React from 'react';
import Card from './Card';
import './App.css';

function Cards({data}) {
  return (
    <article className="cards">
     {data.map(user =>
        <Card key={user._id} user={user} />
      )}
    </article>
  )
}

export default Cards;