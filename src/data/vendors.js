const vendors = [
 {
 id: 'Stall-1',
 name: 'Western Expert Chef',
 location: 'Mahallah Faruq, Block A',
 openHours: '6:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'menu-1', name: 'Spaghetti Carbonara', description: 'Noodle with white creamy sauce', price: 3.0, category: 'Noodle',
available: true },
 { id: 'menu-2', name: 'Meatball', description: 'Meatball with sauce', price: 2, category:
'Side Dish', available: false },
 { id: 'menu-3', name: 'Mango Yogurt', description: 'Water that contains mango and yogurt, ice too', price: 2.5, category:
'Drinks', available: true },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors