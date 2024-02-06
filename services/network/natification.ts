import { ElNotification } from 'element-plus';

export function checkAxiosResponse(response: any) {
   type NotificationType = 'success' | 'warning' | 'error';

   let type: NotificationType = 'success';
   let title = 'Успех';
   let message = 'Успешно создан';

   switch (response.status) {
      case 500: {
         title = 'Ошибка'
         message = 'Произошла ошибка сервера, пожалуйста, свяжитесь с разработчиками'
         type = 'error'
         break
      }
      case 400: {
         title = 'Ошибка'
         message = 'Произошла ошибка. Повторите попытку позже.'
         type = 'error'
         break
      }
      case 403: {
         title = 'Ошибка'
         message = 'Требуется запрещенный доступ к данным!'
         type = 'warning'
         break
      }
      case 200: {
         switch (response.config.method) {
            case 'get': {
               return
            }
            case 'post': {
               if (response.config.url.includes('files/v1/')) {
                  message = 'File uploaded successfully';
               }
               else if (response.config.url.includes('auths/login')) {
                  message = 'Вы успешно вошли в систему';
               }
               else if (response.config.url.includes('auths/register')) {
                  message = 'Регистрация прошла успешно';
               }
               else if (response.config.url?.includes('analytics')) {
                  return
               }


               break;
            }
            case 'put': {
               message = 'Успешно обновлен';
               break;
            }
            case 'delete': {
               message = 'Успешно удален';
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

   let type: NotificationType = 'error';
   let title = 'Error';
   let message = 'Произошла ошибка';

   console.log("Checking Error")
   console.log(error)

   switch (error.response.status) {
      case 500: {
         title = 'Ошибка'
         message = 'Произошла ошибка сервера, пожалуйста, свяжитесь с разработчиками'
         type = 'error'
         break
      }
      case 401: {
         title = 'Ошибка'
         message = '401 Произошла ошибка'
         type = 'error'
         break
      }
      case 400: {
         title = 'Ошибка'
         message = 'Произошла ошибка. Повторите попытку позже.'
         type = 'error'
         break
      }
      case 403: {
         title = 'Предупреждение'
         message = 'Требуется запрещенный доступ к данным!'
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