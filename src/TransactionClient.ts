import axios from "axios";

import {
    IBroadcastTransactionRequest,
    IBroadcastTransactionResponse,
    IMonitoringTransactionStatusResponse,
    statusText,
} from "./interface";

export class TransactionClient {
    private baseUrl: string;
    private broadcastUrl: string;
    private monitoringUrl: string;

    constructor() {
        this.baseUrl = "https://mock-node-wgqbnxruha-as.a.run.app";
        this.broadcastUrl = `${this.baseUrl}/broadcast`;
        this.monitoringUrl = `${this.baseUrl}/check`;
    }

    async broadcastTransaction(
        payload: IBroadcastTransactionRequest
    ): Promise<string> {
        try {
            // send POST request to broadcastUrl with payload
            const response = await axios.post<IBroadcastTransactionResponse>(
                this.broadcastUrl,
                payload
            );
            return response.data.tx_hash; // return tx_hash from the response data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // handle the error that are AxiosError
                throw new Error(
                    `Broadcast Transaction Failed: ${
                        error.response?.status || error.message
                    }`
                );
            } else {
                // handle the error that are not AxiosError
                throw new Error(
                    `Broadcast Transaction Failed: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`
                );
            }
        }
    }

    async monitorTransactionStatus(
        txHash: string,
        interval: number = 5000 // optional parameter
    ): Promise<string> {
        // run while loop to continuously check the transaction status
        while (true) {
            try {
                // send GET request
                const response =
                    await axios.get<IMonitoringTransactionStatusResponse>(
                        `${this.monitoringUrl}/${txHash}`
                    );
                const status = response.data.tx_status;

                if (
                    // check if status is one of the final state
                    status === "CONFIRMED" ||
                    status === "FAILED" ||
                    status === "DNE"
                ) {
                    return statusText[status]; // return the status description
                } else if (status === "PENDING") {
                    console.log(statusText[status]); // log pending message
                    await this.sleep(interval); // wait for the specify interval before re-check
                } else {
                    throw new Error("Unknown status received.");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // handle the error that are AxiosError
                    throw new Error(
                        `Check Transaction Status Failed: ${
                            error.response?.status || error.message
                        }`
                    );
                } else {
                    // handle the error that are not AxiosError
                    throw new Error(
                        `Check Transaction Status Failed: ${
                            error instanceof Error
                                ? error.message
                                : "Unknown error"
                        }`
                    );
                }
            }
        }
    }

    // method that return a promise that resolve after ms
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
