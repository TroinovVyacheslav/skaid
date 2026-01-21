export interface FilterValue<T = string> {
  operator?: string;
  value?: T;
}

export interface FilterValueNumber extends FilterValue<number> {
  operator?: '>' | '<' | '>=' | '<=' | '=';
}
