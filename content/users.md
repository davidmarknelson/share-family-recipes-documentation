## Users

### Get Available Username

Checks for username availability. The responses have no body.
The responses will either have a status of `204` for available names or `400` for taken names.

```endpoint
GET /user/available-username?username={username}
```

### Signup New User

Creates a new user. The request data must be form data.  
The JWT contains the user `id`, `username`, and `isAdmin`.

Property | Description
---|---
`username` | Username of the new user between 5 and 15 characters and without a space.
`firstName` | First name of the new user.
`lastName` | Last name of the new user.
`email` | Email of the new user.
`password`| Password of at least 8 characters.
`passwordConfirmation` | Password confirmation of at least 8 characters.
`profilePicName` | (optional) This is the `secure_url` that is returned from cloudinary.
`publicId` | (optional) This is the `public_id` that is returned from cloudinary.
`adminCode` | (optional) Option to include an admin code that matches the code in the api .env file.

```endpoint
POST /user/signup
```

#### Example Request

```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "password": "password",
  "passwordConfirmation": "password",
  "adminCode": "123456789",
  "profilePic": "image.jpeg"
}
```

#### Example Response (201)

```json
{
  "jwt": "validjwt"
}
```

### Signup New User Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This username is already taken.` | A user is already using this username.
`400` | `Username must not include a space.` | Username included a space.
`400` | `Username must be between 5 and 15 characters.` | Username was too short or too long.
`400` | `This email account is already in use.` | A user is already using this email.
`400` | `Passwords do not match` | `password` and `passwordConfirmation` must match.
`500` | `There was an error signing up. Please try again.` | A server error occured.

### Login User

Logs in a user.  
The JWT contains the user `id`, `username`, and `isAdmin`.

```endpoint
POST /user/login
```

#### Example Request

```json
{
  "email": "test@email.com",
  "password": "password"
}
```

#### Example Response (200)

```json
{
  "jwt": "validjwt"
}
```

### Login User Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `The login information was incorrect.` | The email does not exist or the password does not match.
`500` | `There was an error logging in.` | Server error.

### Get Profile

Returns the profile when supplied with a JWT in the authorization header as a bearer token.

```endpoint
GET /user/profile
```

#### Example Response (200)

```json
{
  "id": 1,
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "profilePic": {
    "profilePicName": "cloudinaryurl"
  },
  "isVerified": true,
  "isAdmin": false,
  "createdAt": "date string",
  "updatedAt": "date string"
}
```

### Renew JWT

This returns a new JWT when supplied with a valid JWT as a bearer token in the authorization header.
The JWT contains the user `id`, `username`, and `isAdmin`.

```endpoint
GET /user/renew
```

### Update User

Update a user by supplying data to be updated as form data and attaching a JWT in the authorization header as a bearer token.

Properties are the same as `signup`, but it does not accept `adminCode`, `password`, or `passwordConfirmation`. Password updates are handled by a separate route. Update admin status is currently not available after signup.  

When the user updates their `email`, this route changes `isVerified` changes to `false`.

```endpoint
PUT /user/update
```

#### Example Response (200)

```json
{
  "message": "User successfully updated."
}
```

### Update User Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `This username is already in use.` | A user is already using this username.
`400` | `Username must not include a space.` | Username included a space.
`400` | `Username must be between 5 and 15 characters.` | Username was too short or too long.
`400` | `This email account is already in use.` | A user is already using this email.
`500` | `There was an error updating your profile.` | A server error occured.

### Delete User

Delete user, user's created meals, likes, and saved meals. A JWT must be attached in the authorization header as a bearer token.

```endpoint
PUT /user/delete
```

#### Example Response (200)

```json
{
  "message": "User successfully deleted."
}
```

### Delete User Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`500` | `There was an error deleting your profile.` | A server error occured.