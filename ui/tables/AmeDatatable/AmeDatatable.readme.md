## DataTable React Component
The DataTable component is a reusable React component designed to display tabular data efficiently. It offers various features to enhance the user experience and simplify data manipulation.

### Key Features
- Data Display: The component takes in data as an array of objects and renders it in a table format. Each object represents a row, and keys of the objects represent columns.
- Column Configuration: Allows custom configuration of columns, including setting column headers, defining data types, and specifying custom render functions for cells.
- Sorting (TBD): Enables sorting of data by clicking on column headers. Sorting can be configured for ascending or descending order and can be customized per column.
- Filtering (TBD): Supports filtering of data based on column values. Provides a search box for global filtering and can be extended to include column-specific filters.
- Pagination (TBD): Implements pagination to handle large datasets efficiently. Users can navigate through pages, and the number of rows per page can be adjusted.
- Styling and Customization (TBD): Offers basic styling out-of-the-box and allows for custom styling through className props or custom CSS.
- Responsive Design (TBD): Ensures the table is fully responsive and works well on different screen sizes.
- Selection (TBD): Includes row selection functionality with checkboxes, allowing users to select one or multiple rows.

> TBD: Means "not yet done" but "to be done or planned for"

### Props
- data (array): The array of data objects to be displayed in the table.
- columns (array): Configuration array for columns, where each column can have the following properties:

### Usage example
```tsx
import React from 'react';
import DataTable from './DataTable';

const data = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 34, city: 'San Francisco' },
  // More data...
];

const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age', sortable: true },
  { header: 'City', accessor: 'city' },
];

function App() {
  return (
      <DataTable data={data} columns={columns} />
  );
}

export default App;
```