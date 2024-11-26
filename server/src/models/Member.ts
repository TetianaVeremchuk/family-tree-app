import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import { MemberAttributes } from '../types/types';

type MemberCreationAttributes = Optional<MemberAttributes, 'id' | 'children'>;

class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  public id!: number;
  public name!: string;
  public age!: number;
  public parentId!: number | null;
  public children?: Member[]; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Members',
    timestamps: true, 
  }
);

Member.hasMany(Member, { as: 'children', foreignKey: 'parentId' });
Member.belongsTo(Member, { as: 'parent', foreignKey: 'parentId' });

export default Member;