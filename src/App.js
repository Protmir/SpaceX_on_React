import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Details from "./components/details/Details";

import FetchData from "./service/fetchData";

import './style.css'

class App extends React.Component {

    fetchData = new FetchData()

    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rocketName: [],
        companyInfo: null,
        launchesId: null
    }

    componentDidMount() {
        this.updateRocket()
        this.updateCompanyInfo()
    }

    updateRocket() {
        this.fetchData.getRocket()
            .then(data => {
                this.setState({ rocketName: data.map(item => item.name) })
                return data
            })
            .then(data => data.find(item => item.name === this.state.rocket))
            .then(rocketFeatures => this.setState({ rocketFeatures }))
    }

    updateCompanyInfo() {
        this.fetchData.getCompany()
            .then(data => {
                this.setState({ companyInfo: data })
            })
    }

    changeRocket = rocket => {
        this.setState({ rocket }, this.updateRocket)
    }

    updateLaunchesInfo() {
        this.fetchData.getLaunches()
            .then(data => {
                this.setState({ launchesId: data.map(item => item.id) })
            })
    }

    render() {
        return (
            <BrowserRouter>
                <Header rocketName={this.state.rocketName} changeRocket={this.changeRocket}/>

                <Route exact
                    path={'/'}
                    render={() => this.state.companyInfo &&
                        <Home company={this.state.companyInfo} />}
                />

                <Route
                    path={'/rocket'}
                    render={({ match }) => this.state.rocketFeatures &&
                        <Features rocketFeatures={this.state.rocketFeatures} match={match} />}
                />

                <Route path={'/calendar'} component={Calendar} />
                <Route path={'/details/:id'} component={Details} />

                {this.state.companyInfo && <Footer companyInfo={this.state.companyInfo}/>}
            </BrowserRouter>
        )
    }
}

export default App;
