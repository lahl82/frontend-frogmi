import { IAttributes } from "./iattributes.model"
import { ILinks } from "./ilinks.model";

export interface IFeature {
  id?: number;
  type?: string;
  attributes?: IAttributes;
  links?: ILinks
}
