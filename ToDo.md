Users
------

1. Sellers
2. Buyers

User Authentication
--------------------

- [ ] Buyer
    - [ ] Signup
        - [ ] Phone
        - [ ] OTP
        - [ ] Profile Details
            - [ ] Name
            - [ ] Address (L1, L2, City, State, Country, Pincode)
            - [ ] Email (Optional)
            - [ ] Password

- [ ] Login
    - [ ] Phone & OTP
    - [ ] Email & Password (If provided)

- [ ] Forgot Password
    - [ ] Phone & OTP Verification
    - [ ] Email & OTP Verification

User Profile
-------------

- [ ] Update details
    - [ ] Phone (verification by OTP)
    - [ ] Email (verification by OTP)
    - [ ] Name
    - [ ] Address
    - [ ] Password (old password required)

- [ ] Delete Account

Product Catalog
----------------

- [ ] Seller/Super Admin
    - [ ] Create new product
    - [ ] Update product details
    - [ ] Remove product

- [ ] View product details

- [ ] Buyer
    - [ ] Rate product
    - [ ] Review product

Cart/Orders
------------

- [ ] Buyer
    - [ ] View Cart
    - [ ] Add new order to cart
    - [ ] Update order in cart
    - [ ] Remove item from cart
    - [ ] Empty cart

- [ ] Seller
    - [ ] Product Stock management
    - [ ] Product wise statistics

Checkout
---------

- [ ] Buyer
    - [ ] Specify delivery details


Database Specification
------------------------

Product Catalog --> MongoDB

User information, Orders --> PostgreSQL