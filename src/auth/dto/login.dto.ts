import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Messages } from 'src/@core/strings';

export class LoginDTO {
    @ApiProperty({ example: 'user@gmai.com', description: 'user email adress' })
    @IsOptional()
    @IsString({message: Messages.beAString})
    @IsEmail({}, {message: Messages.incorrectEmail})
    readonly email?: string;

    @ApiProperty({ example: 'sixthousand', description: 'user name' })
    @IsOptional()
    @IsString({message: Messages.beAString})
    @Length(3, 20, {message: Messages.reqUsenameLength})
    readonly username?: string;

    @ApiProperty({ example: '1234TTT23hsdj', description: 'string password' })
    @IsString({message: Messages.beAString})
    @Length(4, 30, {message: Messages.reqPasswordLength})
    readonly password: string;
}