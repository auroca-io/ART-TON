// Interface definitions for TON Wrapper Token Contract

interface IWrapperToken {
    // Configuration methods
    configure_distribution(assets: AssetAllocation[]): Promise<void>;
    configure_slippage(params: SlippageConfig): Promise<void>;
    
    // Core functionality
    mint(amount: bigint): Promise<void>;
    burn(amount: bigint): Promise<void>;
    transfer(to: Address, amount: bigint): Promise<void>;
    
    // View methods
    get_distribution(): Promise<AssetAllocation[]>;
    get_balance(address: Address): Promise<bigint>;
    get_total_supply(): Promise<bigint>;
    get_underlying_balances(address: Address): Promise<AssetBalance[]>;
    
    // Price and slippage related
    get_current_slippage(): Promise<SlippageMetrics>;
    check_slippage_for_amount(amount: bigint): Promise<SlippageCheck>;
    simulate_mint(amount: bigint): Promise<SimulationResult>;
    simulate_burn(amount: bigint): Promise<SimulationResult>;
}

// Data structures
interface AssetAllocation {
    asset_address: Address;
    percentage: number;  // In basis points (100% = 10000)
}

interface SlippageConfig {
    max_slippage_per_asset: number;     // Maximum allowed slippage per asset (basis points)
    max_total_slippage: number;         // Maximum allowed total slippage (basis points)
    slippage_window: number;            // Time window for slippage calculation (seconds)
    price_impact_limit: number;         // Maximum allowed price impact (basis points)
    min_liquidity_ratio: number;        // Minimum liquidity ratio required (basis points)
}

interface SlippageMetrics {
    current_slippage: number;           // Current slippage across all assets
    asset_slippages: AssetSlippage[];   // Individual asset slippages
    price_impact: number;               // Current price impact
    liquidity_ratio: number;            // Current liquidity ratio
    last_update: number;                // Timestamp of last update
}

interface AssetSlippage {
    asset_address: Address;
    slippage: number;                   // Current slippage in basis points
    volume_24h: bigint;                 // 24h trading volume
    liquidity: bigint;                  // Current liquidity
}

interface SlippageCheck {
    allowed: boolean;                   // Whether the transaction would be allowed
    reasons?: string[];                 // Reasons for rejection if not allowed
    estimated_slippage: number;         // Estimated slippage for the transaction
    warning_level: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
}

interface SimulationResult {
    success: boolean;
    expected_slippage: number;
    asset_impacts: AssetImpact[];
    total_value_impact: number;
    estimated_gas: bigint;
}

interface AssetImpact {
    asset_address: Address;
    price_impact: number;
    liquidity_impact: number;
    expected_execution_price: bigint;
}

interface AssetBalance {
    asset_address: Address;
    balance: bigint;
    usd_value: bigint;
}
