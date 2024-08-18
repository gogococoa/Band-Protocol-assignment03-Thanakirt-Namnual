// structure of the payload that will be sent to the broadcast endpoint
export interface IBroadcastTransactionRequest {
    symbol: string;
    price: number;
    timestamp: number;
}

// the response expected from the broadcast endpoint
export interface IBroadcastTransactionResponse {
    tx_hash: string;
}

// possible status for transaction
type TransactionStatus = "CONFIRMED" | "FAILED" | "PENDING" | "DNE";

// description for each status
export const statusText: Record<TransactionStatus, string> = {
    CONFIRMED: "Transaction has been processed and confirmed",
    FAILED: "Transaction failed to process",
    PENDING: "Transaction is awaiting processing",
    DNE: "Transaction does not exist",
};

// the response expected from the check/[tx_hash] endpoint
export interface IMonitoringTransactionStatusResponse {
    tx_status: TransactionStatus;
}
