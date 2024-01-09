import { axiosInstance, type BaseListResponse } from '~/services/network'

// import { _loginStore } from "@/services/login"

export async function removeFile_API(file: File): Promise<[string, null] | [null, Error]> {
   try {
     const data = new FormData()
     data.append('file', file)
     const response = <string>await axiosInstance({
       url: `files`,
       method: 'Delete',
       data,
       headers: { 'Content-Type': 'multipart/form-data' }
     })
 
     return [response, null]
   } catch (error) {
     return [null, error as Error]
   }
 }

export async function uploadFile_API(file: File): Promise<[string, null] | [null, Error]> {
  try {
    const data = new FormData()
    data.append('file', file)
    const response = <string>await axiosInstance({
      url: `files/upload`,
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return [response, null]
  } catch (error) {
    return [null, error as Error]
  }
}
export async function uploadMultipleFile_API(
  files: File[]
): Promise<[string[], null] | [null, Error]> {
  try {
    const data = new FormData()
    for (const file of files) {
      data.append('files', file)
    }
    const response = <string[]>await axiosInstance({
      url: `files/v1/upload-many`,
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return [response, null]
  } catch (error) {
    return [null, error as Error]
  }
}

export async function downloadFile_API(
  url: string,
  download = true
): Promise<[any, null] | [null, Error]> {
  try {
    const response = <Blob>await axiosInstance.get(`files/v1/download`, {
      params: { file: url },
      responseType: 'blob'
    })

    if (download) {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(response)
      link.target = '_blank'

      link.download = response.headers.file
      document.body.appendChild(link)

      link.click()
    }
    return [response, null]
  } catch (error) {
    return [null, error as Error]
  }
}




