import { handleNotification } from "./PushNotification";


let notificationSocket = null


export const initializeNotificationSocket = (userId) =>{
    console.log(userId,'userid ');
    if(!notificationSocket || notificationSocket.readyState === WebSocket.CLOSED){
        notificationSocket = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/notifications/${userId}/`);
        
        notificationSocket.onopen = () =>{
            console.log('Notification socket connected');
        }

        notificationSocket.onmessage = (event)=>{
            const data = JSON.parse(event.data)
            console.log(data, event, ' in message');
            handleNotification(data)
        }

        notificationSocket.onerror = (error) => {
            console.log("notification socket error ",error);
        }

        notificationSocket.onclose = ()=>{
            console.log("Notificaion socket disconnected");
            setTimeout(()=> initializeNotificationSocket(userId), 5000) // try to reconnect every 5 mins
        }
    }
}

export const closeNotificationSocket = () => {
    if(notificationSocket) {
        notificationSocket.close()
    }
}