import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import { MemberAttributes } from '../types/types';

class Member extends Model<MemberAttributes> implements MemberAttributes {
  public id!: number;
  public name!: string;
  public age!: number;
  public parentId!: number | null;
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
  }
);

export default Member;
