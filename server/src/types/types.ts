export interface MemberAttributes {
  id: number;
  name: string;
  age: number;
  parentId?: number | null;
  children?: MemberAttributes[]; 
}

export interface MemberUpdateBody {
  name?: string;
  age?: number;
  parentId?: number | null;
}
