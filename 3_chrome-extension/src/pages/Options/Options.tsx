import React, { useEffect } from 'react';
import './Options.css';
import * as tf from '@tensorflow/tfjs';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [geoApiKey, setGeoApiKey] = React.useState('');
  const [modelInfo, setModelInfo] = React.useState('');

  useEffect(() => {
    setGeoApiKey(localStorage.getItem('geoApiKey') || '');
    setModelInfo(localStorage.getItem('modelInfo') || '');
  }, []);

  const OnGeoApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    localStorage.setItem('geoApiKey', value);
    setGeoApiKey(localStorage.getItem('geoApiKey') || '');
  };

  const uploadModel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const model = await tf.loadLayersModel(tf.io.browserFiles([files[0]]));
      await model.save('localstorage://aiModel');
      localStorage.setItem('modelInfo', `Model uploaded at ${new Date().toLocaleString()}`);
      setModelInfo(localStorage.getItem('modelInfo') || '');
    }
  };

  return (
    <>
      <div className="OptionsContainer">
        <h3>{title} Page</h3>
      </div>
      <div className="w-100" onClick={() => window.open("https://ipgeolocation.io/")}><h3>GEO API KEY (click here to get one)</h3></div>
      <div className="w-100">
        <input type="text" value={geoApiKey} onChange={OnGeoApiKeyChange} />
      </div>
      <div className="w-100"><h3>{modelInfo}</h3></div>
      <div className="w-100">
        <label htmlFor="file-upload" className="custom-file-upload">
          Upload model
        </label>
        <input id="file-upload" type="file" onChange={uploadModel} />
      </div>
      <div className="w-100">
        <p>P.s. Update extension after changes</p>
      </div>
    </>
  );
};

export default Options;
