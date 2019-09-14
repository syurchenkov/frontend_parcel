import {YMaps, Map, Placemark} from 'react-yandex-maps';
import Head from '../components/head';
import Page from '../layouts/main';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Mapa = (props) => {
    return (<YMaps>
        <div>
            <Map
                defaultState={{center: [55.75, 37.57], zoom: 9}}
                width={1000}
                height={700}
                modules={['geocode',  'geoObject.addon.balloon', 'geoObject.addon.hint']}
                onClick={props.onPoint} >
                {props.marks.map(mark => (
                    <Placemark
                        defaultGeometry={[mark.lat, mark.lon]}

                        properties={{
                            balloonContentHeader: mark.name,
                            balloonContentBody: mark.category,
                            hintContent: mark.name
                        }}
                    />

                ))}
            </Map>
        </div>
    </YMaps>);
};

class Form extends React.Component {
    state = {
        apteki: false,
        kafe: false,
        tc: false,
        produkty: false,
        flowers: false,
        banks: false,
        bar: false,
        markets: false
    };

    handleCheckbox = (event) => {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    createInput = (name, label) => {
      return (
          <div className="form-group form-check">
              <input type="checkbox"
                     className="form-check-input"
                     name={name} checked={this.state[name]}
                     onChange={this.handleCheckbox}
              />
              <label className='form-check-label' >{label}</label>
          </div>
      );
    };

    submit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    };

    render() {
        return(
            <div>
                <form className="form-checker">
                    <h4> Типы организаций </h4>
                    { this.createInput("apteki", "Аптеки") }
                    { this.createInput("kafe", "Кафе") }
                    { this.createInput("tc", "Торговые центры") }
                    { this.createInput("produkty", "Продуктовые магазины") }
                    { this.createInput("flowers", "Магазины цветов") }
                    { this.createInput("banks", "Банки/Банкоматы") }
                    { this.createInput("bar", "Бары") }
                    { this.createInput("markets", "Рынки") }
                    <button type="submit" className="btn btn-primary" onClick={this.submit}>Показать на карте</button>
                </form>
                <style jsx>{`
                    .form-checker {
                        margin-left: 20px;
                        border: solid 1px gray;
                        padding: 10px;
                    }
                `}</style>
            </div>
        );
    }
};


class Geoanalitix extends React.Component {
    state = {
        point: [], // [lat, lon]
        apteki: false,
        kafe: false,
        tc: false,
        produkty: false,
        flowers: false,
        banks: false,
        bar: false,
        markets: false,
        organizations: []
    };

    static async geocode(coords) {
       const api_key = '9f4e1c45-0d72-4eed-b8ac-d2883848a134';
       const res = await fetch(`https://geocode-maps.yandex.ru/1.x?api_key=${api_key}&geocode=${coords[1]},${coords[0]}&format=json`);
       const data = await res.json();
       console.log(data);
       if(data['error'] !== undefined) {
           return null;
       }

       const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

       return address;
    };


    openPoint = (e) => {
        const map = e.get('target');
        const coords = e.get('coords');
        if (!map.balloon.isOpen()) {
            this.setState({point: coords});
            Geoanalitix.geocode(coords).then(address => {
                if(address != null) {
                    map.balloon.open(coords, {
                        contentHeader: address,
                        contentBody: 'o'
                    });
                }
            });
        } else {
            map.balloon.close();
        }
    };

    getOrganizations = async () => {
        // const res = await fetch("http://vm764532.had.su:8080/organizations", {
        //     method: 'POST',
        //     mode: 'cors',
        //     body: JSON.stringify({
        //         coordinates: {
        //             lat: this.state.point[0],
        //             lon: this.state.point[1]
        //         },
        //         category: ["Магазин продуктов"]
        //     })
        // });
        // if(!res.ok) {
        //     console.log(res);
        //     throw new Error(`Could not fetch cause ${res.status}`)
        // }
        // const data = await res.json();
        // console.log(data);
        return(
            [
                {
                    "name": "Продукты",
                    "category": "Магазин продуктов",
                    "lat": 55.40894100000001,
                    "lon": 37.187666
                },
                {
                    "name": "Элинар",
                    "category": "Магазин продуктов",
                    "lat": 55.414535,
                    "lon": 37.190304
                },
                {
                    "name": "АиР",
                    "category": "Магазин продуктов",
                    "lat": 55.411963,
                    "lon": 37.184144
                }
            ]
        );
    };

    updateMap = async () => {
        const organizations = await this.getOrganizations();
        return this.setState({ organizations: organizations })
    };


    static async getInitialProps({ query }) {
        console.log(query);
        const _test_data = [
            { x: 55, y: 37 }
        ];

        return { marks: _test_data };
    }

    render() {
        return(
            <Page>
                <Head title='geoanalictics'/>
                <Row>
                    <Col md={{ size: 2, offset: 1 }}>
                        <Form onSubmit={this.updateMap}/>
                    </Col>
                    <Col md={{size: 9}}>
                        <Mapa marks={this.state.organizations} onPoint={this.openPoint} />
                    </Col>
                    <Col md={{size: 9, offset: 3}}>
                        <h1>
                            {`${this.state.point[0]} ${this.state.point[1]}`}
                        </h1>
                    </Col>
                </Row>


            </Page>
        );
    }
}
export default Geoanalitix;