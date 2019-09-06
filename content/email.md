## Email Verification

### Send Email Verification Email

Send a post request with the `email` property in the body.
This will create a token in the database and send an email to the user with a link that has the token in the url.

```endpoint
POST /verify/send
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
  "message": "Email has successfully been sent."  
}
```

#### Example Response (500) Server Error

```json
{
  "message": "There was an error sending the email."
}
```

### Verify Email

Send a post request with the `token` property in the body.

This will check the database for the `token`. If the token exists, it will change the user's `isVerified` property from `false` to `true`. Tokens are only valid for 2 hours.

There will only be 1 token associated with a user in the database at any time.

```endpoint
POST /verify/
```

#### Example Request

```javascript
{
  token: "123456789"
}
```

#### Example Response (200)

```json
{
  "message": "Your email is now verified."  
}
```

#### Example Response (404)

```json
{
  "message": "The token has expired. Please send another verification email."  
}
```

#### Example Response (500)

```json
{
  "message": "There was an error verifying your email."  
}
```