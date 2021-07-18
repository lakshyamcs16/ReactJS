import React from "react";

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

interface IFlatList {
  callback?: (e: Event) => void;
  keyExtractor: (item: IContact) => any;
  render: (item: IContact, index: number) => any;
  data: Array<IContact>;
  horizontal?: boolean;
  classes?: Array<string> | string;
}

interface IFlatListState {
  scrollCallback?: (e: Event) => void;
}

export default class FlatList extends React.Component<
  IFlatList,
  IFlatListState
> {
  constructor(props: IFlatList) {
    super(props);
    this.state = {
      scrollCallback: props.callback,
    };

    if (props.callback) window.addEventListener("scroll", this.loadMore);
  }

  componentWillUnmount() {
    if (this.props.callback)
      window.removeEventListener("scroll", this.loadMore);
  }

  loadMore = (e: Event) => {
    if (
      this.props.callback &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement?.scrollHeight
    ) {
      this.state.scrollCallback?.(e);
    }
  };

  render() {
    return (
      <div className={this.props.horizontal? "d-flex" : "item-container"}>
        {this.props.data.map((item, index) => {
          return (
            <div
              key={this.props.keyExtractor(item) || index}
              data-id={this.props.keyExtractor(item) || index + 1}
              className={Array.isArray(this.props.classes)? this.props.classes.join(" ") : this.props.classes}
            >
              {this.props.render(item, index)}
            </div>
          );
        })}
      </div>
    );
  }
}
