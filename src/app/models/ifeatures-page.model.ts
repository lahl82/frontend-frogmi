import { IFeature } from "./ifeature.model";
import { IPagination } from "./ipagination.model";

export interface IFeaturesPage {
  data: IFeature[];
  pagination?: IPagination;
}
