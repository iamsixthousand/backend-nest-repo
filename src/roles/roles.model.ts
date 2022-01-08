import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface RoleCreateAttr {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreateAttr> {
    @ApiProperty({ example: 32, description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'role name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({
        example: 'full access',
        description: 'role access description',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @HasMany(() => User)
    users: User[];
}
