const mongoose = require('mongoose');
const User = require('../models/User');
const WasteCollection = require('../models/WasteCollection');
const Schedule = require('../models/Schedule');
const DisposalSite = require('../models/DisposalSite');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await WasteCollection.deleteMany({});
    await Schedule.deleteMany({});
    await DisposalSite.deleteMany({});

    // Create users
    const users = await User.create([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@mazuri.com',
        password: 'password123',
        phone: '1234567890',
        role: 'admin',
        department: 'admin',
        location: 'Main Office'
      },
      {
        firstName: 'John',
        lastName: 'Collector',
        email: 'john@mazuri.com',
        password: 'password123',
        phone: '1234567891',
        role: 'collector',
        department: 'collection',
        location: 'Zone A'
      },
      {
        firstName: 'Jane',
        lastName: 'Supervisor',
        email: 'jane@mazuri.com',
        password: 'password123',
        phone: '1234567892',
        role: 'supervisor',
        department: 'collection',
        location: 'Zone B'
      },
      {
        firstName: 'Michael',
        lastName: 'Manager',
        email: 'manager@mazuri.com',
        password: 'password123',
        phone: '1234567893',
        role: 'manager',
        department: 'admin',
        location: 'Main Office'
      }
    ]);

    console.log('Users seeded:', users.length);

    // Create waste collections
    const collections = await WasteCollection.create([
      {
        collectionId: 'COL-001',
        source: 'residential',
        wasteType: 'mixed',
        quantity: { value: 150, unit: 'kg' },
        collectionDate: new Date(),
        vehicle: 'VH-001',
        location: {
          type: 'Point',
          coordinates: [0, -1],
          address: '123 Main St, City',
          ward: 'Ward A'
        },
        collector: users[1]._id,
        status: 'completed'
      },
      {
        collectionId: 'COL-002',
        source: 'commercial',
        wasteType: 'plastic',
        quantity: { value: 200, unit: 'kg' },
        collectionDate: new Date(),
        vehicle: 'VH-002',
        location: {
          type: 'Point',
          coordinates: [1, -2],
          address: '456 Business Ave, City',
          ward: 'Ward B'
        },
        collector: users[1]._id,
        status: 'completed'
      }
    ]);

    console.log('Collections seeded:', collections.length);

    // Create disposal sites
    const sites = await DisposalSite.create([
      {
        siteId: 'SITE-001',
        name: 'Central Landfill',
        siteType: 'landfill',
        location: {
          type: 'Point',
          coordinates: [2, -3],
          address: 'Outskirts, City'
        },
        capacity: {
          total: { value: 1000, unit: 'tons' },
          current: { value: 500, unit: 'tons' }
        },
        operatingHours: {
          opening: '06:00',
          closing: '18:00'
        },
        acceptedWasteTypes: ['organic', 'plastic', 'metal', 'paper', 'glass', 'mixed'],
        manager: users[2]._id,
        status: 'active'
      }
    ]);

    console.log('Disposal sites seeded:', sites.length);

    // Create schedules
    const schedules = await Schedule.create([
      {
        scheduleId: 'SCH-001',
        title: 'Zone A Daily Collection',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignedVehicle: 'VH-001',
        assignedCollectors: [users[1]._id],
        supervisor: users[2]._id,
        frequency: 'daily',
        estimatedDuration: { value: 4, unit: 'hours' },
        expectedQuantity: { value: 500, unit: 'kg' },
        status: 'scheduled'
      }
    ]);

    console.log('Schedules seeded:', schedules.length);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
