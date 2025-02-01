# ART-TON
Asset Refferenced Token - TON Version

# TON Wrapper Token Technical Documentation

## Overview
The TON Wrapper Token is a smart contract that enables the creation of tokens backed by a basket of underlying assets. Each wrapper token represents a fixed distribution of underlying assets, with built-in slippage protection and price monitoring.

## Core Components

### Asset Distribution
- Each token represents a fixed distribution of underlying assets
- Distributions are specified in basis points (1/100th of a percent)
- Total distribution must equal 10000 (100%)
- Distribution is immutable after initialization

### Slippage Protection System

#### Configuration Parameters
```typescript
{
    max_slippage_per_asset: number,     // Maximum allowed slippage per asset
    max_total_slippage: number,         // Maximum allowed total slippage
    slippage_window: number,            // Time window for calculation
    price_impact_limit: number,         // Maximum allowed price impact
    min_liquidity_ratio: number         // Minimum liquidity ratio required
}
```

#### Slippage Calculation
1. Per-Asset Slippage:
   - Calculated as: |(expected_price - execution_price)| / expected_price
   - Monitored within configured time window
   - Must remain below max_slippage_per_asset

2. Total Slippage:
   - Weighted average of individual asset slippages
   - Weighted by asset distribution percentages
   - Must remain below max_total_slippage

3. Price Impact:
   - Estimated effect of transaction on asset prices
   - Calculated using liquidity depth
   - Must remain below price_impact_limit

### Security Features

1. Deposit Verification
   - Multi-step verification process
   - Timeout checks prevent stale verifications
   - User address verification prevents front-running
   - Dust tolerance for minor amount mismatches

2. Price Monitoring
   - Oracle integration for price feeds
   - Freshness checks on price data
   - Circuit breakers for extreme price movements
   - Price manipulation protection

## Usage Guide

### Initialization
```typescript
// Configure initial asset distribution
const distribution = [
    { asset_address: "addr1", percentage: 4000 }, // 40%
    { asset_address: "addr2", percentage: 3500 }, // 35%
    { asset_address: "addr3", percentage: 2500 }  // 25%
];

// Configure slippage parameters
const slippageConfig = {
    max_slippage_per_asset: 100,    // 1%
    max_total_slippage: 50,         // 0.5%
    slippage_window: 3600,          // 1 hour
    price_impact_limit: 200,        // 2%
    min_liquidity_ratio: 5000       // 50%
};
```

### Minting Process
1. Check current slippage metrics
2. Simulate mint transaction
3. If simulation successful, execute mint
4. Verify all deposits received
5. Token minting occurs after all verifications

### Burning Process
1. Check current slippage metrics
2. Simulate burn transaction
3. If simulation successful, execute burn
4. Underlying assets are transferred back
5. Tokens are burned after successful transfer

## Error Handling

### Error Codes
- ERROR_INSUFFICIENT_BALANCE (101): Insufficient balance for operation
- ERROR_INVALID_AMOUNT (102): Invalid amount specified
- ERROR_UNAUTHORIZED (103): Unauthorized operation attempt
- ERROR_INVALID_DISTRIBUTION (104): Invalid asset distribution
- ERROR_DISTRIBUTION_NOT_100 (105): Distribution doesn't total 100%
- ERROR_DEPOSIT_TIMEOUT (106): Deposit verification timeout
- ERROR_INVALID_ORACLE (107): Invalid oracle configuration
- ERROR_PRICE_STALE (108): Stale price data
- ERROR_DEPOSIT_MISMATCH (109): Deposit amount mismatch
- ERROR_SLIPPAGE (110): Slippage exceeds limits

### Recovery Procedures
1. Deposit Timeout
   - Transaction must be reinitiated
   - Previous verification data is cleared
   - New timeout window begins

2. Price Staleness
   - Wait for fresh price data
   - Monitor oracle status
   - Check alternative price sources

3. Slippage Exceedance
   - Transaction can be retried with different amount
   - Monitor market conditions
   - Check liquidity levels

## Performance Considerations

### Gas Optimization
- Batch operations when possible
- Optimize storage access patterns
- Use efficient data structures

### Scalability
- Handles multiple assets efficiently
- Optimized for common operations
- Minimal storage requirements

## Security Recommendations

1. Transaction Ordering
   - Use nonce-based approach
   - Monitor for front-running
   - Implement maximum delay checks

2. Price Feed Security
   - Use multiple oracle sources
   - Implement median price selection
   - Monitor for price manipulation

3. Access Control
   - Strict permission checking
   - Multi-signature support for critical operations
   - Time-locked operations for significant changes

## Testing Guide

### Test Categories
1. Unit Tests
   - Individual function testing
   - Error condition verification
   - Edge case handling

2. Integration Tests
   - Multi-operation sequences
   - Cross-contract interactions
   - Oracle integration testing

3. Stress Tests
   - High volume operations
   - Concurrent transaction handling
   - Network congestion scenarios

### Test Environment Setup
```typescript
// Test configuration example
const testConfig = {
    network: "testnet",
    initial_distribution: [...],
    test_accounts: [...],
    mock_oracles: [...]
};
```

## Deployment Checklist

1. Pre-deployment
   - [ ] Audit completed
   - [ ] All tests passing
   - [ ] Gas optimization verified
   - [ ] Oracle connections configured
   - [ ] Initial distribution validated

2. Deployment
   - [ ] Deploy contract
   - [ ] Configure distribution
   - [ ] Set slippage parameters
   - [ ] Connect price oracles
   - [ ] Verify all settings

3. Post-deployment
   - [ ] Monitor initial transactions
   - [ ] Verify price feeds
   - [ ] Check slippage calculations
   - [ ] Validate security measures
