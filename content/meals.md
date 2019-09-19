## Meals

### Get Available Meal Name

Checks for meal name availability. The responses have no body.
The responses will either have a status of `204` for available names or `400` for taken names.

```endpoint
GET /meals/available-names?name={nameofmeal}
```

### Create Meal

Creates a new meal. The request data must be form data. The user's JWT must also be added to the authorization header as a bearer token.

A successful response will contain the id of the meal and a message.

Property | Description
---|---
`name` | The name of the meal.
`ingredients` | This is an array of ingredients.
`instructions` | This is an array of each step of the instructions.
`cookTime` | This is the number of minutes it takes to create the meal. This must be a number
`difficulty` | This is a number, 1 - 5, to show how difficult it is to make the meal.
`description` | This is a short description of the meal.
`mealPic` | (optional) This is a JPEG image of the meal. It must be less than 5mb.
`originalRecipeUrl` | (optional) This is the original url of the recipe if the user got the recipe from the internet.
`youtubeUrl` | (optional) This is the url of the YouTube video of the meal if the user got the recipe from a YouTube video.

```endpoint
POST /meals/create
```

#### Example Response (200)

```json
{
  "id": 1,
  "message": "Meal successfully created."
}
```

### Create Meal Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This meal name is already taken.` | The meal name is already being used.
`415` | `Please upload a JPEG image.` | Image was not a JPEG image.
`500` | `There was an error creating your meal.` | A server error occured.

### Get Meal

Send the name of the meal in the `name` query parameter to get the meal data.

To get the image, add the value of the property `mealPic` to the API url.

```endpoint
GET /meals/meal?name={nameofmeal}
```

#### Example Response (200)

```json
{
  "id": 1,
  "name": "Eggs and Rice",
  "ingredients": [
    "3 eggs",
    "rice",
    "vegetables"
  ],
  "instructions": [
    "cooks eggs",
    "cook rice",
    "mix and serve"
  ],
  "cookTime": 20,
  "difficulty": 1,
  "description": "A delicious and easy dish.",
  "originalRecipeUrl": "www.recipe.com",
  "youtubeUrl": "www.video.com",
  "mealPic": "public/images/mealPics/eggs-and-rice.jpeg",
  "creatorId": 1,
  "originalName": "eggs-and-rice",
  "updatedAt": "2019-09-04T07:59:06.815Z",
  "createdAt": "2019-09-04T07:59:06.815Z"
}
```

#### Example Response (404)

```json
{
  "message": "That meal does not exist."
}
```

### Update Meal

Update a meal by supplying data to be updated as form data, attaching a JWT in the authorization header as a bearer token, and adding the meal id as an `id` property.

```endpoint
PUT /meals/update
```

#### Example Request of Form Data

```json
{
  "id": 1,
  "name": "Eggs, Chicken, and Rice",
  "ingredients": [
    "3 eggs",
    "rice",
    "vegetables"
  ],
  "instructions": [
    "cooks eggs",
    "cook rice",
    "mix and serve"
  ],
  "difficulty": 2
}
```

#### Example Response (200)

```json
{
  "message": "Meal successfully updated."
}
```

### Update Meal Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This meal name is already taken.` | The meal name is already being used.
`415` | `Please upload a JPEG image.` | Image was not a JPEG image.
`500` | `There was an error updating your meal.` | A server error occured.

### Meal Delete

To delete a meal, add the creator's JWT as a bearer token in the authorization header. In the body of the request, add the id of the meal.

```endpoint
DELETE /meals/delete
```

#### Example Request

```json
{
  "id": 1
}
```

#### Example Response (200)

```json
{
  "message": "Meal successfully deleted."
}
```

#### Example Response (500) Server Errors

```json
{
  "message": "There was an error deleting your meal picture."
}
```

```json
{
  "message": "There was an error deleting your meal."
}
```