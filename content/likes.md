## Likes

### Add Like

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `recipeId` to the body of a POST request. It will return an array of users who have liked the meal.

```endpoint
POST /likes/add
```

#### Example Response (200)

```json
[
  {
    "userId": 1
  }
]
```

#### Example Response (400)

```json
{
  "message": "You have already liked this recipe."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error liking this recipe."
}
```

### Remove Like

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `recipeId` to the body of a DELETE request. On success, it will return a success with a status of `204` and no content in the body.  

```endpoint
DELETE /likes/remove
```

#### Example Response (500)

```json
{
  "message": "There was an error unliking this recipe."
}
```