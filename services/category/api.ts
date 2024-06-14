import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type CategoryModel } from './index'

export async function getCategory_API(parentId: string): Promise<[Error, null] | [null, CategoryModel[]]> {
   try {
      const response = <CategoryModel[]>await axiosInstance.get('/categories', {
         params: {
            parentId
         }}
      )

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
} 
