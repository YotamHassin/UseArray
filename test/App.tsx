import { useArrayState } from 'use-array-ux';
//import { useArrayState } from '../dist/index';

function App() {
  const { items, addNewItem, deleteItem, moveDirection, updateItem } = useArrayState<string>(['React', 'Vite', 'TypeScript']);

  const itemsListMarkup = <>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            borderRadius: '4px' 
          }}>
            <span style={{ flexGrow: 1 }}>{item}</span>
            <button onClick={() => updateItem(item + '!', index)}>✏️ Edit</button>
            <button onClick={() => moveDirection(index, 'Backward')}>🔼</button>
            <button onClick={() => moveDirection(index, 'Forward')}>🔽</button>
            <button onClick={() => deleteItem(index)} style={{ color: 'red' }}>🗑️ Delete</button>
          </li>
        ))}
      </ul>

  </>

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🧪 use-array-ux Sandbox</h1>
      <hr />

      {/* Add Item */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => addNewItem(prompt('New item:') || 'New Item')}>➕ Add Item</button>
      </div>
      
      {/* Raw State */}
      {itemsListMarkup}

      {/* Raw State */}
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>
        Raw State: {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}

export default App;