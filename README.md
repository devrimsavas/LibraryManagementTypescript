# Library Management

This is ongoing express- typescript project. A combination of typescript ,postgresql.

# Install and Initialize Typescript

# Install Node, Express

In the root directory, run the following commands to install all the required dependencies:

### Step 1: Install Core Modules

in Typescript install main package and type definitions (if necessary)

```bash
npm install <package-name>
npm install --save-dev @types/<package-name>
```

```bash
npm install express pg pg-hstore sequelize dotenv
```

### Step 2: Install Development Dependencies (TypeScript and Type Definitions)

```bash
npm install --save-dev typescript @types/express @types/node
```

This will install:

- typescript: For TypeScript support.
- @types/express: TypeScript definitions for Express.
- @types/node: TypeScript definitions for Node.js.
- Once these steps are complete, you're ready to start the project.

### Step 3: Install Bcrypt and jsonwebtoken

```bash
npm install jsonwebtoken bcrypt
```

## Tables and Relationship

### Explanation:

### 1- Book Table: This stores information about each book.

### 2- Genre Table: This stores the different genres.

### 3- Client Table: Stores client information, including penalties.

### 4- Library Table: Stores library information (it owns books and clients).

## Relationships:

- Book-Genre Relationship (Many-to-Many):
  The BookGenre table represents the many-to-many relationship between books and genres. A book can have many genres, and a genre can belong to many books.

- Client-Book Relationship (Many-to-Many):
  The ClientBook table represents the many-to-many relationship between clients and books. A client can borrow many books, and a book can be borrowed by many clients.

- Library-Book Relationship (One-to-Many):
  The LibraryBook table represents the one-to-many relationship between libraries and books. A library can hold many books.

- Library-Client Relationship (One-to-Many):
  The LibraryClient table represents the one-to-many relationship between libraries and clients. A library can serve many clients.
