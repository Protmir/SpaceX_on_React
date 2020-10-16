import React from 'react';

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";

import FetchData from "./service/fetchData";

import './style.css'

class App extends React.Component {

    fetchData = new FetchData()

    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rocketName: [],
        companyContacts: null
    }

    componentDidMount() {
        this.updateRocket()
        this.updateCompanyContacts()
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

    updateCompanyContacts() {
        this.fetchData.getCompany()
            .then(data => {
                this.setState({ companyContacts: data.links})
            })
    }

    changeRocket = rocket => {
        this.setState({
            rocket
        }, this.updateRocket)
    }

    render() {
        console.log(this.state.companyContacts)
        return (
            <>
                <Header rocketName={this.state.rocketName} changeRocket={this.changeRocket}/>
                <Main rocket={this.state.rocket}/>
                {this.state.rocketFeatures && <Features rocketFeatures={this.state.rocketFeatures} />}
                {this.state.companyContacts && <Footer companyContacts={this.state.companyContacts}/>}
            </>
        )
    }
}

export default App;
