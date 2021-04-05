export interface Type {
  key: string;
}

export interface Author2 {
  key: string;
}

export interface Author {
  type: Type;
  author: Author2;
}

export interface Type2 {
  key: string;
}

export interface Created {
  type: string;
  value: Date;
}

export interface LastModified {
  type: string;
  value: Date;
}

export interface Book {
  description: string;
  title: string;
  covers: number[];
  subject_places: string[];
  first_publish_date: string;
  subject_people: string[];
  key: string;
  authors: Author[];
  subject_times: string[];
  type: Type2;
  subjects: string[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
}


