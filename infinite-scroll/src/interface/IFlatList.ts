export interface IAddress {
  street?: string;
  suite?: string;
  city: string;
  zipcode: string | number;
  geo: {
    lat: string | number;
    lng: string | number;
  };
}

export interface IContact {
  id: string | number;
  avatar: string;
  name?: string;
  username: string;
  email?: string;
  address?: IAddress;
  phone?: string | number;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface IFlatList {
  callback?: (e: Event) => void;
  keyExtractor: (item: IContact) => any;
  render: (item: IContact, index: number) => any;
  data: Array<IContact>;
  horizontal?: boolean;
  classes?: Array<string> | string;
}

export interface IFlatListState {
  scrollCallback?: (e: Event) => void;
}
