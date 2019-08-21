import React from 'react';
import { BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar/Navbar';
import { Layout} from 'antd';
import AboutMe from "./Pages/AboutMe"
import Instruction from "./Pages/Instruction"
import ViewAll from "./Pages/ViewAll"
import Customize from "./Pages/Customize"

const { Footer } = Layout;

export default class App extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          data: [],
          rule:{},
          defaultRule:{
             rule1:"3",
            rule2:"7",
            rule3:"7",
            rule4:"7",
            rule5:"7",
            rule6:"15",
            rule7:"30",
            rule8:"60"
          }
      };
    }

    componentDidMount() {
         fetch("/getAllProblems")
            .then(res => res.json())
            .then(data => this.setState({ data }))

        fetch("/getRules")
            .then(res => res.json())
            .then(rule => this.setState({ rule }))      
    }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
            <Navbar />
            <br/>
            <br/>
            <Switch>
                <Route exact path='/' 
                      render={(routeProps) => (<Home data={this.state.data} rule={this.state.rule.rule1? this.state.rule: this.state.defaultRule} />)}/>
                <Route path="/home" 
                      render={(routeProps) => (<Home data={this.state.data} rule={this.state.rule.rule1? this.state.rule: this.state.defaultRule}/>)}/>
                <Route path="/aboutMe" component={AboutMe}/>
                <Route path="/instruction" component={Instruction}/>
                <Route path="/customize" 
                       render={(routeProps) => (<Customize rule={this.state.rule.rule1? this.state.rule: this.state.defaultRule}/>)}/>
                <Route path="/viewAll" 
                      render={(routeProps) => (<ViewAll data={this.state.data} rule={this.state.rule.rule1? this.state.rule: this.state.defaultRule}/>)}/>
            </Switch>
        </BrowserRouter>
        <Footer style={{ textAlign: 'center', position: "sticky", bottom: "0" }}> ©2019 Created by NEU Student Zhong Liu</Footer>
      </div>
    )
  }
}

