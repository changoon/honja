import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

import FixedHeader from './FixedHeader';
import ContactInputSection from './ContactInputSection';
import mapStyle1 from '../data/GoogleMapStyle1.json';

class ContactPage extends React.Component {
  render() {
    return (
      <div className={classnames('ContactPage', this.props.className)}>                
        <FixedHeader
          className="ContactPage-fixedHeader"
          targetClass={`ContactPage`}
          subtitle={<FormattedMessage id="ContactPage.header"/>}
        />
        <ContactInputSection/>
        <div className="ContactPage-maps">
          <div
            className="ContactPage-seoulMap"
            ref={(input) => { this._seoulMapNode = input; }}
          />
          <div
            className="ContactPage-usMap"
            ref={(input) => { this._usMapNode = input; }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._addMap(
      this._seoulMapNode,
      {
        lat: 37.5155512,
        lng: 127.0196313
      },
      {
        title: 'LJ PLUS, Seoul',
        line1: '3F, 8, Dosan-daero 6-gil, Gangnam-gu',
        line2: 'Seoul, Republic of Korea'
      }
    );
    this._addMap(
      this._usMapNode,
      {
        lat: 37.3198954,
        lng: -122.0293868
      },
      {
        title: 'LJ PLUS, California',
        line1: '10240 Danube Drive',
        line2: 'Cupertino, CA 95014'
      }
    );
  }

  _addMap = (mapNode, loc, address) => {
    const infowindow = new window.google.maps.InfoWindow({
      content: `
  <div class="ContactPage-infoWindow">
    <div class="ContactPage-infoTitle">${address.title}</div>
    <div class="ContactPage-infoLine1">${address.line1}</div>
    <div class="ContactPage-infoLine2">${address.line2}</div>
  </div>
`
    });
    const map = new window.google.maps.Map(mapNode, {
      zoom: 14,
      center: loc,
      scrollwheel: false,
      disableDefaultUI: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: mapStyle1
    });
    const marker = new window.google.maps.Marker({
      position: loc,
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
  };
}

export default ContactPage;
