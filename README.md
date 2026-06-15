# use-array-state

A professional React hook to handle array states with built-in operations like move, insert, and update.

## Installation

```bash
npm install @your-scope/use-array-state
```

## Usage

```typescript
import { useArrayState } from '@your-scope/use-array-state';

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