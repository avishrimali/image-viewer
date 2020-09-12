import React, { Component } from "react";
import Header from "../../common/header/Header";
import ImageCard from "./ImageCard";
import Container from "@material-ui/core/Container";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: {
          full_name: 'avinsha shrimali',
          profile_picture: ''
      },
      userData: null,
      filterData: [],
      userMediaData: [],
        stateChange: false,
      searchValue: ""
    };
    this.getMediaDetails = this.getMediaDetails.bind(this);
    this.getMediaIds = this.getMediaIds.bind(this);
  }

  getUserProfileDetails() {
    fetch(
      this.props.baseUrl +
      "?access_token=" +
      sessionStorage.getItem("access-token")
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({ userProfileData: result.data });
        },
        error => {
          console.log("error...", error);
            this.props.history.push("/login");
        }
      );
  }

  getMediaIds() {
    this.setState({userMediaData: []})
    fetch(
      this.props.baseUrl +
      "me/media?fields=id,caption&access_token=" +
      sessionStorage.getItem("access-token")
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            userData: result.data
          });
          this.getMediaDetails(result.data, this.props.baseUrl)
        },
        error => {
          console.log("error...", error);
            this.props.history.push("/login");
        }
      );
  }
 getMediaDetails = (data, baseUrl) => {
   let detailsData = [];
    data.forEach(value => {
      if(value.id) {
        const url = baseUrl +  value.id +
            "?fields=id,media_type,media_url,username,timestamp&access_token=" +
            sessionStorage.getItem("access-token");
        fetch(url)
            .then(res => res.json())
            .then(
                result => {
                  const data = result;
                    data["caption"] = value.caption;
                  detailsData.push(data);
                 this.state.userMediaData.push(result);
                //  this.setState({
                //      stateChange: !this.state.stateChange,
                //      filterData: this.state.userMediaData
                //  })
                },
                error => {
                  console.log("error...", error);
                  this.props.history.push("/login");
                }
            );
      }

    });
  };

  componentDidMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push("/");
    }
    this.getUserProfileDetails();
    this.getMediaIds();
  }
  render() {
    return (
      <div>
        <Header
          {...this.props}
          showSearchBar={true}
          searchChangeHandler={this.searchChangeHandler}
        />
        <Container maxWidth="xl">
          <ImageCard data={this.state.filterData}/>
        </Container>
      </div>
    );
  }

  searchChangeHandler = event => {
    this.setState({ searchValue: event.target.value });
    if (event.target.value) {
      // eslint-disable-next-line
      const filterValue = this.state.filterData.filter(data => {
        if (
          data.caption.split("#")[0].indexOf(this.state.searchValue) > -1
        ) {
          return data;
        }
      });
      this.setState({ filterData: filterValue });
    } else {
      this.setState({ filterData: this.state.userMediaData });
    }
  };
}

export default Home;