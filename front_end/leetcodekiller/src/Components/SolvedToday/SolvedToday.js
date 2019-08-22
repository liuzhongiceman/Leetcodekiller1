import React from "react";
import { Table } from 'antd';

class SolvedToday extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch("/getSolvedProblems")
            .then(res => res.json())
            .then(data => this.setState({data}))
    }
   
    render(){
        const columns = [
            {
                title: 'Problem Number Or Name',
                dataIndex: 'number',
                width: 120,
            },
            {
                title: 'Difficulty Level',
                dataIndex: 'level',
                width: 80,
            },
            {
                title: 'Round',
                dataIndex: 'round',
                width: 80,
            },
             {
                title: 'Method',
                dataIndex: 'method',
                width: 80,
            },
              {
                title: 'Link',
                dataIndex: 'link',
                width: 80,
            }
        ];
        const { data } = this.state;

        const dataSrouce = [];
        if (data){
            for (let i = data.length-1; i >=0; i--) {
                        dataSrouce.push({
                            id: data[i]._id,
                            number: data[i].number,
                            level: data[i].difficulty,
                            round: data[i].round,
                            method: data[i].method,
                            link: data[i].link? <a href={data[i].link} target="_blank" rel="noopener noreferrer"  >link</a>: null,
                        });
                    }
        }
              
        return (
            <div className="form-display">
                <h3> {dataSrouce.length} Problems Solved Today</h3>
                <Table columns={columns} dataSource={dataSrouce} pagination={{ pageSize: 10 }} scroll={{ y: 650 }} rowKey="number" />
            </div>
        )
    }
}

export default SolvedToday;
