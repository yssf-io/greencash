// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "openzeppelin/token/ERC20/ERC20.sol";
import {AavePoolProvider} from "./interfaces/AavePoolProvider.sol";
import {AavePool} from "./interfaces/AavePool.sol";

/// @title A Green Wrapper for ERC20 tokens
/// @notice Use this contract to wrap ERC20 tokens whose yield is used to buy carbon credits
contract GreenWrapper is ERC20 {
    uint256 public number;
    ERC20 public underlying;
    AavePoolProvider public immutable aavePoolProvider;

    constructor(
        string memory _name,
        string memory _symbol,
        address _underlying,
        address _aavePoolProvider
    ) ERC20(_name, _symbol) {
        underlying = ERC20(_underlying);
        aavePoolProvider = AavePoolProvider(_aavePoolProvider);

        underlying.approve(aavePoolProvider.getPool(), type(uint256).max);
    }

    /// @notice Deposit underlying token to mint wrapped token
    /// @param amount Amount of underlying token to deposit
    function deposit(uint256 amount) public {
        // Get the underlying token from sender
        underlying.transferFrom(msg.sender, address(this), amount);

        // Mint equivalent amount of wrapped token to sender
        _mint(msg.sender, amount);

        // Deposit to Aave
        _depositToStrategy();
    }

    /// @notice Withdraw underlying token by burning wrapped token
    /// @param amount Amount of wrapped token to burn
    function withdraw(uint256 amount) public {
        // Burn equivalent amount of wrapped token from sender
        _burn(msg.sender, amount);

        // Withdraw from Aave
        _withdrawFromStrategy(amount);

        // Transfer equivalent amount of underlying token to sender
        underlying.transfer(msg.sender, amount);
    }

    /// @notice Supplies underlying token to Aave
    function _depositToStrategy() internal {
        AavePool pool = AavePool(aavePoolProvider.getPool());

        pool.supply(
            address(underlying),
            underlying.balanceOf(address(this)),
            address(this),
            0
        );
    }

    /// @notice Withdraws underlying token from Aave
    /// @param amount Amount of underlying token to withdraw
    function _withdrawFromStrategy(uint256 amount) internal {
        AavePool pool = AavePool(aavePoolProvider.getPool());

        pool.withdraw(address(underlying), amount, address(this));
    }
}
