import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

export default class SocketConnection{
    static stomp = Stomp.over(new SockJS('http://localhost:8080/ws'));
}