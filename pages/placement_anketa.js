import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Head from '../components/head';
import Page from '../layouts/main';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

class Anketa extends React.Component {
    state = {
        openDate: new Date(2019, 11, 1),
        openTime: new Date(2019, 1, 1, 9, 0),
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
        const openDate = `${openDateObj.getDate()}.${openDateObj.getMonth()}.${openDateObj.getFullYear()}`;
        const openTime = this.state.openTime.getHours();
        const closeTime = this.state.closeTime.getHours();
        const square = this.state.square;
        const visibility = this.state.visibility.value;
        const entryConvenience = this.state.entryConvenience.value;

        // TODO: Set correct endpoint
        const res = await fetch("http://vm764532.had.su:8080/", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                placement: {
                    lat,
                    lon,
                    openDate,
                    openTime,
                    closeTime,
                    square,
                    visibility,
                    entryConvenience

                }
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!res.ok) {
            console.log(res);
            throw new Error(`Could not fetch cause ${res.status}`)
        }
        const data = await res.json();
        console.log(data);
        // TODO: handle redirect
        return data;
    };

    handleChange = (field, value) => {
        console.log(field, value);
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
                                <label> Время открытия</label>
                                <DatePicker
                                    selected={this.state.openTime}
                                    onChange={date => this.handleChange( 'openTime', date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <div className="form-group">
                                <label> Время закрытия</label>
                                <DatePicker
                                    selected={this.state.closeTime}
                                    onChange={date => this.handleChange( 'closeTime', date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            <div className="form-group">
                                <label> Видимость вывески</label>
                                <Select
                                    value={this.state.visibility}
                                    onChange={value => this.handleChange('visibility', value)}
                                    options={this.visibilityOptions}
                                />
                            </div>
                            <div className="form-group">
                                <label> Удобство входа</label>
                                <Select
                                    value={this.state.entryConvenience}
                                    onChange={value => this.handleChange('entryConvenience', value)}
                                    options={this.entryConvenienceOptions}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.submit}>Зарегистрировать помещение</button>
                        </form>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default Anketa;