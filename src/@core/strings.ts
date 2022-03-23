export enum Exceptions {
    noRole = 'No such role',
    noUser = 'No such user',
    emailInUse = 'This email is already in use',
    usernameInUse = 'This username is already in use',
    invEmailOrPassword = 'Invalid email or password',
    invUsernameOrPassword = 'Invalid username or password',
    userUnauthorized = 'Unauthorized user',
    fieldsMustBeProvided = 'Email or username and password must be provided',
    userExists = 'User with this email or username is already exists',
}

export enum Messages {
    userDeleted = 'user has been deleted',
    passCorrectUsername = 'Pass correct username',
    noAccess = 'No access',
    banned = ' banned beacuse of the reason: ',
    beAString = 'value must be a string',
    beANumber = 'value must be a number',
    beBoolean = 'value must be boolean',
    reqPasswordLength = 'password length must be min 4 and max 30 characters',
    reqUsenameLength = 'username length must be min 3 and max 20 characters',
    incorrectEmail = 'incorrect email',
    success = 'success',
    fail = "fail",
}
