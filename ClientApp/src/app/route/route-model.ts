import { RouteType } from "../route-type/route-type-model";

export class RouteModel {
}
export class Route {
  constructor(
    public id: number,
    public name: string,
    public routeTypeId: number,
    public miles: number,
    public notes: string,
    public routeType: RouteType
  ) { }
}
