# use-array-ux

A professional React hook to handle array states with built-in operations like move, insert, and update.

## Installation

```bash
npm install use-array-ux
```

## Usage

```typescript
import { useArrayState } from 'use-array-ux';

const MyComponent = () => {
  const { items, addNewItem, moveDirection } = useArrayState<string>(['Apple', 'Banana']);

  return (
    <div>
      {items.map((item, index) => (
        <div key={item}>
          {item} <button onClick={() => moveDirection(index, 'Forward')}>Down</button>
        </div>
      ))}
      <button onClick={() => addNewItem('Orange')}>Add Orange</button>
    </div>
  );
};
```