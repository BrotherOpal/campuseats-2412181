import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // B2: Fetch vendors with AbortController
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // B3: Total quantity computed with reduce
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  // B3: Cart management handlers
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            const newQty = line.qty + delta
            return newQty > 0 ? { ...line, qty: newQty } : null
          }
          return line
        })
        .filter(Boolean)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // Add item to cart (or increase quantity if it's already there)
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  // B5: Handle place order
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Find the currently selected vendor object
  const currentVendor = vendors.find((v) => v.id === selectedVendorId)

  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done' && lastOrder) {
    content = (
      <div className="card">
        <h2>Order Placed!</h2>
        <p><strong>Name:</strong> {lastOrder.name}</p>
        <p><strong>Mahallah:</strong> {lastOrder.mahallah}</p>
        <p><strong>Pickup Time:</strong> {lastOrder.pickupTime}</p>
        <p><strong>Total:</strong> RM {lastOrder.total.toFixed(2)}</p>
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to Menus
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else {
    content = (
      <>
        <h2>Vendors</h2>
        <div className="vendor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={vendor.id === selectedVendorId}
              onSelect={setSelectedVendorId}
            />
          ))}
        </div>

        <h2>Menu</h2>
        {currentVendor ? (
          <MenuList items={currentVendor.menu} onAdd={handleAddToCart} />
        ) : (
          <p className="muted">Please select a vendor.</p>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <footer style={{ textAlign: 'center', padding: '2rem 0', color: '#666' }}>
        <small>©2026 CampusEats BICS 3301, IIUM</small>
      </footer>
    </>
  )
}

export default App