export interface MemberAttributes {
  id?: number;
  name: string;
  age: number;
  parentId: number | null;
}

export interface MemberUpdateBody {
  name?: string;
  age?: number;
  parentId?: number | null;
}
