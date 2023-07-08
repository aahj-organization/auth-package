# @aahj-organization/auth

@aahj-organization/auth is a simple to use, and thoroughly implemented LOGIN, FORGOT and RESET PASSWORD functionality

## Table of contents
- [Installing](#installing)
- [Usage Examples](#usage-examples)
- [Changelogs](#changelog)
- [License](#license)

## Installing
```sh
npm install @aahj-organization/auth
```

## Usage examples
Login
```sh
const Auth = require('@aahj-organization/auth');
const loginresponse = await Auth.login(email, password, UserModel);
```
Forgot Password
```sh
const Auth = require('@aahj-organization/auth');
const loginresponse = await Auth.forgotPassword(email, url, UserModel);
```
Reset Password
```sh
const Auth = require('@aahj-organization/auth');
const loginresponse = await Auth.resetPassword(password, confirmPassword, token, UserModel);
```

## Changelog
We're using the GitHub [standard-version](https://github.com/aahj-organization/auth-package/blob/master/CHANGELOG.md) for changelog entries.

## License
aahj-organization
