import React from 'react';
import axios from 'axios';
import Follower from './Follower';
import styled from 'styled-components';

const api_url = 'https://api.github.com/users/';

const ProfileDiv = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .head {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    margin-bottom: 10px;
    background: #e8e8e8;
    border-radius: 10px;
    
    .avatar-container {
      
      img {
        max-width: 70%;
        border-radius: 5px;
      }
    }
  }
`;

const FollowersDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default class GitProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileID: props.ID,
      userData: null,
      followers: []
    };
  }

  componentDidMount() {
    let response = () => {
      axios.get(`${api_url}${this.state.profileID}`)
        .then(res => {
          this.setState({userData: res.data});
          console.log(res.data);
          axios.get(res.data.followers_url)
            .then(res2 => {
              this.setState({followers: res2.data});
              console.log(res2.data);
            });
        });
    };
    response();
  }

  render() {
    if(!this.state.userData) return <div>Loading...</div>;
    return (
        <ProfileDiv className='profile'>
          <div className='head'>
            <div className='avatar-container'>
              <img src={this.state.userData.avatar_url} alt='User' />
            </div>
            <div className='title-container'>
              <h2 className='user-name'>{this.state.userData.name}</h2>
              <h5 className='user-login'>{this.state.userData.login}</h5>

            </div>
          </div>
          <div className='body'>
            <div className='bio'>{this.state.userData.bio}</div>
            <div className='followers'>
              <h3>Followers</h3>
              <FollowersDiv className='followers-container'>
                {this.state.followers.length ? this.state.followers.map(f => <Follower key={f.login} follower={f} />) : <div>Loading...</div>}
              </FollowersDiv>
            </div>
          </div>
        </ProfileDiv>
    );
  }
}