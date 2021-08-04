import { History, LocationState } from "history";

export interface IRoutingProps {
    history?: History<LocationState>;
    location?: Location;
    match?: string;
    name: string | null;
  }
  