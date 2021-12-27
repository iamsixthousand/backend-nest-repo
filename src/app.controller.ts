import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

// максимально тонкий контроллер
@Controller('/api')
export class AppController {
    constructor(private appService: AppService) {} // не создаем объект класса, а просто используем класс
    @Get('/users')
    getUsers() {
        return this.appService.getUsers();
    }
}
