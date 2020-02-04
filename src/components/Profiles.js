import React, { Component } from "react";

export default class Profiles extends Component {
  state = {
    profiles: [],
    viewLogged: false
  };
  async componentDidMount() {
    const res = await fetch("/profiles");
    const profiles = await res.json();

    this.setState({ profiles });
  }

  handleClick = async id => {
    let view = { profileId: id, timestamp: Date.now() };
    this.setState({ viewLogged: true });
    const res = await fetch("/views", {
      method: "POST",
      body: JSON.stringify(view),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    this.setState({ viewLogged: false });

    console.log(data);
  };
  render() {
    const { profiles } = this.state;
    return (
      <div className="container">
        {this.state.viewLogged ? (
          <div className="row ">
            <h1>logging the profile view.....</h1>
          </div>
        ) : (
          <div className="row mt-20">
            {profiles.map(({ id, title, thumbnailUrl }) => (
              <div
                className="card col-3 mx-4 my-4"
                key={id}
                onClick={() => this.handleClick(id)}
              >
                <img src={thumbnailUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
