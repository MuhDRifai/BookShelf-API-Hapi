```markdown
# Bookshelf API

Bookshelf API is a simple API built using the Hapi framework for managing a collection of books. It allows users to perform CRUD operations on books, including adding, updating, retrieving, and deleting books.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add a new book
- Retrieve a list of books with optional filters
- Retrieve details of a specific book
- Update information of an existing book
- Delete a book from the collection

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- Postman installed (for testing)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookshelf-api.git
   cd bookshelf-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run start-dev
   ```

The API server will be running on `http://localhost:9000`.

## Usage

### Postman Collection

Import the provided Postman collection and environment files to test the API. Follow these steps:

1. Open Postman.
2. Click the "Import" button in the top-left corner.
3. Select "Upload Files" and choose the Bookshelf API Test Collection and Environment files.
4. The collection and environment will now be available in your Postman workspace.

## API Endpoints

### 1. Add a new book

- **Endpoint:** `POST /books`
- **Request Payload:**

  ```json
  {
    "name": "The Great Gatsby",
    "year": 1925,
    "author": "F. Scott Fitzgerald",
    "summary": "A classic novel about the American Dream.",
    "publisher": "Charles Scribner's Sons",
    "pageCount": 180,
    "readPage": 120,
    "reading": true
  }
  ```

### 2. Retrieve a list of books

- **Endpoint:** `GET /books`
- **Query Parameters:**
  - `name` (optional): Filter books by name.
  - `reading` (optional): Filter books by reading status (1 for true, 0 for false).
  - `finished` (optional): Filter books by finished status (1 for true, 0 for false).

### 3. Retrieve details of a specific book

- **Endpoint:** `GET /books/{bookId}`

### 4. Update information of an existing book

- **Endpoint:** `PUT /books/{bookId}`
- **Request Payload:**

  ```json
  {
    "name": "Updated Title",
    "year": 2023,
    "author": "New Author",
    "summary": "Updated summary.",
    "publisher": "New Publisher",
    "pageCount": 200,
    "readPage": 150,
    "reading": false
  }
  ```

### 5. Delete a book

- **Endpoint:** `DELETE /books/{bookId}`

## Testing

To run tests, use the provided Postman collection and environment. Ensure the server is running before running the tests.

## Contributing

If you'd like to contribute to this project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [ISC License](LICENSE).
```