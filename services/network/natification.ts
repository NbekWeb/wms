import { ElNotification } from 'element-plus';

export function checkAxiosResponse(response: any) {
    type NotificationType = 'success' | 'warning' | 'error';

    let type:NotificationType = 'success';
    let title = 'Success';
    let message = 'Item posted successfully';

    switch(response.status) {
        case 500: {
            title = 'Error'
            message = 'Server Error occurred, please connect to developers'
            type = 'error'
            break
        }
        case 400: {
            title = 'Error'
            message = 'Error occurred, please try again later'
            type = 'error'
            break
        }
        case 403: {
            title = 'Warning'
            message = 'Forbidden data access required!'
            type = 'warning'
            break
        }
        case 200: {
            switch(response.config.method) {
                case 'get': {
                    return
                }
                case 'post': {
                    if(response.config.url.includes('files/v1/')) {
                        message = 'File uploaded successfully';
                    }
                    else if(response.config.url.includes('users/login')) {
                        message = 'Logged in successfully';
                    }    
                    break;
                }
                case 'put': {
                    message = 'Item updated successfully';
                    break;
                }
                case 'delete': {
                    message = 'Item deleted successfully';
                    break;
                }                
            }
        }
    }

    ElNotification({
        type,
        title,
        message,
    })
}

export function checkAxiosError(error: any) {
    type NotificationType = 'success' | 'warning' | 'error';

    let type:NotificationType = 'error';
    let title = 'Error';
    let message = 'Item posted successfully';

    console.log("Checking Error")
    console.log(error)

    switch(error.response.status) {
        case 500: {
            title = 'Error'
            message = 'Server Error occurred, please connect to developers'
            type = 'error'
            break
        }
        case 401: {
            title = 'Error'
            message = '401 Error occurred'
            type = 'error'
            break
        }
        case 400: {
            title = 'Error'
            message = 'Error occurred, please try again later'
            type = 'error'
            break
        }
        case 403: {
            title = 'Warning'
            message = 'Forbidden data access required!'
            type = 'warning'
            break
        }
    }

    ElNotification({
        type,
        title,
        message,
    })
}