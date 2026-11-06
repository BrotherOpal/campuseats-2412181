import { useSearchParams } from 'react-router'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedCategory = searchParams.get('cat') || 'All'

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  const categories = [
    'All',
    ...new Set(items.map((item) => item.category).filter(Boolean))
  ]

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory)

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams)

              if (category === 'All') {
                newParams.delete('cat')
              } else {
                newParams.set('cat', category)
              }

              setSearchParams(newParams)
            }}
            style={{ width: 'auto', padding: '0.5rem 1.25rem', flex: 'initial' }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}

export default MenuList