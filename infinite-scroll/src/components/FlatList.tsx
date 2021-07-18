import React from "react";
import {IFlatListState, IFlatList} from '../interface/IFlatList';

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
      (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 2
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
