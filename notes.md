# Todo:

- [x] - setup project
- [ ] - confirm password
- [x] - form validation please
- [ ] - conditional rendering

# Notes

- Members can write anonymous posts
- members can see who the author is
- outside they can only see the story

Users need to have:

- first and last name
- username (you can use email)
- password
- membership-status
- ~~list of messages?~~

Users create messages with:

- title
- timestamp
- text
- author id? `<- moze tu` - wystarczy wyszukac wszystkie wiadomosci

# Validation Chain API

validation chain is a middleware and it SHOULD be passed to an Express route handler.

## Sanitization Chain API

```js
app.post('/create-user', [
  // normalizeEmail() and toDate() are sanitizers, also available in the Sanitization Chain
  check('email').normalizeEmail().isEmail(),
  check('date-of-birth').isISO8601().toDate(),
]);
```

## Additional methods:

### `.bail()`

- Stops running validations if any of the previous ones have failed. Useful to prevent a custom validator that touches a database or external API from running when you know it will fail.

```js
app.post('/', [
  check('username')
    .isEmail()
    .bail()
    // If username is not an email, checkBlacklistedDomain will never run
    .custom(checkBlacklistedDomain)
    .bail()
    // If username is not an email or has a blacklisted domain, checkEmailExists will never run
    .custom(checkEmailExists);
]);
```

### `.custom(validator)`

`validator(value, { req, location, path })`
The custom validator may return a promise to indicate an async validation task.

```js
app.post(
  '/create-user',
  check('password').exists(),
  check(
    'passwordConfirmation',
    'passwordConfirmation field must have the same value as the password field'
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  loginHandler
);
```
