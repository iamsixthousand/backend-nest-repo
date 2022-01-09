import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/custom-exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(data: any, metadata: ArgumentMetadata): Promise<any> {
        const contextClass: any = plainToClass(metadata.metatype, data); // convert to a class decorated method body or param data
        const errors = await validate(contextClass);

        if (errors.length) {
            const errorMessages = errors.map(err => {
                return `${err.property}: ${Object.values(err.constraints).join(', ')}`;
            });
            // throw new HttpException([...errorMessages], HttpStatus.BAD_REQUEST)
            throw new ValidationException(errorMessages)
        }
        return data;
    }
}