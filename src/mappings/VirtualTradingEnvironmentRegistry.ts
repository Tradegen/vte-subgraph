import {
    BigInt
  } from "@graphprotocol/graph-ts";  
import {
 CreatedVTE,
} from "../types/VirtualTradingEnvironmentRegistry/VirtualTradingEnvironmentRegistry";
import {
  VTERegistry,
  VTE,
} from "../types/schema";
import { VirtualTradingEnvironment as VirtualTradingEnvironmentTemplate } from "../types/templates";
import {
  VTE_REGISTRY_ADDRESS,
  ZERO_BI,
  fetchDataFeed
} from "./helpers";
import { updateVTERegistryDayData } from "./dayUpdates";

export function handleCreatedVTE(event: CreatedVTE): void {
    let vteRegistry = VTERegistry.load(VTE_REGISTRY_ADDRESS);
    if (vteRegistry === null) {
        vteRegistry = new VTERegistry(VTE_REGISTRY_ADDRESS);
        vteRegistry.numberOfVTEs = 0;
        vteRegistry.creationFee = BigInt.fromString("100000000000000000000"); // 1e20.
        vteRegistry.collectedFees = ZERO_BI;
    }
    vteRegistry.numberOfVTEs = vteRegistry.numberOfVTEs + 1;
    vteRegistry.collectedFees = vteRegistry.collectedFees.plus(vteRegistry.creationFee);
    vteRegistry.save();

    let vte = new VTE(event.params.index.toString());
    vte.contractAddress = event.params.contractAddress.toHexString();
    vte.createdOn = event.block.timestamp;
    vte.owner = event.params.owner.toHexString();
    vte.operator = event.params.owner.toHexString();
    vte.dataFeed = fetchDataFeed(event.params.contractAddress).toHexString();
    vte.cumulativeLeverageFactor = ZERO_BI;
    vte.save();

    let vteRegistryDayData = updateVTERegistryDayData(event);
    vteRegistryDayData.dailyCreatedVTEs = vteRegistryDayData.dailyCreatedVTEs + 1;
    vteRegistryDayData.dailyCollectedFees = vteRegistryDayData.dailyCollectedFees.plus(vteRegistry.creationFee);
    vteRegistryDayData.save();

    // Create the tracked contract based on the template.
    VirtualTradingEnvironmentTemplate.create(event.params.contractAddress);
}