## Saved Meals

### Get User's Saved Meals

For the 4 endpoints below, both responses are standardized, only the order will change.

Add the user's JWT to the authorization header as a bearer token.

Query parameters for `offset` and `limit` should be added to each request. If those parameters are not added, the default values will be `0` and `10` respectively.

In the response, `count` is the total number meals to user for pagination and `rows` contains the array of meals.

HTTP Method | Endpoint | Description
|---|---|---
`GET` | `/saved/a-z` | Get saved meals by name from A to Z.
`GET` | `/saved/z-a` | Get saved meals by name from A to Z.

#### Example Endpoint

```endpoint
GET /saved/a-z?offset={0}&limit={10}
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

#### Example Response (404)

```json
{
  "message": "You have not saved any meals."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error getting your list of saved meals."
}
```

### Save meal

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `mealId` to the body of a POST request.

```endpoint
POST /saved/save
```

#### Example Response (200)

```json
{
  "message": "Meal successfully saved."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error saving this meal."
}
```


### Unsave Meal

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `mealId` to the body of a DELETE request.

```endpoint
DELETE /saved/unsave
```

#### Example Response (200)

```json
{
  "message": "Meal successfully unsaved."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error unsaving this meal."
}
```