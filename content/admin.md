## Admin

### Get List of Users

For each endpoint, a JWT for a user who is an admin must be attached in the authorization header as a bearer token.
Query parameters for `offset` and `limit` should be added to each request. If those parameters are not added, the default values will be `0` and `10` respectively. All responses are standardized, only the order will change.
`count` is used for pagination and `rows` holds the array of users.

HTTP Method | Endpoint | Description
|---|---|---
`GET` | `/admin/newusers` | Get users from newest to oldest.
`GET` | `/admin/oldusers` | Get users from oldest to newest.
`GET` | `/admin/username-a-z` | Get users by username from A to Z.
`GET` | `/admin/username-z-a` | Get users by username from Z to A.
`GET` | `/admin/firstname-a-z` | Get users by first name from A to Z.
`GET` | `/admin/firstname-z-a` | Get users by first name from Z to A.
`GET` | `/admin/lastname-a-z` | Get users by last name from A to Z.
`GET` | `/admin/lastname-z-a` | Get users by last name from Z to A.

#### Example Endpoint

```endpoint
GET /admin/newusers?offset={0}&limit={10}
```

#### Example Reponse (200)

```json
{
  "count": 1,
  "rows": [
    {
      "id": 1,
      "username": "johndoe",
      "profilePic": null,
      "firstName": "John",
      "lastName": "Doe",
      "email": "test@email.com",
      "isVerified": false,
      "isAdmin": true,
      "createdAt": "2019-09-04T00:54:34.148Z",
      "meals": [
        { "id": 1 }
      ]
    }
  ]
}
```

#### Example Reponse (403) for users who are not admin users

```json
{
  "message": "You do not have permission to access this service."
}
```

#### Example Response (500) Server Error

```json
{
  "message": "There was an error getting the list of users."
}
```