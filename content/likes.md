## Likes

### Add Like

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `recipeId` to the body of a POST request.

```endpoint
POST /likes/add
```

#### Example Response (200)

```json
{
  "message": "Recipe successfully liked."
}
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

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `recipeId` to the body of a DELETE request.

```endpoint
DELETE /likes/remove
```

#### Example Response (200)

```json
{
  "message": "Recipe successfully unliked."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error unliking this recipe."
}
```

### Get Recipe Likes

Returns an ordered array of `{ userId: 1 }` for all users who have liked the recipe.  
Add the recipe id to the `recipeId` query

```endpoint
DELETE /likes/recipe-likes?recipeId=1
```

#### Example Response (200)

```json
[
  {
    "userId": 1
  }
]
```

#### Example Response (404)

```json
{
  "message": "That recipe does not exist."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error."
}
```