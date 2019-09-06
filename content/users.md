## Users

### Get Available Username

Checks for username availability.

```endpoint
GET /user/available-username?username={username}
```
#### Example Response (200)

```json
{
  "message": "This username is available."
}
```

#### Example Response (400)

```json
{
  "message": "This username is already taken."
}
```

### Signup New User

Creates a new user. The request data must be form data.

Property | Description
---|---
`username` | Username of the new user between 5 and 15 characters and without a space.
`firstName` | First name of the new user.
`lastName` | Last name of the new user.
`email` | Email of the new user.
`password`| Password of at least 8 characters.
`passwordConfirmation` | Password confirmation of at least 8 characters.
`profilePic` | (optional) Option to provide a picture to be used as the profile picture. Must be less than 5mb and a JPEG image. To get the image url, add the value of this property to the api url.
`adminCode` | (optional) Option to include an admin code that matches the code in the api .env file.

```endpoint
POST /user/signup
```

#### Example Request of Form Data

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
  "user": {
    "isVerified": false,
    "id": 1,
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@email.com",
    "isAdmin": true,
    "profilePic": "public/images/profilePics/johndoe.jpeg",
    "originalUsername": "johndoe",
    "updatedAt": "2019-09-03T08:10:49.017Z",
    "createdAt": "2019-09-03T08:10:49.017Z"
  },
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ZlcmlmaWVkIjpmYWxzZSwiaWQiOjEsInVzZXJuYW1lIjoiam9obmRvZSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwcm9maWxlUGljIjoicHVibGljL2ltYWdlcy9wcm9maWxlUGljcy9qb2huZG9lLmpwZWciLCJvcmlnaW5hbFVzZXJuYW1lIjoiam9obmRvZSIsInVwZGF0ZWRBdCI6IjIwMTktMDktMDNUMDg6MTA6NDkuMDE3WiIsImNyZWF0ZWRBdCI6IjIwMTktMDktMDNUMDg6MTA6NDkuMDE3WiIsImlhdCI6MTU2NzQ5ODI0OSwiZXhwIjoxNTY4MTAzMDQ5fQ.dtZHA3lHuP4p-lej3ROOZnE5LFp0RMIv9F91hAQyh4E"
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
`415` | `Please upload a JPEG image.` | Image was not a JPEG image.
`500` | `There was an error signing up. Please try again.` | A server error occured.

### Login User

Logs in a user.

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
  "user": {
    "id": 1,
    "profilePic": "public/images/profilePics/johndoe.jpeg",
    "username": "johndoe",
    "originalUsername": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@email.com",
    "isVerified": false,
    "isAdmin": true,
    "createdAt": "2019-09-03T08:39:50.743Z",
    "updatedAt": "2019-09-03T08:39:50.743Z",
    "meals": [],
    "savedMeals": []
  },
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvZmlsZVBpYyI6InB1YmxpYy9pbWFnZXMvcHJvZmlsZVBpY3Mvam9obmRvZS5qcGVnIiwidXNlcm5hbWUiOiJqb2huZG9lIiwib3JpZ2luYWxVc2VybmFtZSI6ImpvaG5kb2UiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlzQWRtaW4iOnRydWUsImNyZWF0ZWRBdCI6IjIwMTktMDktMDNUMDg6Mzk6NTAuNzQzWiIsInVwZGF0ZWRBdCI6IjIwMTktMDktMDNUMDg6Mzk6NTAuNzQzWiIsIm1lYWxzIjpbXSwic2F2ZWRNZWFscyI6W10sImlhdCI6MTU2NzQ5OTk5MywiZXhwIjoxNTY4MTA0NzkzfQ.WXAjb1dCT0c6g2IIXYGZtGvt6iuDb0J5_ryerBVc8Kc"
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
  "user": {
    "id": 1,
    "profilePic": "public/images/profilePics/johndoe.jpeg",
    "username": "johndoe",
    "originalUsername": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@email.com",
    "isVerified": false,
    "isAdmin": true,
    "createdAt": "2019-09-03T09:43:55.724Z",
    "updatedAt": "2019-09-03T09:43:55.724Z",
    "meals": [],
    "savedMeals": []
  },
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvZmlsZVBpYyI6InB1YmxpYy9pbWFnZXMvcHJvZmlsZVBpY3Mvam9obmRvZS5qcGVnIiwidXNlcm5hbWUiOiJqb2huZG9lIiwib3JpZ2luYWxVc2VybmFtZSI6ImpvaG5kb2UiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlzQWRtaW4iOnRydWUsImNyZWF0ZWRBdCI6IjIwMTktMDktMDNUMDk6NDM6NTUuNzI0WiIsInVwZGF0ZWRBdCI6IjIwMTktMDktMDNUMDk6NDM6NTUuNzI0WiIsIm1lYWxzIjpbXSwic2F2ZWRNZWFscyI6W10sImlhdCI6MTU2NzUwMzg1MywiZXhwIjoxNTY4MTA4NjUzfQ.Ga6zboAb8OXtCiY2XJhUR5oKY8YMlSsEWA0NAOEWNR8"
}
```

### Update User

Update a user by supplying data to be updated as form data and attaching a JWT in the authorization header as a bearer token.

Properties are the same as `signup`, but it does not accept `adminCode`, `password`, or `passwordConfirmation`. Password updates are handled by a separate route. Update admin status is currently not available after signup.

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
`415` | `Please upload a JPEG image.` | Image was not a JPEG image.
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
`500` | `There was an error deleting your profile picture.` | A server error occured while deleting the profile picture.
`500` | `There was an error deleting a meal picture.` | A server error occured while deleting a meal picture.
`500` | `There was an error deleting your profile.` | A server error occured.