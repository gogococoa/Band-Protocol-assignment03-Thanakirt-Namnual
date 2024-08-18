# TransactionClient

## Setup

1. **Clone the Repository**

2. **Install Dependencies**

Ensure you have Node.js installed. Then, install the required dependencies:

```
npm install
```

## Usage

1. **Define the `TransactionClient`**

The `TransactionClient` class is defined in `src/TransactionClient.ts`

2. **Create the Execution Script**

Use `src/index.ts` to execute the client

## Running the script

```
npx ts-node src/index.ts
```

## Status Handling

-   **CONFIRMED**: Transaction has been processed and confirmed
-   **FAILED**: Transaction failed to process
-   **PENDING**: Transaction is awaiting processing
    > The client will retry until the status change to **`CONFIRMED`**, **`FAILED`**, or **`DNE`**
-   **DNE**: Transaction does not exist
