import React from 'react';
import { Row, Col } from 'reactstrap';
import Head from '../../components/head';
import Page from '../../layouts/main';
import {Line, HorizontalBar} from 'react-chartjs-2';

class PredictionChart extends React.Component {
    state = {
        labels: [
            'Nov',  'Dec', 'Jan', 'Feb',
            'Mar',  'Apr', 'May', 'June',
            'July', 'Aug', 'Sep', 'Oct'
        ],
        datasets: [
            {
                label: 'Доход',
                backgroundColor: 'rgba(81, 81, 232, 1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                lineTension: 0,
                data: [
                    9016623,  8648990, 10896723,
                    12293697, 12413922, 13953309,
                    12864996, 14352841, 13375091,
                    12882011, 12533434, 13298556
                ]
            }
        ]
    };

    render() {
        const yearSum = this.state.datasets[0].data.reduce((a, b ) => a + b, 0);
        return (
            <div>
                <h2> Прогнозируемый годовой доход {yearSum}</h2>
                <Line
                    data={this.state}
                    options={{
                        title:{
                            display:true,
                            text:'Прогнозируемый доход по месяцам',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );
    }
}

class FeatureChart extends React.Component {
    state = {
        labels: [
            'Feature#1',
            'Feature#2',
            'Feature#3',
            'Feature#4',
            'Feature#5',
            'Feature#6',
            'Feature#7',
            'Feature#8',
            'Feature#9',
            'Feature#10'
        ],
        datasets: [
            {
                backgroundColor: 'rgba(250, 10, 100, 1)',
                borderWidth: 2,
                lineTension: 0,
                data: [
                    5, -2, 3, 7
                    -6, 2, 4, 5,
                    -3, -4
                ]
            }
        ]
    };

    render() {
        return (
            <div>
                <HorizontalBar data={this.state} />
            </div>
        );
    }
}

class Placement extends React.Component {

    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    render() {
        return(
            <Page>
                <Head title="placement"/>
                <h3>
                    Placement #{this.props.id}
                </h3>
                <Row>
                    <Col md={{size: 6}}>

                        <PredictionChart/>
                    </Col>
                    <Col md={{size: 6}}>
                        {/*<FeatureChart/>*/}
                        <img src="/static/model.jpg" className="imageModel" />
                        <style jsx>{`
                            .imageModel {
                              width: 100%;
                            }
                            `}
                        </style>
                    </Col>
                </Row>

            </Page>
        );
    }
}

export default Placement;