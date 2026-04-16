import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { initializeSchema } from './schema';

dotenv.config();

const DB_PATH = process.env.DATABASE_PATH || './travelvista.db';
const absolutePath = path.resolve(DB_PATH);

const db = new Database(absolutePath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

initializeSchema(db);

console.log('🌱 Seeding database...\n');

// Clear existing data
db.exec('DELETE FROM favorites');
db.exec('DELETE FROM reviews');
db.exec('DELETE FROM places');
db.exec('DELETE FROM users');

// ========== USERS ==========
const adminId = uuid();
const userId = uuid();
const user2Id = uuid();

const hashedPassword = bcrypt.hashSync('password123', 12);

const insertUser = db.prepare('INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)');
insertUser.run(adminId, 'Admin User', 'admin@travelvista.com', hashedPassword, 'admin');
insertUser.run(userId, 'Sarah Johnson', 'sarah@example.com', hashedPassword, 'user');
insertUser.run(user2Id, 'Marco Rossi', 'marco@example.com', hashedPassword, 'user');

console.log('✅ Users seeded');

// ========== PLACES ==========
const places = [
  {
    id: uuid(),
    name: 'Santorini Sunset Point',
    description: 'Watch the world-famous sunset from the caldera cliffs of Oia. The whitewashed buildings against the deep blue Aegean Sea create a breathtaking panorama that has captivated travelers for centuries. The golden hour transforms the entire village into a living painting.',
    city: 'Santorini',
    country: 'Greece',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Romantic', 'Photography']),
    latitude: 36.4618,
    longitude: 25.3753,
  },
  {
    id: uuid(),
    name: 'Machu Picchu',
    description: 'The ancient Incan citadel set high in the Andes Mountains, above the Sacred Valley. This 15th-century masterpiece is a testament to the incredible engineering of the Inca civilization. The misty mountains surrounding the ruins create an otherworldly atmosphere.',
    city: 'Cusco',
    country: 'Peru',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1587595431973-160d0d163571?w=800',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Adventure', 'Historical']),
    latitude: -13.1631,
    longitude: -72.5450,
  },
  {
    id: uuid(),
    name: 'Swiss Alps Panorama',
    description: 'Experience the majestic beauty of the Swiss Alps from Jungfraujoch, the Top of Europe. Snow-capped peaks stretching as far as the eye can see, crystal-clear mountain lakes, and alpine meadows create a paradise for nature lovers and photographers alike.',
    city: 'Interlaken',
    country: 'Switzerland',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Adventure', 'Nature']),
    latitude: 46.5370,
    longitude: 7.9625,
  },
  {
    id: uuid(),
    name: 'Bali Tegallalang Rice Terraces',
    description: 'The stunning emerald rice terraces of Tegallalang showcase the traditional Balinese cooperative water management system known as subak. Walk among the cascading green steps and immerse yourself in the tranquil beauty of Bali\'s heartland.',
    city: 'Ubud',
    country: 'Indonesia',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Nature', 'Cultural']),
    latitude: -8.4312,
    longitude: 115.2792,
  },
  {
    id: uuid(),
    name: 'Le Jules Verne',
    description: 'Dine 125 meters above Paris at this Michelin-starred restaurant inside the Eiffel Tower. Chef Frédéric Anton\'s refined French cuisine is matched only by the spectacular panoramic views of the City of Light stretching to the horizon.',
    city: 'Paris',
    country: 'France',
    category: 'Restaurant',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Romantic', 'Fine Dining']),
    latitude: 48.8584,
    longitude: 2.2945,
  },
  {
    id: uuid(),
    name: 'Rooftop Bar NYC - Westlight',
    description: 'Perched on the 22nd floor of The William Vale in Williamsburg, Westlight offers 360-degree views of the Manhattan skyline, Brooklyn, and beyond. Craft cocktails and small plates complement the jaw-dropping urban panorama.',
    city: 'New York',
    country: 'United States',
    category: 'Restaurant',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Nightlife', 'Urban']),
    latitude: 40.7160,
    longitude: -73.9610,
  },
  {
    id: uuid(),
    name: 'Sushi Saito',
    description: 'Hidden in the basement of a Tokyo office building, this intimate 8-seat omakase counter is considered one of the finest sushi experiences on Earth. Chef Takashi Saito\'s masterful technique transforms the freshest fish into edible art.',
    city: 'Tokyo',
    country: 'Japan',
    category: 'Restaurant',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
    ]),
    tags: JSON.stringify(['Fine Dining', 'Cultural', 'Exclusive']),
    latitude: 35.6595,
    longitude: 139.7292,
  },
  {
    id: uuid(),
    name: 'La Terrazza del Chiostro',
    description: 'Enjoy authentic Roman cuisine on this enchanting rooftop terrace overlooking the Colosseum. As the sun sets, the ancient amphitheater glows golden while you savor handmade pasta and local wines.',
    city: 'Rome',
    country: 'Italy',
    category: 'Restaurant',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Romantic', 'Budget Friendly']),
    latitude: 41.8902,
    longitude: 12.4922,
  },
  {
    id: uuid(),
    name: 'Soneva Fushi Resort',
    description: 'An ultra-luxury barefoot resort nestled in the Baa Atoll UNESCO Biosphere Reserve. Private villa living surrounded by pristine beaches, turquoise lagoons, and lush tropical vegetation. Features an open-air cinema and observatory.',
    city: 'Baa Atoll',
    country: 'Maldives',
    category: 'Hotel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Romantic', 'Luxury']),
    latitude: 5.1101,
    longitude: 73.0708,
  },
  {
    id: uuid(),
    name: 'Burj Al Arab',
    description: 'The iconic sail-shaped luxury hotel on its own artificial island in Dubai. Every suite is a duplex with floor-to-ceiling windows offering stunning views of the Arabian Gulf. The epitome of opulence and architectural wonder.',
    city: 'Dubai',
    country: 'United Arab Emirates',
    category: 'Hotel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Luxury', 'Iconic']),
    latitude: 25.1412,
    longitude: 55.1852,
  },
  {
    id: uuid(),
    name: 'Hotel & Ryokan Nara',
    description: 'A stunning blend of traditional Japanese ryokan hospitality and modern luxury, set amidst ancient temples and sacred deer parks. Wake up to misty mountain views and soak in outdoor onsen baths surrounded by cherry blossoms.',
    city: 'Nara',
    country: 'Japan',
    category: 'Hotel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d8f9a8fec?w=800',
    ]),
    tags: JSON.stringify(['Cultural', 'Nature', 'Relaxation']),
    latitude: 34.6851,
    longitude: 135.8048,
  },
  {
    id: uuid(),
    name: 'Amalfi Coast Drive',
    description: 'Wind along the dramatic cliffside road of the Amalfi Coast, where pastel-colored villages cling to steep mountainsides above the sparkling Mediterranean. Stop at Positano, Ravello, and Amalfi for the most stunning viewpoints.',
    city: 'Amalfi',
    country: 'Italy',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Romantic', 'Photography']),
    latitude: 40.6340,
    longitude: 14.6027,
  },
  {
    id: uuid(),
    name: 'Northern Lights Lodge',
    description: 'Glass-roofed cabins in the Finnish wilderness designed for the ultimate aurora borealis viewing experience. Fall asleep watching the Northern Lights dance across the Arctic sky from the comfort of your warm bed.',
    city: 'Saariselkä',
    country: 'Finland',
    category: 'Hotel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Adventure', 'Nature', 'Romantic']),
    latitude: 68.4100,
    longitude: 27.4140,
  },
  {
    id: uuid(),
    name: 'Cape Town Table Mountain',
    description: 'Take the revolving cable car to the summit of Table Mountain for a 360-degree panorama of Cape Town, the Atlantic Ocean, and Robben Island. One of the New7Wonders of Nature, the flat-topped mountain offers trails and viewpoints that are simply unmatched.',
    city: 'Cape Town',
    country: 'South Africa',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
      'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=800',
    ]),
    tags: JSON.stringify(['Best View', 'Adventure', 'Nature', 'Family Friendly']),
    latitude: -33.9628,
    longitude: 18.4098,
  },
  {
    id: uuid(),
    name: 'Treehouse Lodge Peru',
    description: 'Sleep high in the Amazon rainforest canopy in these unique treehouse accommodations. Wake to the sounds of howler monkeys and exotic birds, with views stretching across the endless green expanse of the world\'s largest tropical rainforest.',
    city: 'Iquitos',
    country: 'Peru',
    category: 'Hotel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    ]),
    tags: JSON.stringify(['Adventure', 'Nature', 'Budget Friendly']),
    latitude: -3.7437,
    longitude: -73.2516,
  },
  {
    id: uuid(),
    name: 'Petra — The Rose City',
    description: 'Carved into rose-red cliffs over 2,000 years ago by the Nabataeans, Petra is one of the world\'s most extraordinary archaeological sites. Walk through the narrow Siq canyon to reveal the Treasury\'s magnificent facade — a moment that takes your breath away.',
    city: 'Wadi Musa',
    country: 'Jordan',
    category: 'Tourist Spot',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800',
      'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800',
    ]),
    tags: JSON.stringify(['Historical', 'Adventure', 'Photography']),
    latitude: 30.3285,
    longitude: 35.4444,
  },
];

const insertPlace = db.prepare(`
  INSERT INTO places (id, name, description, city, country, category, images, tags, latitude, longitude)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const place of places) {
  insertPlace.run(
    place.id, place.name, place.description, place.city, place.country,
    place.category, place.images, place.tags, place.latitude, place.longitude
  );
}

console.log(`✅ ${places.length} places seeded`);

// ========== REVIEWS ==========
const reviewData = [
  { placeIndex: 0, userId, comment: 'Absolutely magical sunset! The colors were unreal. One of the best experiences of my life.', rating: 5 },
  { placeIndex: 0, userId: user2Id, comment: 'Crowded but worth it. Get there early for the best spots. The view from Oia castle is unbeatable.', rating: 4 },
  { placeIndex: 1, userId, comment: 'A bucket list destination that exceeds expectations. The hike is tough but the reward is immeasurable.', rating: 5 },
  { placeIndex: 2, userId: user2Id, comment: 'Breathtaking alpine scenery. The Jungfraujoch railway is an engineering marvel with views to match.', rating: 5 },
  { placeIndex: 3, userId, comment: 'So peaceful and green! The rice terraces are a work of art. Loved the jungle swing too.', rating: 4 },
  { placeIndex: 4, userId: user2Id, comment: "Dining in the Eiffel Tower is a once-in-a-lifetime experience. The food matches the view — perfection.", rating: 5 },
  { placeIndex: 5, userId, comment: 'The Manhattan skyline at sunset from this rooftop is absolutely insane. Great cocktails too!', rating: 5 },
  { placeIndex: 8, userId, comment: 'Paradise on Earth. The overwater villa was surreal. Waking up to turquoise water is something else.', rating: 5 },
  { placeIndex: 8, userId: user2Id, comment: 'Worth every penny. The most beautiful place I have ever visited. The snorkeling is world-class.', rating: 5 },
  { placeIndex: 9, userId, comment: 'The architecture is jaw-dropping. The royal suite is next level luxury. A must-see landmark.', rating: 4 },
  { placeIndex: 11, userId: user2Id, comment: 'Every twist and turn reveals another postcard-perfect view. Positano stole my heart.', rating: 5 },
  { placeIndex: 12, userId, comment: 'We saw the Northern Lights 3 out of 4 nights! The glass igloo was warm and the view — no words.', rating: 5 },
  { placeIndex: 13, userId: user2Id, comment: 'The cable car ride alone is worth the trip. Cape Town from above is stunning.', rating: 4 },
];

const insertReview = db.prepare(`
  INSERT INTO reviews (id, comment, rating, user_id, place_id) VALUES (?, ?, ?, ?, ?)
`);

for (const review of reviewData) {
  insertReview.run(uuid(), review.comment, review.rating, review.userId, places[review.placeIndex].id);
}

console.log(`✅ ${reviewData.length} reviews seeded`);

// Update place ratings
const updateRating = db.prepare(`
  UPDATE places SET rating = (
    SELECT ROUND(AVG(rating), 1) FROM reviews WHERE place_id = places.id
  ) WHERE id IN (SELECT DISTINCT place_id FROM reviews)
`);
updateRating.run();

console.log('✅ Place ratings updated');

// ========== FAVORITES ==========
const insertFav = db.prepare('INSERT INTO favorites (id, user_id, place_id) VALUES (?, ?, ?)');
insertFav.run(uuid(), userId, places[0].id);
insertFav.run(uuid(), userId, places[4].id);
insertFav.run(uuid(), userId, places[8].id);
insertFav.run(uuid(), userId, places[12].id);
insertFav.run(uuid(), user2Id, places[1].id);
insertFav.run(uuid(), user2Id, places[5].id);
insertFav.run(uuid(), user2Id, places[11].id);

console.log('✅ Favorites seeded');

console.log('\n🎉 Database seeded successfully!\n');
console.log('Test accounts:');
console.log('  Admin: admin@travelvista.com / password123');
console.log('  User:  sarah@example.com / password123');
console.log('  User:  marco@example.com / password123');

db.close();
