-- Seed Categories
INSERT INTO categories (id, name, status) VALUES
(1, 'Electronics', 'ACTIVE'),
(2, 'Clothing', 'ACTIVE'),
(3, 'Books', 'INACTIVE');

-- Seed Vendors
INSERT INTO vendors (id, name, address, phoneNumber, avatarURL) VALUES
(1, 'Vendor A', '123 Vendor St.', '1234567890', 'http://example.com/avatarA.png'),
(2, 'Vendor B', '456 Vendor Rd.', '0987654321', 'http://example.com/avatarB.png');

-- Seed Products
INSERT INTO products (id, name, price, vendorId, categoryId) VALUES
(1, 'Smartphone', 299, 1, 1),
(2, 'T-Shirt', 19, 2, 2),
(3, 'Laptop', 999, 1, 1);

-- Seed Orders
INSERT INTO orders (id, vendorId, status, deliveryPrice, tax, servicesPrice) VALUES
(1, 1, 'PAID', 10, 5, 15),
(2, 2, 'IN_PROGRESS', 5, 2, 3);

-- Seed Order Items
INSERT INTO `order-items` (id, orderId, productId, price) VALUES
(1, 1, 1, 299),
(2, 1, 3, 999),
(3, 2, 2, 19);

-- Seed Feedbacks
INSERT INTO feedbacks (id, feedBackableType, feedBackableId, rate, comment, userId) VALUES
(1, 'PRODUCT', 1, 5, 'Great product!', 1),
(2, 'ORDER', 1, 4, 'Good service.', 2);