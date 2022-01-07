import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    @ApiProperty({ example: 32, description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Role)
    @ApiProperty({ example: 'ADMIN', description: 'role name' })
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @ApiProperty({
        example: 'full access',
        description: 'role access description',
    })
    @Column({ type: DataType.INTEGER })
    userId: number;
}
