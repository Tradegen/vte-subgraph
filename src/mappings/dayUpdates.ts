import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  VTERegistry,
  VTERegistryDayData,
} from "../types/schema";
import {
  VTE_REGISTRY_ADDRESS,
  ZERO_BI } from "./helpers";

export function updateVTERegistryDayData(event: ethereum.Event): VTERegistryDayData {
    let vteRegistry = VTERegistry.load(VTE_REGISTRY_ADDRESS);
    let timestamp = event.block.timestamp.toI32();
    let dayID = timestamp / 86400;
    let dayStartTimestamp = dayID * 86400;
    let vteRegistryDayData = VTERegistryDayData.load(dayID.toString());
    if (vteRegistryDayData === null)
    {
      vteRegistryDayData = new VTERegistryDayData(dayID.toString());
      vteRegistryDayData.date = dayStartTimestamp;
      vteRegistryDayData.dailyCollectedFees = ZERO_BI;
      vteRegistryDayData.totalCollectedFees = ZERO_BI;
      vteRegistryDayData.dailyCreatedVTEs = 0;
    }
  
    vteRegistryDayData.totalCollectedFees = vteRegistry.collectedFees;
    vteRegistryDayData.save();
  
    return vteRegistryDayData as VTERegistryDayData;
  }