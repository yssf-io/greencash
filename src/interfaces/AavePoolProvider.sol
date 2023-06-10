// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface AavePoolProvider {
    function getPool() external view returns (address);
}
