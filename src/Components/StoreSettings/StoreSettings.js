import React, { useState } from 'react';
import { Select, Radio, Typography, Input, Button, Space ,Divider} from 'antd';
import Flag from 'react-country-flag';

const { Title, Text } = Typography;
const { Option } = Select;
 
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  // Add more countries as needed
];

const NumberInputWithButtons = ({ count, onIncrement, onDecrement, onChange, onOperatorChange }) => {
  return (
    <Space>
      <Select defaultValue="+" style={{ width: 80 }} onChange={onOperatorChange}>
        <Option value="+">+</Option>
        <Option value="-">-</Option>
      </Select>
      <Button type="primary" onClick={onDecrement}>-</Button>
      <Input
        style={{ width: 50, textAlign: 'center' }}
        value={count}
        onChange={onChange}
      />
      <Button type="primary" onClick={onIncrement}>+</Button>
    </Space>
  );
};

const GlobalPricingRules = () => {
  const [currency, setCurrency] = useState('USD');
  const [pricingRule, setPricingRule] = useState('default');
  const [costPrice, setCostPrice] = useState(0);
  const [operator, setOperator] = useState('+');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [autoUpdateOption, setAutoUpdateOption] = useState('option1');

  const handleRadioChange = (e) => {
  setAutoUpdateOption(e.target.value);
  };
  const currencyOptions = [
    { code: 'USD', name: 'USD' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound ' },
    // Add more currencies as needed
  ];

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const handlePricingRuleChange = (value) => {
    setPricingRule(value);
  };

  const handleCostPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCostPrice(value);
    }
  };

  const handleOperatorChange = (value) => {
    setOperator(value);
  };

  const handleIncrement = () => {
    setCostPrice(operator === '+' ? costPrice + 1 : costPrice - 1);
  };

  const handleDecrement = () => {
    setCostPrice(operator === '+' ? costPrice - 1 : costPrice + 1);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  return (
    <>
      <div style={{padding:"20px"}}>
    <Title level={2} style={{marginBottom:'30px'}}>Auto Update Setting</Title>
    <Text strong>When inventory changes</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">
          Do Nothing</Radio>
        <Radio value="option2">
          Auto Update</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>When product is no longer available</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">
          Do Nothing</Radio>
        <Radio value="option2">

          Unpublish Product</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>When variant is no longer availabl</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">
          Do Nothing</Radio>
        <Radio value="option2">

          Set to Zero</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>Whether customers are allowed to place an order for the product variant when it's out of stock</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">
          Yes</Radio>
        <Radio value="option2">

          No</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>Product added to import list mode</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">
          Single Color
        </Radio>
        <Radio value="option2">


          Multiple Colors</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>Automatically synchronize orders</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">

          Do Nothing
        </Radio>
        <Radio value="option2">



          Auto</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>When order shipment status changes</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">


          Do Nothing
        </Radio>
        <Radio value="option2">




          Auto Update</Radio>
      </Radio.Group>
    </div>
  </div>
  <div style={{padding:"20px"}}>

    <Text strong>Display pre-sale products on the Find Products page.</Text>

    <div style={{ marginTop: '16px' }}>
      <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
        <Radio value="option1">


          Yes
        </Radio>
        <Radio value="option2">




          No</Radio>
      </Radio.Group>
    </div>
  </div>
  <Divider />
      <div>
        <h3 strong>Global Pricing Rules</h3>
        <p>Default Rules</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <Title level={5}>Your Store Currency:</Title>
            <Select
              style={{ width: '100%' }}
              value={currency}
              onChange={handleCurrencyChange}
            >
              {currencyOptions.map((currency) => (
                <Option key={currency.code} value={currency.code}>
                  <Flag code={currency.code} style={{ marginRight: '8px' }} />
                  {currency.name}
                </Option>
              ))}
            </Select>
          </div>


        </div>
        <div>
          <Title level={5}>Pricing Rules:</Title>
          <Radio.Group
            value={pricingRule}
            onChange={(e) => handlePricingRuleChange(e.target.value)}
          >
            <Radio value="default">Default</Radio>
            <Radio value="advanced">Advanced</Radio>
          </Radio.Group>
        </div>
      </div>

      {/* Cost Price section with increment/decrement */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '2%' }}>
        <Text style={{ marginTop: 5 }}>Suggested Price</Text>
        <Text style={{ marginTop: 5 }}>Cost Price</Text>
        <NumberInputWithButtons
          count={costPrice}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onChange={handleCostPriceChange}
          onOperatorChange={handleOperatorChange}
        />
        <Text style={{ marginTop: 5 }}> +</Text>
        <Text style={{ marginTop: 5 }}>Shipping Cost</Text>
        <Text style={{ marginTop: 5 }}> =</Text>
        <Text style={{ marginTop: 5 }}>Suggested Price</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '2%' }}>
        <Text style={{ marginTop: 5 }}>Compare a Price</Text>
        <Text style={{ marginTop: 5 }}>Cost Price</Text>
        <NumberInputWithButtons
          count={costPrice}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onChange={handleCostPriceChange}
          onOperatorChange={handleOperatorChange}
        />
        <Text style={{ marginTop: 5 }}> +</Text>
        <Text style={{ marginTop: 5 }}>Shipping Cost</Text>
        <Text style={{ marginTop: 5 }}> =</Text>
        <Text style={{ marginTop: 5 }}>Compare at Price</Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text>If you are confused about how to set the price. Pls click the link to check the Shipping Cost Range : https://www.shewin.com/h-shippingTool-default.html</Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text >Main Sales Country: </Text>
        <div> <Select

          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select a country"
          style={{ width: '20%', marginTop: 10 }}
        >
          {countries.map((country) => (
            <Option key={country.code} value={country.code}>
              <Flag code={country.code} style={{ marginRight: '8px' }} />
              {country.name}
            </Option>
          ))}
        </Select></div>
      </div>
      <div style={{padding:"20px"}}>

<Text strong>Default shipping method</Text>

<div style={{ marginTop: '16px' }}>
  <Radio.Group onChange={handleRadioChange} value={autoUpdateOption}>
    <Radio value="option1">
     
Standard Shipping
    </Radio>
    <Radio value="option2">


     
Express Shipping</Radio>
  </Radio.Group>
</div>
</div>
<Divider/>
<div>
  <h4>Notification Setting</h4>
  <p>All above updates, please email to</p>
  <Input placeholder="Enter email" style={{ width:'40%' }} />

  <p> <Button type="primary" >SAVE SETTINGS</Button></p> 
</div>
    </>
  );
};

export default GlobalPricingRules;
