// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface OffsetHelper {
    function autoOffsetExactInToken(
        address _fromToken,
        uint256 _amountToSwap,
        address _poolToken
    ) external returns (address[] memory tco2s, uint256[] memory amounts);
}
