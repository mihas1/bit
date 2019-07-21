import React, {Component} from 'react';
import {connect } from 'react-redux'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {addChartData} from '../redux.js'

class Chart extends Component {
  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    const {addChartDataAction} = this.props;

    fetch('https://api.blockchain.info/charts/market-price?cors=true&format=json&timespan=30days')
      .then((response) => response.json())
      .then((responseJson) => {
        addChartDataAction(responseJson);
      });
  }

  humanizeDate(date) {
    const {month} = this.props;

    if (date) {
      let _date = new Date(date * 1000);

      return `${_date.getDate()} ${month[_date.getMonth()]}`;
    }

    return date;
  }

  render() {
    const {values, unit = 'USD'} = this.props.chartData;

    return (
      <div className='chart'>
        <ResponsiveContainer>
          <LineChart data={values}>
            <Line
              type='monotone'
              dataKey='y'
              name={unit}
              stroke='#8884d8'
              label={false}
            />
            <XAxis
              dataKey='x'
              tickFormatter={(label) => this.humanizeDate(label)}
              tick={{ fontSize: 10 }}
              minTickGap={1}
            />
            <YAxis
              allowDecimals={false}
              tick={{fontSize: 10}}
            />
            <Tooltip content={({active, payload, label}) => {
              return active && payload ?
                `${this.humanizeDate(label)}: ${payload[0].value.toFixed()} ${payload[0].name}`
                :
                null
              ;
            }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    chartData: store.chartData,
    month: store.month
  }
};

const mapDispatchToProps = dispatch => ({
  addChartDataAction: response => dispatch(addChartData(response))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
