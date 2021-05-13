import { DelayReason } from "../delay-reason/delay-reason-model";
import { Route } from "../route/route-model";

export class PassConditionModel {
}
export class PassCondition {
  Id: number;
  Date: Date;
  Minutes: number;
  UsualMinutes: number;
  DelayReason: DelayReason;
  DelayReasonId: number;
  DelaySeconds: number;
  Route: Route;
  RouteId: number;
  Notes: string;
}
