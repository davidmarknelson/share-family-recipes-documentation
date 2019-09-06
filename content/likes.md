## Likes

### Add Like

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `mealId` to the body of a POST request.

```endpoint
POST /likes/add
```

#### Example Response (200)

```json
{
  "message": "Meal successfully liked."
}
```

#### Example Response (400)

```json
{
  "message": "You have already liked this meal."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error liking this meal."
}
```

### Remove Like

Add the user's JWT to the authorization header as a bearer token and the id of the meal in the property `mealId` to the body of a DELETE request.

```endpoint
DELETE /likes/remove
```

#### Example Response (200)

```json
{
  "message": "Meal successfully unliked."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error unliking this meal."
}
```