# Book Management Application

A simple NodeJS application that provides REST v1s to manage a book store or a library.

## Features

1. Multiple User Roles
   - Manager
   - Member
2. List of all the books
   - With filter support for available books, price, categories
3. Details of a specific book
4. Edit book details
   - mark book as expired
   - update the available copies of the book
5. Add new books
6. Borrow/Return a book

## Routes

- Static Router
  - `GET /v1/public/:resource`

- Authentication Router
  - `POST /v1/user/login`
  - `GET /v1/user/logout`

- User Router
  - `GET /v1/user/:id`
  - `POST /v1/user`
  - `GET /v1/user/books`

- Books Router
  - `GET /v1/book`
  - `POST /v1/book`
  - `GET /v1/book/:id`
  - `PATCH /v1/book/:id`
  - `DELETE /v1/book/:id`

## Authentication

- Using Passport.js
#   A 2  
 