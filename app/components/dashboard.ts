import { EventData, Page } from '@nativescript/core';
import { UnderwaterVehicle } from '../models/vehicle';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new UnderwaterVehicle();
}