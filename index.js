//GraphQL Test Queries at the END ↓

import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, assertInputType } from 'graphql';

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];

var schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  name: String
  description: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setrestaurant(input: restaurantInput): restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, name: String!): restaurant
}
`);
// The root provides a resolver function for each API endpoint

var root = {
  restaurant: (arg) => {
    // Your code goes here
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === arg.id) {
        return restaurants[i];
      }
    }
    throw new Error(`Restaurant with id ${arg.id} does not exist`);
  },
  restaurants: () => {
    // Your code goes here
    return restaurants;
  },
  setrestaurant: ({ input }) => {
    // Your code goes here
    restaurants.push(input);
    return input;
  },
  deleterestaurant: ({ id }) => {
    // Your code goes here
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === id) {
        const ok = true;
        console.log('Deleting restaurant');
        restaurants.splice(i, 1);
        return {ok};
      }
    }
    throw new Error(`Restaurant with id ${id} does not exist`);
  },
  editrestaurant: ({ id, ...restaurant }) => {
    // Your code goes here
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === id) {
        console.log('Editing restaurant');
        restaurants[i] = {...restaurants[i], ...restaurant};
        return restaurants[i];
      }
    }
    throw new Error(`Restaurant with id ${id} does not exist`);
  },
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var port = 5500;
app.listen(5500, () => console.log("Running Graphql on Port: " + port));

export default root;

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