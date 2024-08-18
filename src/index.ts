import { TransactionClient } from "./TransactionClient";

import { IBroadcastTransactionRequest } from "./interface";

(async () => {
    const client = new TransactionClient();

    // create payload for post broadcast transaction
    const payload: IBroadcastTransactionRequest = {
        symbol: "ETH",
        price: 20001,
        timestamp: Date.now(),
    };

    try {
        // attempt to broadcast transaction and log transaction hash on success
        const txHash = await client.broadcastTransaction(payload);
        console.log(`Transaction Hash: ${txHash}`);

        // monitor transaction status with the obtained transaction hash
        const status = await client.monitorTransactionStatus(txHash, 6000);
        console.log(`Transaction status: ${status}`);
    } catch (error) {
        // catch any errors
        console.error(`Error: ${(error as Error).message}`);
    }
})();
