import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Head from '../components/head';
import Page from '../layouts/main';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Router from 'next/router';

class Anketa extends React.Component {
    state = {
        openDate: new Date(2019, 11, 1),
        openTime: new Date(2019, 1, 1, 9, 0),
        workTime: 16,
        closeTime: new Date(2019, 1, 1, 20, 0),
        visibility: { value: 'outside_good', label: 'Снаружи хорошо заметна' },
        entryConvenience: { value: 'outside_good', label: 'Снаружи удобно' },
        square: 25
    };

    visibilityOptions = [
        { value: 'outside_good', label: 'Снаружи хорошо заметна' },
        { value: 'outside_bad', label: 'Снаружи плохо видна' },
        { value: 'inside_good', label: 'Внутри хорошо видна' },
        { value: 'inside_bad', label: 'Внутри плохо видна' },
    ];

    entryConvenienceOptions =[
        { value: 'outside_good', label: 'Снаружи удобно' },
        { value: 'outside_bad', label: 'Снаружи неудобно' },
        { value: 'inside_good', label: 'Внутри удобно' },
        { value: 'inside_bad', label: 'Внутри неудобно' },
    ];

    submit = async (e) => {
        e.preventDefault();

        const lon = this.props.lon;
        const lat = this.props.lat;
        const openDateObj = this.state.openDate;
        const open_date = `${openDateObj.getDate()}.${openDateObj.getMonth()}.${openDateObj.getFullYear()}`;
        const square = this.state.square;
        const work_time = this.state.workTime;
        const city = 'Москва';


        const requestJson = {
            lat,
            lon,
            open_date,
            square,
            work_time,
            city
        };
        console.log(requestJson);
        // TODO: Set correct endpoint
        const res = await fetch("http://vm764532.had.su:5000/get-organizations-rate", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(requestJson),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!res.ok) {
            console.log(res);
            throw new Error(`Could not fetch cause ${res.status}`)
        }
        const data = await res.json();

        const arr = data;
        Router.push(`/placement/1?arr=${arr}`);
    };

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    static async getInitialProps({ query }) {
        const lat = query.lat;
        const lon = query.lon;
        return({
            lat: lat,
            lon: lon
        });
    }

    render() {
        return(
            <Page>
                <Head title="placement_anketa"/>
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <form>
                            <div className="form-group">
                                <label> Дата открытия</label>
                                <br/>
                                <DatePicker
                                    selected={this.state.openDate}
                                    onChange={ date => this.handleChange('openDate', date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="form-group">
                                <label> Площадь помещения</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={this.state.square}
                                    onChange={ e => this.handleChange('square', e.target.value )}
                                />
                            </div>
                            <div className="form-group">
                                <label> Время работы</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={this.state.workTime}
                                    onChange={ e => this.handleChange('workTime', e.target.value )}
                                />
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <label> Время закрытия</label>*/}
                            {/*    <DatePicker*/}
                            {/*        selected={this.state.closeTime}*/}
                            {/*        onChange={date => this.handleChange( 'closeTime', date)}*/}
                            {/*        showTimeSelect*/}
                            {/*        showTimeSelectOnly*/}
                            {/*        timeIntervals={60}*/}
                            {/*        timeCaption="Time"*/}
                            {/*        dateFormat="h:mm aa"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <label> Видимость вывески</label>*/}
                            {/*    <Select*/}
                            {/*        value={this.state.visibility}*/}
                            {/*        onChange={value => this.handleChange('visibility', value)}*/}
                            {/*        options={this.visibilityOptions}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <label> Удобство входа</label>*/}
                            {/*    <Select*/}
                            {/*        value={this.state.entryConvenience}*/}
                            {/*        onChange={value => this.handleChange('entryConvenience', value)}*/}
                            {/*        options={this.entryConvenienceOptions}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <button type="submit" className="btn btn-primary" onClick={this.submit}>Зарегистрировать помещение</button>
                        </form>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default Anketa;