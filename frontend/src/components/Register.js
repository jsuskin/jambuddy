import React, { Component } from 'react';

const rouseyImages = [
  "https://scontent-lga3-1.cdninstagram.com/vp/254d3d4a75b8e04b86a1aed8b5efbf87/5DE5EA0D/t51.2885-15/sh0.08/e35/s640x640/66444005_480945515800468_1575715880854243449_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
  "https://scontent-lga3-1.cdninstagram.com/vp/6a92098f8be4c86eaa267ec37bdc2cd6/5E165B8B/t51.2885-15/sh0.08/e35/s640x640/64822015_2541562016071287_5369077443792912396_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
  "https://scontent-lga3-1.cdninstagram.com/vp/4d3ad1b2f27e2bdd6538adaab811fb31/5E14F49D/t51.2885-15/e35/66410694_1077196489157748_1457951516091021148_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
  "https://scontent-lga3-1.cdninstagram.com/vp/3d804c4d462c35c9bdf837f87d55a78f/5DD35AEF/t51.2885-15/e35/61481823_696969634107724_8752768141952966407_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
  "https://scontent-lga3-1.cdninstagram.com/vp/ac94511c9f4cbcc1cffe6adbe01ad2e1/5DD02D6B/t51.2885-15/e35/61084988_153807472334174_8764359358839396915_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
]

export default class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmation: '',
    image: '',
    new_user_id: null,
    user_location: {
      latitude: 0,
      longitude: 0
    }
  }

  componentWillUpdate() {
    this.getGeoLocation();
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation()
      this.setState({ isMarkerShown: true })
    }, 5000)
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            user_location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
        }
      )
    } else {
      console.log('error')
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    if(!!this.state.username && !!this.state.password && this.state.password === this.state.confirmation) {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          image: !this.state.image ? rouseyImages[Math.floor(Math.random() * rouseyImages.length)] : this.state.image
        })
      }).then(res => res.json()).then(data => this.setState({new_user_id: data.id}, () => {
        fetch('http://localhost:3000/user_locations', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: this.state.new_user_id,
            latitude: this.state.user_location.latitude,
            longitude: this.state.user_location.longitude
          })
        })
      }));
    } else { alert("Please enter username and password.") }
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleRegister}>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" onChange={this.handleChange} />
          <br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" onChange={this.handleChange}/>
          <br />
          <label htmlFor="confirmation">Confirm Password</label><br />
          <input type="password" name="confirmation" id="confirmation" onChange={this.handleChange}/>
          <br />
          <label htmlFor="image-url">Link to Image (optional)</label><br />
          <input type="url" name="image-url" id="image-url" onChange={this.handleChange} />
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
