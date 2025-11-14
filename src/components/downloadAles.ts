import { PubDetails } from "../App";

export const downloadAles = (id: string, setAles: any) => {
  console.log(id)
  return fetch("https://ca.jdw-apps.net/api/v0.1/jdw/venues/" + id + "/ales", {
    headers: { Authorization: 'Bearer SFS9MMnn5deflq0BMcUTSijwSMBB4mc7NSG2rOhqb2765466' }
  })
    .then(response => response.json())
    .then((data) => {
      // console.log('Update successful')
      setAles(data.data);
    }).catch(() => {
      console.log('failed to fetch, attempting to login into spoons wifi')
      console.log('fetching /')
      fetch("http://spoons.alexparaskos.com", { method: "GET", cache: "no-store" })
        .then((response) => response.text())
        .then((data) => {
          console.log('1')
          console.log(data);
          if (data.includes("window.location")) {
            console.log('redirected to router')
          }
          const reDir = 'http://detectportal.firefox.com/success.txt'
          const secret = data.match(`fgtauth([^"]*)`)![1].slice(1)
          console.log('secret: ' + secret)
          const routerUrl = 'http://192.168.128.1:1000/fgtauth' + secret
          let body = '4Tredir=' + encodeURIComponent(reDir)
          body = body + '&' + 'magic=' + secret
          body = body + '&' + 'answer=1'
          console.log('fetching ' + routerUrl)
          console.log('body": ' + body)
          // fetch(routerUrl).then(() => {
          console.log('POSTING to: ' + routerUrl)
          navigator.sendBeacon(routerUrl, body)
        }).catch(() => console.log('failed post'))
    }).catch((e) => {
      console.log('Unable to log in to wifi;', e)
    })
}