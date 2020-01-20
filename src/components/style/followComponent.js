import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { Icon } from "native-base";
import GetAsyncToken from '../../script/getAsyncToken';
import StyleFollow from '../../api/styleFollow';
import StyleNeglect from '../../api/styleNeglect';

const FollowView = styled.View`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10;
  left: 10;
  background-color: #eeeeee6e;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const FollowTouchableHighlight = styled.TouchableHighlight`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

class FollowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollower: this.props.isFollow,
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('enter should');
    if(props.isFollow !== state.isFollow) {
      console.log('enter should 1');
      return{
        isFollower: props.isFollow,
      }
    }
  }
  toggleFollow(id, follower) {
    console.log('follow toggle', id, follower);
    GetAsyncToken().then(token => {
      if (follower === false) {
        StyleFollow(token, id)
          .then(res => {
            console.log('styled followed',res);
            // this.setState({isFollower : true})
            // this.setState(prevState => ({
            //   ...prevState,
            //   dataArray: {
            //     ...prevState.dataArray,
            //     data: {
            //       ...prevState.dataArray.data,
            //       isFollower: true
            //     }
            //   }
            // }))
            // console.log('after follow change', this.state.dataArray)
          })
      }
      else {
        StyleNeglect(token, id)
          .then(res => {
            console.log('style neglect :', res);
            // this.setState({isFollower : false})

            // console.log("style deleted");
            // this.setState(prevState => ({
            //   ...prevState,
            //   dataArray: {
            //     ...prevState.dataArray,
            //     data: {
            //       ...prevState.dataArray.data,
            //       isFollower: false
            //     }
            //   }
            // }))
          })
      }
      this.props.callSingleStyle(id);
      this.state = {
        isFollower: this.props.isFollow,
      }
    })
  }
  render() {
    if(this.props.isFollow != null)
      console.log('follow component', this.state.isFollower, this.props.isFollow);
    return (
      <FollowView>
        <FollowTouchableHighlight underlayColor="#42546033" onPress={() => this.toggleFollow(this.props.id, this.state.isFollower)}>
          {this.props.isFollow != null && <Icon
            style={{
              color:
                this.state.isFollower === false
                  ? "#ccc"
                  : "#f00"
            }}
            name="heart"
          />}
        </FollowTouchableHighlight>
      </FollowView>
    )
  }
}
export default FollowComponent;