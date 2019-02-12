## React With API calls


### Objectives

1.  Make an api call to retrieve a bunch of crimes
2.  Render the crimes out as a list 
3.  Create Functionality in which we can delete the crimes


**Lets begin buy creating our react app**
```create-react-app react-ajax```

**Next We'll leave our app component as our container component**

- But let's go ahead and set up our state

```javascript
  constructor(){
    super();


    this.state = {
      crimes: []
    }
  }

```

** Next lets set up our api call function **

- We'll create a function that makes a call to the cityOfChicago to fetch a bunch of crimes
##### Inside of the App Component

```javascript
  getCrimes = async () => {

    try {
      const crimes = await fetch('https://data.cityofchicago.org/resource/crimes.json');
       if (!crimes.ok) {
          throw Error(response.statusText);
       }
      const crimesJson = await crimes.json();
      this.setState({crimes: crimesJson});
    } catch (err) {
      console.log(err, 'error in catch block')
      return err
    }


  }

```

**Fetch does not reject the Promise in case of HTTP errors** That's why we need to add the check to reject the promise using throw

## Where to make API calls

1. If we want to make an api call so our data is loaded when the app 
is loaded, we should make the call in componentDidMount, otherwise we can make it at anytime in react.  Note: ```componentDidMount``` is called once in the react lifecycle after the inital ```render``` call.  

- In this particular case we want to make the API call in componentDidMount because we want the data loaded when are app is loaded, we can perform this operation like the following 

```javascript
  componentDidMount(){
    this.getCrimes()
  }

```

**So now that we know we have our data lets list it out**

- It now makes sense to create a functional component in order to render our 
crimes list 

- So lets make a folder called ```CrimesList``` and create inside of it a ```index.js``` and a ```crimes.css``` 

 
- Inside of the ```index.js``` file lets set up our functional component 

```javascript
import React from 'react';


const CrimesList = () => {

    return (
         <h4>Crimes</h4>
      )
}

export default CrimesList;

```

- Now that we set up the basic structure of our crimesList lets import this funcitonal component into our ```App.js``` component, and then render the component, our ```App.js``` should now look like the following.


```javascript
import React, { Component } from 'react';
import './App.css';
import CrimesList from './CrimesList';

class App extends Component {
  constructor(){
    super();


    this.state = {
      crimes: []
    }
  }
  getCrimes = async () => {

    try {
      const crimes = await fetch('https://data.cityofchicago.org/resource/crimes.json');
      const crimesJson = await crimes.json();
      return crimesJson;
    } catch (err) {
      console.log(err, 'error in catch block')
      return err
    }


  }
  componentDidMount(){
    this.getCrimes().then((data) => console.log(data,  ' from famous quotes'));
  }
  render() {
    return (
      <div>
        <CrimesList/>
      </div>
    );
  }
}

export default App;
```

** Now what do we have to do to pass our crimes, to our ```CrimesList``` component ** 

- We have to pass the crimes as props of course, we can do that like the following 

```javascript
  render() {
    return (
      <div>
        <CrimesList crimes={this.state.crimes}/>
      </div>
    );
  }

```

- Now lets make sure we our recieving the correct props in our CrimesList component 
- we should have a property attached to ```props``` called crimes because that what we called the property in the ```App``` component above.  

```javascript
const CrimesList = (props) => {
  console.log(props)


    return (
           <h4>Crimes</h4>
      )
}

```

-  Now that we know our crimes our in our component lets now use  the ```.map``` 
method attached to arrays to create a list of jsx elements that we can render to the page
Remember we use map, because we our following a functional paridigm and we our not mutating our data, note map creates a brand new array (What we want).

```javascript
const CrimesList = (props) => {
 
    const crimesList = props.crimes.map((crime, i) => {
      return <li key={i}>{crime.description}</li>
    })

    return (
        <div>
          <h4>Crimes List </h4>
          <ul>
            {crimesList}
          </ul>
        </div>
      )
};
```

** Lets test that out and make sure we have a list of crimes **


-  Now that we see that our list is being rendered, lets go ahead and work on the delete functionality

-  So what do we know? Our crimes our stored in order of there index number, so what we will need to do is be able to retrieve the index number of the crimes that we are trying to delete

- So first steps lets create a deleteCrime function in our ```App``` component, and pass it to our crimesList component like the following 

```javascript
 deleteItem = (e) => {
    console.log('delete button working')

  }
  render() {
    return (
      <div>
        <CrimesList crimes={this.state.crimes} deleteItem={this.deleteItem}/>
      </div>
    );
  }
```

-  Lets use the deleteItem function in our ```CrimesList``` component like the following 

```javascript
import React from 'react';


const CrimesList = (props) => {
  console.log(this.props)
    const crimesList = props.crimes.map((crime, i) => {
      return <li key={i}>{crime.description} <button onClick={props.deleteItem}>Delete</button></li>
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

```

- So now when we load up our app we when we click on the button we should see our console.log message from inside of the deleteItem function. 

** Now we have to work on getting the index number of the crime to our deleteItem function in order to delete it out of our ```crimes``` array in our state.

-  What we can use is another functional programming method from vanilla javascript called ```.bind```
 -  ```.bind()```, allows us to pass a predifined argument to our function when its called, as well as set the context of this on the method call (since we don't care about the context we can use null)

```javascript
import React from 'react';


const CrimesList = (props) => {
    
    const crimesList = props.crimes.map((crime, i) => {
      return <li key={i}>{crime.description} <button onClick={deleteItem.bind(null, i)}>Delete</button></li>
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

```

- The above will pass the index number (```i```) to deleteItem when the function is called now, we can check to make sure this by doing the following in the deleteItem function in ```App.js```


```javascript
  deleteItem = (index, e) => {
    
    console.log(index, ' this is the index number')

  }

```

**Now go ahead and test that out**

- Now that we have the index number, we can use another functional programming method, 
that allows to filter through an array in order to create a new array that only contains the things we want, this method is called ```.filter```, note: this creates a brand new array

- We can filter our crimes like the following 

```javascript
  deleteItem = (index, e) => {
    this.setState((previousState) => (
      {crimes: previousState.crimes.filter((crime, i) => i !== index )
    }));
  }
```

- Note here are some new things.  We are using the functional version of setState, so we can 
use the previousState(what the state is before we update) and create a new array with all the crimes except the one we want. 

**Go ahead and test that out**