import React from 'react';
import ProblemForm from '../Components/ProblemForm/ProblemForm';
import SolvedToday from '../Components/SolvedToday/SolvedToday';
import NeedToBeSolved from '../Components/NeedToBeSolved/NeedToBeSolved';
import DeleteForm from '../Components/DeleteForm/DeleteForm';
import giphy from "..//Assets/images/giphy.gif";
import {Row, Col} from 'antd';

export default class Home extends React.Component{
    render(){
        const style = {
            width:"100px"
        }
        // console.log("this.props.rule",this.props.rule)
        return(
            <div className="main">
                <Row justify="space-around" align="middle">
                    <h2 className="text-display"> 
                        <img src={giphy} style={style} alt="fun images"/> 
                        You Are Doing Great! You have finished  {this.props.data? this.props.data.length: 0} Algorithms!
                    </h2> 
                </Row>
                <hr className="hrstyle"/>
                <Row justify="space-around" align="middle">
                    <ProblemForm data={this.props.data ? this.props.data : {"number": "sample"}}/>
                </Row>
                <hr className="hrstyle"/>
                
                {/* <Row type="flex" justify="space-around" align="middle" >
                    <Col span={8}>
                       <NeedToBeSolved data={this.props.data? this.props.data : {"number": "sample"}} rule={this.props.rule}/>
                    </Col>
                    <Col span={8}>
                        <SolvedToday />
                    </Col>
                </Row> */}
                <Row  type="flex" justify="space-around" align="middle">
                    <Col span={10} >
                       <NeedToBeSolved data={this.props.data? this.props.data : {"number": "sample"}} rule={this.props.rule}/>
                    </Col>
                    <Col span={10}>
                        <SolvedToday />
                    </Col>
                </Row>
                <hr className="hrstyle"/>
                <Row justify="space-around" align="middle">
                    <DeleteForm data={this.props.data ? this.props.data : {"number": "sample"}}/>
                </Row>
            </div>
        )
    }
}

