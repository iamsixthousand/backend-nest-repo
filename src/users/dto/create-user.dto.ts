import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Messages } from 'src/@core/strings';

export class CreateUserDTO {
    @ApiProperty({ example: 'user@gmai.com', description: 'user email adress' })
    @IsString({message: Messages.beAString})
    @IsEmail({}, {message: Messages.incorrectEmail})
    readonly email: string;

    @ApiProperty({ example: 'sixthousand', description: 'user name' })
    @IsString({message: Messages.beAString})
    @Length(3, 20, {message: Messages.reqUsenameLength})
    readonly username: string;

    @ApiProperty({ example: '1234TTT23hsdj', description: 'string password' })
    @IsString({message: Messages.beAString})
    @Length(4, 30, {message: Messages.reqPasswordLength})
    readonly password: string;
}
