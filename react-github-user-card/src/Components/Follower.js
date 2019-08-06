import React from 'react';
import styled from 'styled-components';

const FollowerDiv = styled.div`
  width: 10%;
  
  img {
    max-width: 95%;
    border-radius: 5px;
  }
`;


export default class Follower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: props.follower
    };
  }

  render() {
    return (
        <FollowerDiv className='follower'>
          <h4>{this.state.profileData.login}</h4>
          <img src={this.state.profileData.avatar_url} alt='Follower' />
        </FollowerDiv>
    );
  }
}