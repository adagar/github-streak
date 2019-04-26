//rce

import React, { Component } from "react";
import Yesterday from "./functions/Yesterday";

class Streak extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      user: "adagar",
      contributions: [],
      streak: 0
    };
  }
  seekUser = () => {
    //new user, new streak
    this.setState({
      streak: 0
    });
    const user = this.state.user;
    console.log(user);
    //pagination example https://api.github.com/users/${user}/events?page=3
    const fetchReq = `https://api.github.com/users/${user}/events?page=1`;

    fetch(fetchReq)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ contributions: json });
        this.countStreak();
      });
  };

  handleChange = (e) => {
    this.setState({
      user: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.seekUser();
  };

  countStreak = () => {
    console.log("Counting streak");
    const today = new Date();
    let formattedDate =
      ("0" + today.getFullYear()).slice(-4) +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    let lastContributeDate = null;
    let userContributions = this.state.contributions;
    console.log(this.state.contributions);
    for (let i = 0; i < userContributions.length; i++) {
      let event = userContributions[i];
      let evtDate = event.created_at.slice(0, 10);
      let streak = this.state.streak;
      if (lastContributeDate) {
        //what was day before last contribute
        let priorDay = Yesterday(lastContributeDate);
        console.log(
          "Previous day:",
          priorDay,
          "Last Contribute:",
          lastContributeDate,
          "This event:",
          evtDate
        );
        if (evtDate === lastContributeDate) {
          //same day contribution
          console.log("another contribution, same day");
        } else if (evtDate === priorDay) {
          //next day contribution
          console.log("Additional streak day!");
          streak += 1;
          lastContributeDate = priorDay;
        } else {
          //Streak broken!
          console.log("streak broken, you didn't code on", priorDay);
          //streak = 0;
          break;
        }
      } else {
        console.log(formattedDate, evtDate);
        if (formattedDate === evtDate) {
          //they had activity today!
          console.log("first contribute today");
          lastContributeDate = formattedDate;
          streak += 1;
        }
      }
      this.setState({
        streak: streak
      });
    }
  };

  render() {
    const githubEvents = this.state.contributions.length ? (
      this.state.contributions.map((event) => {
        return (
          <div key={event.id}>
            <p>{event.repo.name}</p>
            <p>{event.created_at}</p>
          </div>
        );
      })
    ) : (
      <div>No events found</div>
    );
    return (
      <div className="Streak">
        <h1>{this.state.streak}</h1>
        <form onSubmit={this.handleSubmit} className="input-field">
          <i class="prefix material-icons">person</i>
          <label className="black-text">Look up user:</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
          />
        </form>
        {/*githubEvents*/}
      </div>
    );
  }
}

export default Streak;
