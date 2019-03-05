import React from 'react';


const CrimesList = (props) => {
    console.log(props)
    const crimesList = props.crimes.map((crime, i) => {
        return <li key={i}>{crime.description}<button onClick={props.deleteItem.bind(null, i)}>Delete</button></li>
    })

    return (
        <div>
          <h4>Crimes List </h4>
          <ul>
            {crimesList}
          </ul>
        </div>
    )
}

export default CrimesList;