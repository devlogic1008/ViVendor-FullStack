import React from 'react';
import { List ,Divider} from 'antd';
import "./CourierService.css"
const CourierService = () => {
  const data = [
    'Royal Mail',
    'UPS',
    'Canada Post',
    'China Post',
    'FedEx',
    'PostNord',
    'USPS',
    'DHL Express',
    'DHL eCommerce',
    'DHL eCommerce Asia',
    'Eagle',
    'Purolator',
    'Australia Post',
    'New Zealand Post',
    'Correios',
    'La Poste',
    'TNT',
    'Whistl',
    '4PX',
    'APC',
    'FSC',
    'GLS',
    'GLS (US)',
    'Globegistics',
    'Amazon Logistics US',
    'Amazon Logistics UK',
    'Bluedart',
    'Delhivery',
    'Japan Post (EN)',
    'Japan Post (JA)',
    'Sagawa (EN)',
    'Sagawa (JA)',
    'Singapore Post',
    'Yamato (EN)',
    'Yamato (JA)',
    'DPD',
    'DPD UK',
    'DPD Local',
    'Newgistics',
    'SF Express',
    'PostNL',
    'YunExpress',
    'Chukou1',
    'Anjun Logistics',
    'SFC Fulfillment',
    'Canpar',
    'Sendle',
    'Couriers Please',
    'Toll IPEC',
    'StarTrack',
    'Hermes UK',
    'Colissimo',
    'Poste Italiane',
    'Other',
  ];

  return (
    <div>
    <h2>Courier Service Providers</h2>
    <Divider />
  <div >
  <List
 
      className="hoverable-list" // Add a class for styling
     
      dataSource={data}
      renderItem={(item) => <List.Item  style={{padding:'10px 10px 10px 20px'}}>{item}</List.Item>}
    />
  </div>
  </div>
  
  );
};

export default CourierService;
