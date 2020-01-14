## Passwords

### Password Reset Email

This sends an email to the user with a link to reset their password.

Send a post request with the `email` in the body of the request. A token will be created that is valid for 2 hours. The token will be in the link that is in the email sent to the user.

```endpoint
POST /password/send
```

#### Example Request

```javascript
{
  email: "test@email.com"
}
```

#### Example Response (200)

```json
{
  "message": "An email has been sent to test@email.com with further instructions."
}
```

#### Example Response (404)

```json
{
  "message": "No account with that email address exists."
}
```

#### Example Response (500)

```json
{
  "message": "There was an error sending your password reset email."
}
```

### Reset Password

Once the user is redirected to the reset password page after clicking on the link in the email, you can send a put request with `token`, `password`, and `passwordConfirmation` properties in the body.

```endpoint
PUT /password/reset
```

#### Example Request

```javascript
{
  token: "123456789",
  password: "password",
  passwordConfirmation: "password"
}
```

#### Example Response (200)

```json
{
  "message": "Your password was successfully reset. Please log in with your new password."
}
```

### Reset Password Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`404` | `Password reset token is invalid or has expired.` | The token is no longer in the database.
`400` | `Passwords do not match.` | `password` and `passwordConfirmation` do not match.
`500` | `There was an error resetting your password.` | A server error occured.

### Update Password

This endpoint updates a signed in user's password by sending the new `password`, `passwordConfirmation`, and a JWT in the authorization header as a bearer token.

The password must be at leat 8 characters long.

```endpoint
PUT /password/update
```

#### Example Request

```javascript
{
  password: "password",
  passwordConfirmation: "password"
}
```

#### Example Response (200)

```json
{
  "message": "Your password was successfully updated."
}
```

### Update Password Errors

On error, the JSON response body includes a `message` property with a human-readable explanation of the error. If a server error occurs, the HTTP status code will be `500` or higher.

HTTP Status Code | Error Message | Description
|---|---|---
`400` | `Password must be at least 8 characters long.` | The password is too short.
`400` | `Passwords do not match.` | `password` and `passwordConfirmation` do not match.
`500` | `There was an error updating your password.` | A server error occured.