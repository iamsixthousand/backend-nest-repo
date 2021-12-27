import { Injectable } from "@nestjs/common";


// логика обработки реквестов
@Injectable() // для создания провайдера(сервиса) для внедрения в контроллер
export class AppService {
    getUsers() {
        return [{id: 1, name: 'user1'}];
    }
}