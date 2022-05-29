import React from 'react';
import './Popup.css';

function App() {

  const downloadHTMLs = () => {
    chrome.storage.local.get('visitedHTMLs', value => {
      console.log(value);
      downloadDataJSON(value.visitedHTMLs, 'visitedHTMLs');
    })
  }

  const downloadDataJSON = async (data, fileName) => {
    const a = document.createElement('a') // Create "a" element
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain" }) // Create a blob (file-like object)
    const url = URL.createObjectURL(blob) // Create an object URL from blob
    a.setAttribute('href', url) // Set "a" element link
    a.setAttribute('download', `${fileName}.json`) // Set download filename
    a.click() // Start downloading
  }

  const [urls, setUrls] = React.useState([])
  const [secure, setSecure] = React.useState([])
  const [check1, setCheck1] = React.useState("OpenResolver ⏳")
  const [check2, setCheck2] = React.useState("UPnP ⏳")
  const [check3, setCheck3] = React.useState("BotNet ⏳")
  const [check4, setCheck4] = React.useState("SSDP,OpenResolver,NTP,SNMP,CharGen ⏳")

  const tempUrls = [];
  const tempSecure = [];

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    credentials: "include",
    keepalive: true,
    mode: 'cors'
  }

  React.useEffect(() => {
    fetch("https://www.nksc.lt/tikrinti_open.html", requestOptions)
      .then(response => response.text())
      .then(result => result.includes('neaptikta') ? setCheck1("OpenResolver ✔️") : setCheck1("OpenResolver 💀"))
      .catch(error => console.log('error', error));

    fetch("https://www.nksc.lt/tikrinti_up.html", requestOptions)
      .then(response => response.text())
      .then(result => result.includes('neaptikta') ? setCheck2("UPnP ✔️") : setCheck2("UPnP 💀"))
      .catch(error => console.log('error', error));

    fetch("https://www.nksc.lt/tikrinti.html", requestOptions)
      .then(response => response.text())
      .then(result => result.includes('nebuvo užfiksuotas') ? setCheck3("BotNet ✔️") : setCheck3("BotNet 💀"))
      .catch(error => console.log('error', error));

    fetch("https://www.nksc.lt/tikrinti_s.html", requestOptions)
      .then(response => response.text())
      .then(result => result.includes('Neaptikta') ? setCheck4("SSDP,OpenResolver,NTP,SNMP,CharGen ✔️") : setCheck4("SSDP,OpenResolver,NTP,SNMP,CharGen 💀"))
      .catch(error => console.log('error', error));
    try {
      chrome.storage.local.get('visitedWebsites', value => {
        value.visitedWebsites && value.visitedWebsites.forEach(async (website) => {
          tempUrls.push(website);
          if (website.bad < 0.5) {
            tempSecure.push(website.bad);
          }
        })
      })
    } catch (e) {
      console.log(e);
    }
    setSecure(tempSecure);
    setUrls(tempUrls);
  }, [])
  return (
    <div className="App">
      <h1>NKSC checks 🕵🏼‍♂️</h1>
      <div>{check1}</div>
      <div>{check2}</div>
      <div>{check3}</div>
      <div>{check4}</div>

      {/* <h2>Most visited sites</h2>
      <div>🥇 {urls[0] && `${urls[0].url} | 🖱️ ${urls[0].numberOfVisits}`}</div>
      <div>🥈 {urls[1] && `${urls[1].url} | 🖱️ ${urls[1].numberOfVisits}`}</div>
      <div>🥉 {urls[2] && `${urls[2].url} | 🖱️ ${urls[2].numberOfVisits}`}</div> */}
      <h2>{
        urls.length == 0 ?
          "No visited sites yet 🤷‍♂️ or loading data..." :
          (secure.length == urls.length) ?
            `${secure.length} visited ${secure.length == 1 ? "site" : "sites"} secure ✔️`
            : `${(urls.length - secure.length)} visited ${(urls.length - secure.length) == 1 ? "site" : "sites"} not secure 💀`
      }
      </h2>

      <button onClick={() => downloadDataJSON(urls, "visited-sites")}>Download visited sites</button>
      <button onClick={() => downloadHTMLs()}>Download htmls</button>
    </div>
  );
}

export default App;
