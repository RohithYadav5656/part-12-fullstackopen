import { HttpException } from "./HttpException";

export const DuplicateUserError = new HttpException(409, "A user with the specified username already exists")
export const InvalidLoginCredentialsError = new HttpException(401, "Invalid username or password")
export const UnauthorizedError = new HttpException(401, "You must provide a JWT-login token with the Authorization-header")
export const NoProjectFoundError = new HttpException(404, "A project with the specified ID was not found")
export const MissingPermissionsToProjectError = new HttpException(403, "You don't have permissions to access to specified project")
export const LogInAgainError = new HttpException(401, "You most log in again")
export const NoItemFoundError = new HttpException(404, "An item with the specified ID was not found")
export const MissingPermissionsToItemError = new HttpException(403, "You don't have permissions to access to specified item")
