## Meals

### Get Available Meal Name

Checks for meal name availability. The responses have no body.
The responses will either have a status of `204` for available names or `400` for taken names.

```endpoint
GET /meals/available-names?name={nameofmeal}
```

### Create Meal

Creates a new meal. The user's JWT must also be added to the authorization header as a bearer token.

A successful response will contain the id and name of the recipe and a message.

Property | Description
---|---
`name` | The name of the meal. It is limited to 75 characters.
`ingredients` | This is an array of ingredients. Currently, this must be sent to the api as a string. This will be updated in the future.
`instructions` | This is an array of each step of the instructions. Currently, this must be sent to the api as a string. This will be updated in the future.
`cookTime` | This is the number of minutes it takes to create the meal. This must be a number
`difficulty` | This is a number, 1 - 5, to show how difficult it is to make the meal.
`description` | This is a short description of the meal. It is limited to 150 characters.
`recipePicName` | This is the url of cloudinary secure_url.  
`publicId` | This is the public id of cloudinary public_id.  
`originalRecipeUrl` | (optional) This is the original url of the recipe if the user got the recipe from the internet.
`youtubeUrl` | (optional) This is the shared url of the YouTube video of the meal if the user got the recipe from a YouTube video. And example of the url is `https://youtu.be/dQw4w9WgXcQ`

```endpoint
POST /meals/create
```

#### Example Response (200)

```json
{
  "id": 1,
  "name": "Sandwich",
  "message": "Meal successfully created."
}
```

### Create Meal Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This meal name is already taken.` | The meal name is already being used.
`415` | `Please upload a JPEG image.` | Image was not a JPEG image.
`500` | `There was an error creating your recipe.` | A server error occured.

### Get Meal by name or id

To get the mail by name, send the name of the meal in the `name` query parameter to get the meal data.

```endpoint
GET /meals/meal-by-name?name={nameofmeal}
```  

To get the mail by id, send the id of the meal in the `id` query parameter to get the meal data.

```endpoint
GET /meals/meal-by-id?id={idofmeal}
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
  "mealPic": {
    "mealPicName": "cloudinaryURL"
  },
  "creatorId": 1,
  "creator": {
    "username": "string",
    "profilePic": {
      "profilePicName": "string"
    }
  },
  "savedRecipes": [
    {"userId": 1}
  ],
  "likes": [
    {"userId": 1}
  ],
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

Update a meal by attaching a JWT in the authorization header as a bearer token, and adding the meal id as an `id` property. The updated values will be any extra properties you supply.

```endpoint
PUT /meals/update
```

#### Example Request

```json
{
  "id": 1,
  "name": "New name"
}
```

#### Example Response (200)

```json
{
  "id": 1,
  "message": "Meal successfully updated."
}
```

### Update Meal Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This recipe name is already taken.` | The meal name is already being used.
`403` | `You do not have permission to edit this recipe.` | The meal id and creator id from the JWT do not match the records of the meal in the database.
`500` | `There was an error updating your recipe image.` | Cloudinary error.
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
  "message": "Recipe successfully deleted."
}
```

#### Example Response Errors

```json
{
  "message": "You do not have permission to delete this recipe."
}
```

```json
{
  "message": "There was an error deleting your recipe."
}
```