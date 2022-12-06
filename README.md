# Virtual Trading Environment Subgraph

Tradegen is a decentralized trading platform that focuses on asset management, algo trading, and virtual trading.

This subgraph dynamically tracks the creation of virtual trading environments (VTEs) and the protocol fees collected from creating VTEs. Most of the data for VTEs can be found in the data feeds subgraph. 

## Running Locally

Make sure to update package.json settings to point to your own graph account.

## Queries

Below are a few ways to show how to query the [virtual-trading-environments subgraph](https://thegraph.com/hosted-service/subgraph/tradegen/virtual-trading-environments) for data. The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://thegraph.com/docs/graphql-api). These queries can be used locally or in The Graph Explorer playground.

## Key Entity Overviews

#### VTERegistry

Tracks the number of virtual trading environments, the protocol fee for creating an environment, and the total fees collected.

#### VTE

Contains data on a specific virtual trading environment. Tracks the environment's owner, operator, contract address, and data feed address.

## Example Queries

### Querying Aggregated Data

This query fetches aggredated data from all VTEs, to give a view into how much activity is happening within the protocol.

```graphql
{
  vteRegistries(first: 1) {
    numberOfVTEs
    collectedFees
  }
}
```
