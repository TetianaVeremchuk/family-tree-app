# Family Tree Management Application

[**DEMO**](https://tetianaveremchuk.github.io/family-tree-app/)

## Overview
This application allows users to manage a family tree by adding, updating, and deleting members. The tree is displayed as a nested accordion menu, showing parent-child relationships visually. The backend is built using Node.js, Sequelize, and MySQL, while the frontend is powered by React, Redux, and TypeScript.

## Features
- Add Member: Add a new family member. During member creation, you can specify the parent's name to add the new member as a child. If no parent is specified, the member is added to the root level.
- Autocomplete Parent Name: The input field for specifying a parent supports autocomplete, suggesting parent names dynamically.
- Auto-expansion: When a new member is added, the tree automatically expands to show the added member.
- Update Member: Edit the details (name or age) of an existing family member.
- Delete Member: Remove a family member from the tree.
- Nested Tree View: The family tree is rendered as a hierarchical structure with nested levels that can be expanded or collapsed.
- State Management: Redux is used to handle the application's state.
## Installation

### Backend
1. Install dependencies:
   `npm install`

2. Set up the database (MySQL):
   Configure your database credentials in `.env`:
   - `DB_NAME=family_tree`
   - `DB_USER=root`
   - `DB_PASSWORD=8765321`
   - `DB_HOST=localhost`
   - `DB_PORT=3306`

3. Build the backend:
   `npm run build`

4. Start the backend server:
   `npm start`

The server will run on http://localhost:5000.

### Frontend
1. Navigate to the frontend directory:
   `cd frontend`

2. Install dependencies:
   `npm install`

3. Start the frontend development server:
   `npm start`

### Webpack
- Webpack is used to bundle the frontend files for production.
- Build the production files: `npm run build`
- The bundled files will be output to the `dist` directory.

## Usage
1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Use the "Add Member" button to create a new family member.
3. Click "Update" to edit a member's details or "Delete" to remove them.
4. Parent-child relationships are managed through the Parent ID field during member creation.

## Technologies

### Frontend
- React
- Redux
- Redux-Saga
- TypeScript
- SCSS
- Webpack

### Backend
- Node.js
- Express
- Sequelize
- MySQL

## API Endpoints

### GET /api/members
Retrieves the entire family tree in a nested format.

### POST /api/members
Adds a new family member. Example request body:

```json
{
  "name": "John",
  "age": 35,
  "parentId": 1
}
```

### PUT /api/members/:id
Updates an existing family member. Example request body:

```json
{
  "name": "Jane Doe",
  "age": 30
}
```

### DELETE /api/members/:id
Deletes a family member by ID.

---

## Known Issues
- Ensure unique IDs for all members to prevent conflicts.
- Parent-child relationships must be correctly maintained in the database for the tree view to render properly.

---

## Future Enhancements
- Add search functionality to find specific members quickly.
- Provide drag-and-drop functionality for rearranging members in the tree.

