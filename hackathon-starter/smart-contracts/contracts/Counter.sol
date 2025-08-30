// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public value;

    event Increment(address indexed by, uint256 newValue);

    function increment() public {
        unchecked {
            value += 1;
        }
        emit Increment(msg.sender, value);
    }
}