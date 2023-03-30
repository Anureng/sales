//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        string name;
        uint256 id;
        address creator;
        address currentOwner;
        address deliveryAddress;
        bool delivered;
    }

    struct User {
        string name;
        address _pubkey;
    }

    mapping(uint256 => Product) products;
    mapping(address => User) public AllUser;
    uint256 productCount = 0;

    function createUser(string memory _name) public {
        AllUser[msg.sender].name = _name;
    }

    function createProduct(string memory name, address deliveryAddress) public {
        Product memory newProduct = Product({
            name: name,
            id: productCount,
            creator: msg.sender,
            currentOwner: msg.sender,
            deliveryAddress: deliveryAddress,
            delivered: false
        });
        products[productCount] = newProduct;
        productCount++;
    }

    function transferOwnership(uint256 productId, address newOwner) public {
        require(
            msg.sender == products[productId].currentOwner,
            "You are not the current owner of this product."
        );
        products[productId].currentOwner = newOwner;
    }

    function markProductDelivered(uint256 productId) public {
        require(
            msg.sender == products[productId].deliveryAddress,
            "You are not authorized to mark this product as delivered."
        );
        products[productId].delivered = true;
    }

    function getProduct(
        uint256 productId
    )
        public
        view
        returns (string memory, uint256, address, address, address, bool)
    {
        return (
            products[productId].name,
            products[productId].id,
            products[productId].creator,
            products[productId].currentOwner,
            products[productId].deliveryAddress,
            products[productId].delivered
        );
    }
}
