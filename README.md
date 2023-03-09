### GRAPHQL RESTAURANT EXERCISE

npm install
(Assumes user has nodemon)

/*--------------TEST QUERIES--------------------------

query oneRestaurant {
  restaurant(id: 3) {
    id
    name
    description
    dishes {
      name
      price
    }
  }
}

query allRestaurants {
  restaurants {
    id
    name
    description
    dishes {
      name
      price
    }
  }
}

mutation addRestaurant {
  setrestaurant(input: {    
    name: "El Bajio",
    description: "Classic Mexican"
  }) {
    id
    name
    description
    dishes {
      name
      price
    }
  }
}

mutation deleteRestaurant {
  deleterestaurant(id: 1) {
    ok
  }
}

mutation editRestaurant {
  editrestaurant(id: 3, name: "NEW NEW Karma") {
    id
    name
    description
    dishes {
      name
      price
    }
	}
}

------------------------------------------------------*/