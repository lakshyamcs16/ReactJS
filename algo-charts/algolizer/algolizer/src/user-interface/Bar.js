import React from 'react'

class Bar extends React.Component {
    render(){
        return(
          <div className="bars" id={this.props.id}
          style={{backgroundColor: this.props.color, width: this.props.width, height: this.props.height}}>            
          </div>
        );
    }
}
    
export default Bar
