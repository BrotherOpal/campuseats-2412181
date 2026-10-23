import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  // 1. Extract unique categories from items, adding 'All' as the first option
  const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))]

  // 2. Filter items according to the selected category
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory)

  return (
    <div>
      {/* 3. Render category filter buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            style={{ width: 'auto', padding: '0.5rem 1.25rem', flex: 'initial' }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 4. Display the filtered items using MenuItemCard */}
      <div className="grid">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}

export default MenuList