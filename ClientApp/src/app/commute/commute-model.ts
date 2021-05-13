import { DelayReason } from "../delay-reason/delay-reason-model";
import { Destination, DestinationModel } from "../destination/destination-model";
import { FareClass } from "../fare-class/fare-class-model";
import { Route } from "../route/route-model";

export class CommuteModel {
}
export class Commute{
  Id: number;
  StartTime: Date;
  EndTime: Date;
  Destination: Destination;
  DelaySeconds: number;
  CommuteLegModels: CommuteLeg[];
  Notes: string;
}
export class CommuteLeg{
  Id: number;
  StartTime: Date;
  EndTime: Date;
  Destination: Destination;
  DelayReason: DelayReason;
  DelaySeconds: number;
  FareClass: FareClass;
  Route: Route;
  Commute: Commute;
  Notes: string;
}
export class CommuteLegRequest {
  Id: number;
  StartTime: Date;
  EndTime: Date;
  DestinationId: number;
  DelayReasonId: number;
  DelaySeconds: number;
  FareClassId: number;
  RouteId: number;
  CommuteId: number;
  Notes: string;
}
