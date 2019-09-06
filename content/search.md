## Searches

### Get List of Meals

For the 4 endpoints below, all responses are standardized, only the order will change.

Query parameters for `offset` and `limit` should be added to each request. If those parameters are not added, the default values will be `0` and `10` respectively.

In the response, `count` is the total number meals to user for pagination and `rows` contains the array of meals.

HTTP Method | Endpoint | Description
|---|---|---
`GET` | `/search/newest` | Get meals from newest to oldest.
`GET` | `/search/oldest` | Get meals from oldest to newest.
`GET` | `/search/names-a-z` | Get meals by name from A to Z.
`GET` | `/search/names-z-a` | Get meals by name from Z to A.

#### Example Endpoint

```endpoint
GET /search/newest?offset={0}&limit={10}
```

#### Example Response (200)

```json
{
  "count": 1,
  "rows": [
    {
      "id": 1,
      "difficulty": 1,
      "mealPic": "public/images/mealPics/Eggs-and-Rice.jpeg",
      "name": "Eggs and Rice",
      "cookTime": 20,
      "creatorId": 1,
      "creator": {
        "username": "johndoe",
        "profilePic": null
      },
      "likes": [
        { "id": 1 }
      ]
    }
  ]
}
```

#### Example Response (404)

```json
{
  "message": "There are no meals."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error getting the list of meals."
}
```

### Get Meals Created By a User

For the 4 endpoints below, all responses are standardized, only the order of the meals will change.

Query parameters for `offset` and `limit` should be added to each request. If those parameters are not added, the default values will be `0` and `10` respectively.

A query parameter for `username` must be added to the request.

For the response, `rows` contains the array of meals, `count` contains the number of meals created by the user to be used for pagination. `id`, `username`, and `profilePic` are the user's display information.

If the user has not created any meals, `rows` will be an empty array.

HTTP Method | Endpoint | Description
|---|---|---
`GET` | `/search/byuser-a-z` | Get meals created by a user listed in alphabetical order.
`GET` | `/search/byuser-a-z` | Get meals created by a user listed in reverse alphabetical order.

#### Example Endpoint

```endpoint
GET /search/byuser-a-z?name={johndoe}&offset={0}&limit={10}
```

#### Example Response (200)

```json
{
  "id": 1,
  "username": "johndoe",
  "profilePic": null,
  "count": 1,
  "rows": [
    {
      "id": 1,
      "difficulty": 1,
      "mealPic": null,
      "name": "Eggs and Rice",
      "cookTime": 20,
      "creatorId": 1,
      "creator": {
        "username": "johndoe",
        "profilePic": null
      },
      "likes": [
        { "id": 2 }
      ]
    }
  ]
}
```

#### Example Response (404)

```json
{
  "message": "This user does not exist."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error getting the list of meals."
}
```

### Search for Meals by Ingredients

For the 4 endpoints below, all responses are standardized, only the order of the meals will change.

Query parameters for `offset` and `limit` should be added to each request. If those parameters are not added, the default values will be `0` and `10` respectively.

Ingredients must be added to the query parameter `ingredient`.

HTTP Method | Endpoint | Description
|---|---|---
`GET` | `/search/byingredients-a-z` | Get meals with specific ingredients listed in alphabetical order.
`GET` | `/search/byingredients-z-a` | Get meals with specific ingredients listed in reverse alphabetical order.

#### Example Endpoint

```endpoint
GET /search/byingredients-a-z?ingredient={egg}&ingredient={rice}&offset={0}&limit={10}
```

#### Example Response (200)

```json
{
  "count": 1,
  "rows": [
    {
      "id": 1,
      "difficulty": 1,
      "mealPic": null,
      "name": "Eggs and Rice",
      "cookTime": 20,
      "creatorId": 1,
      "creator": {
        "username": "johndoe",
        "profilePic": null
      },
      "likes": []
    }
  ]
}
```

### Search for Meals by Ingredients Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `You must add ingredients to the search.` | No ingredients were added to the search.
`404` | `There are no meals with those ingredients.` | No meals match the request.
`500` | `There was an error getting the list of meals.` | A server error occured.

### Get List of Meals By Name

This endpoint is for autocompleting searches. It will return an array of the first 10 meals that contain the searched word in the name. It is case insensitive.

If there are no meals that match the search, the server will respond with a status of `200` and an empty array.

#### Example Endpoint

```endpoint
GET /search/name?name={egg}
```

#### Example Response (200)

```json
[
  {
    "id": 1,
    "name": "Eggs and Rice"
  }
]
```

#### Example Response (500)

```json
{
  "message": "There was an error getting the list of meals."
}
```