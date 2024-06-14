import { type CategoryModel } from "./model";

export function getEmployee_DEFAULT(): CategoryModel {
    const object: CategoryModel = {
      id: '',
      name: '',
      parentId: '',
      hasChild: false
    }
    return object;
}