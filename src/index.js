const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Sincronizar base de datos y arrancar servidor
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }).then(async () => {
  // Insertar datos iniciales
  const Category = require('./models/Category');
  await Category.bulkCreate([
    { name: 'Ropa' },
    { name: 'Calzado' },
  ]);

  const Product = require('./models/Product');
  await Product.bulkCreate([
    {
      name: 'Camiseta Básica',
      price: 20,
      category: 'Ropa',
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSSOOSo2q49SXH1O8eam56beZgei5fJAFB8yuQOoqmdnFUQ1Kc-efIOtKiHzJQxdZ1Vf6O6oCc4y9egIDRKGDLW4Ngi3jtpRSaZTqYNbV9lmM20ZpcAb_4jYQ&usqp=CAc',
      description: 'Camiseta de algodón 100% cómoda y ligera.',
    },
    {
      name: 'Pantalones Vaqueros',
      price: 40,
      category: 'Ropa',
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT5r4Vl_UVDXpndvAnofD0hv6xY0va2m1qO0OdRQOyrt-y6A8B2pKvVhf48N3Ngg9OoYqXhtBNVhUCi2sjzjs6MvMCAl-n0eQlTIvAdy05GCL8-gTSvyjYh&usqp=CAc',
      description: 'Pantalones vaqueros de corte ajustado.',
    },
    {
      name: 'Zapatillas Deportivas',
      price: 60,
      category: 'Calzado',
      image: 'https://images-cdn.ubuy.com.co/648e853569a3882430156fc6-zapatos-de-hombre-zapatillas-deportivas.jpg',
      description: 'Zapatillas ideales para running y uso casual.',
    },
  ]);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
});