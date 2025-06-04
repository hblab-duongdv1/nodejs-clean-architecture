# Node.js Clean Architecture Project

This project demonstrates a Node.js application built with TypeScript, Express, MySQL, and TypeORM following Clean Architecture principles.

## Project Structure

```
src/
├── domain/           # Enterprise business rules
│   ├── entities/     # Business objects
│   └── repositories/ # Repository interfaces
├── application/      # Application business rules
│   └── use-cases/   # Use cases implementation
└── infrastructure/   # Frameworks and drivers
    ├── controllers/ # Controllers
    ├── database/    # Database configuration
    ├── repositories/# Repository implementations
    └── routes/      # Route definitions
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd node-mysql-clean-architecture
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=clean_architecture_db
DB_SYNCHRONIZE=true
DB_LOGGING=true
```

4. Create the database:
```sql
CREATE DATABASE clean_architecture_db;
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```

### Orders

- `POST /api/orders` - Create a new order
  ```json
  {
    "userId": 1,
    "items": [
      {
        "productName": "Product 1",
        "quantity": 2,
        "price": 10.99
      },
      {
        "productName": "Product 2",
        "quantity": 1,
        "price": 24.99
      }
    ]
  }
  ```

- `PATCH /api/orders/:id/status` - Update order status
  ```json
  {
    "status": "processing"
  }
  ```
  Available statuses: "pending", "processing", "completed", "cancelled"

## Database Migrations

Generate a migration:
```bash
npm run migration:generate
```

Run migrations:
```bash
npm run migration:run
```

Revert last migration:
```bash
npm run migration:revert
```

## Clean Architecture Principles

This project follows Clean Architecture principles:

1. **Independence of Frameworks**: The core business logic is independent of any external frameworks.
2. **Testability**: Business rules can be tested without UI, database, or any external element.
3. **Independence of UI**: The UI can change without changing the rest of the system.
4. **Independence of Database**: The database can be changed without affecting the business rules.
5. **Independence of any external agency**: The business rules don't know anything about the outside world.

## Project Layers

1. **Domain Layer**: Contains enterprise business rules and entities.
2. **Application Layer**: Contains application business rules and use cases.
3. **Infrastructure Layer**: Contains frameworks, tools, and external interfaces.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 