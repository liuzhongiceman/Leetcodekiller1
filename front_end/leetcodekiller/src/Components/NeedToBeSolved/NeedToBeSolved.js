import React from "react";
import { Table } from 'antd';


class NeedToBeSolved extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch("/needToBeSolved")
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }


    render() {
        var m = new Date();
        var month = '' + (m.getMonth() + 1);
        var day = '' + m.getDate();
        var year = m.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var date = [year, month, day].join('-');
        var res = [];
    
        for(var i=0;i<this.props.data.length;i++){
            var diff =  Math.floor(( Date.parse(date) - Date.parse(this.props.data[i].date) ) / 86400000);
            var el = this.props.data[i];
            var rule = this.props.rule;
            
            if ((el.method === "answer" && el.round === 1 && diff >= rule.rule1) || 
                (el.method === "answer" && el.round === 2 && diff >= rule.rule2) ||
                (el.method === "answer" && el.round === 3 && diff >= rule.rule3) ||
                (el.method === "answer" && el.round === 4 && diff >= rule.rule4) ||
                (el.method === "self" && el.round === 1 && diff >= rule.rule5) || 
                (el.method === "self" && el.round === 2 && diff >= rule.rule6) ||
                (el.method === "self" && el.round === 3 && diff >= rule.rule7) ||
                (el.method === "self" && el.round === 4 && diff >= rule.rule8) ){
                res.push(el);
		    }
        }
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
            },
             {
                title: 'Last Submitted Date',
                dataIndex: 'date',
                width: 120,
            },
        ];

        const dataSrouce = [];
        for (let i = res.length-1; i >=0;  i--) {
            dataSrouce.push({
                id: res[i]._id,
                number: res[i].number,
                level: res[i].difficulty,
                round: res[i].round,
                method: res[i].method,
                link: res[i].link? <a href={res[i].link} target="_blank" rel="noopener noreferrer" >link</a>: null,
                date: res[i].date,
            });
        }
        if (!res) return null;
        return (
            <div className="form-display">
                <h3>{res.length} Problems Need to Be Reviwed</h3>
                 <Table columns={columns} dataSource={dataSrouce} pagination={{ pageSize: 10 }} scroll={{ y: 550 }} rowKey="number" />
            </div>
        )
    }
}

export default NeedToBeSolved;
