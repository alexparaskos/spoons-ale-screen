import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import './HomePub.css';
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import defaultAles from "../defaultAles.json";
import permAles from "../permAles.json";
import ciders from "../ciders.json";
import AleItem from './AleItem';
import AutoScroll from './AutoScroll';
import CiderItem from './CiderItem';
import { ConfigContext } from '../App';
interface ContainerProps {
}

function useInterval(callback: unknown, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    //@ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const HomePub: React.FC<ContainerProps> = ({ }) => {
  const {
    config,
    setConfig
  } = useContext(ConfigContext);
  let [ales, setAles] = useState(defaultAles)
  const activeAles = ales.filter((ale) => !ale.is_cellared)
  let cellaredAles = ales.filter((ale) => ale.is_cellared)
  const onPermAles = permAles.filter((ale) => config.permAles.includes(ale.product))

  const contentRef = useRef<HTMLIonContentElement>(null);
  let [position, setPosition] = useState(0)

  const transition = () => {
    if (contentRef.current) {
      if (position == 0) {
        contentRef.current?.scrollToBottom(5000)
        setPosition(1)
      } else {
        contentRef.current?.scrollToTop(5000)
        setPosition(0)
      }
    }
  }
  const testRouterPage = `<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8; IE=EDGE">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <style type="text/css">
        body {
            height: 100%;
            font-family: Roboto, Helvetica, Arial, sans-serif;
            color: #6a6a6a;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
 
        input[type=date],
        input[type=email],
        input[type=number],
        input[type=password],
        input[type=search],
        input[type=tel],
        input[type=text],
        input[type=time],
        input[type=url],
        select,
        textarea {
            color: #262626;
            vertical-align: baseline;
            margin: .2em;
            border-style: solid;
            border-width: 1px;
            border-color: #a9a9a9;
            background-color: #fff;
            box-sizing: border-box;
            padding: 2px .5em;
            appearance: none;
            border-radius: 0;
        }
 
        input:focus {
            border-color: #646464;
            box-shadow: 0 0 1px 0 #a2a2a2;
            outline: 0;
        }
 
        button {
            padding: .5em 1em;
            border: 1px solid;
            border-radius: 3px;
            min-width: 6em;
            font-weight: 400;
            font-size: .8em;
            cursor: pointer;
        }
 
        button.primary {
            color: #fff;
            background-color: rgb(47, 113, 178);
            border-color: rgb(34, 103, 173);
        }
 
        .message-container {
            height: 500px;
            width: 600px;
            padding: 0;
            margin: 10px;
        }
 
        .logo {
            background: url(/XX/YY/ZZ/CI/HHFGEHIGFGCHDHAHPGPGOG) no-repeat center;
            height: 50px;
            object-fit: contain;
        }
 
        .logo2 {
            background: url(/XX/YY/ZZ/CI/KGEGHHPFBGAHAHPFMGPGHGPG) no-repeat center;
            height: 267px;
            object-fit: contain;
        }
 
        table {
            background-color: #fff;
            border-spacing: 0;
            margin: 1em;
        }
 
        table>tbody>tr>td:first-of-type:not([colspan]) {
            white-space: nowrap;
            color: rgba(0, 0, 0, .5);
        }
 
        table>tbody>tr>td:first-of-type {
            vertical-align: top;
        }
 
        table>tbody>tr>td {
            padding: .3em .3em;
        }
 
        .field {
            display: table-row;
        }
 
        .field> :first-child {
            display: table-cell;
            width: 20%;
        }
 
        .field.single> :first-child {
            display: inline;
        }
 
        .field> :not(:first-child) {
            width: auto;
            max-width: 100%;
            display: inline-flex;
            align-items: baseline;
            virtical-align: top;
            box-sizing: border-box;
            margin: .3em;
        }
 
        .field> :not(:first-child)>input {
            width: 230px;
        }
 
        .form-footer {
            display: inline-flex;
            justify-content: flex-start;
        }
 
        .form-footer>* {
            margin: 1em;
        }
 
        .text-scrollable {
            overflow: auto;
            height: 210px;
            border: 1px solid rgb(100, 100, 200);
            padding: 5px;
            font-size: 1em;
        }
 
        .text-centered {
            text-align: center;
        }
 
        .text-container {
            margin: 1em 1.5em;
        }
 
        .flex-container {
            display: flex;
        }
 
        .flex-container.column {
            flex-direction: column;
        }
    </style>
    <title> Firewall Disclaimer </title>
</head>
 
<body>
    <div class="message-container">
        <div class="logo"> </div>
        <div class="logo2"> </div>
        <form action="/" method="post"> <input type="hidden" name="4Tredir" value="http://spoons.alexparaskos.com"> <input type="hidden" name="magic" value="06061e490f0546d0"> <input type="hidden" name="answer" value="0">
            <p class="text-scrollable text-container"> Terms of Use: <br> By accepting this agreement and accessing the wireless network, you acknowledge that you are of legal age, you have read and understood, and agree to be bound by this agreement. <br> (*) The wireless network service is provided by the property owners and is completely at their discretion. Your access to the network may be blocked, suspended, or terminated at any time for any reason. <br> (*) You agree not to use the wireless network for any purpose that is unlawful or otherwise prohibited and you are fully responsible for your use. <br> (*) The wireless network is provided "as is" without warranties of any kind, either expressed or implied. </h3>
            </p>
            <div class="form-footer"> <button class="primary" type="button" onclick="sb('1')"> Yes, I agree </button> <button type="button" onclick="sb('0')"> No, I decline </button> </div>
        </form>
        <script>
            function sb(val) {
                document.forms[0].answer.value = val;
                document.forms[0].submit();
            }
        </script>
    </div>
</body>
 
</html>`
  const downloadAles = () => {
    console.log('Updating Ales')
    return fetch("https://oandp-appmgr-prod.s3.eu-west-2.amazonaws.com/pubs/" + config.homePub + "/ales.json")
      .then(response => response.json())
      .then((data) => {
        console.log('Update successful')
        setAles(data);
      }).catch(() => {
        console.log('failed to fetch, attempting to login into spoons wifi')
        console.log('fetching /')
        fetch("http://spoons.alexparaskos.com", { method: "GET",cache:"no-store" })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            if (data.includes("window.location")) {
              console.log('redirected to router')
            }
            const reDir = 'http://detectportal.firefox.com/success.txt'
            const secret = data.match(`fgtauth?([^"]*)`)![1]
            console.log('secret: ' + secret)
            const routerUrl = 'http://192.168.128.1:1000/fgtauth?' + secret
            let body = encodeURI('4Tredir=' + reDir)
            body = body + '&' + 'magic' + encodeURI(secret)
            body = body + '&' + 'answer=1'
            console.log('fetching ' + routerUrl)
            console.log('body": ' + body)
            fetch(routerUrl).then(() => {
              console.log('POSTING to: ' + routerUrl)
              fetch(routerUrl, {
                method: 'POST',
                body: body,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log(data)
                  if (data.includes('success')) {
                    console.log('success bypass')
                    // alert('Success!')
                  }
                })
            }).catch(() => console.log('failed GET to: ' + routerUrl))
            // }
          }).catch((err) => {console.log('Fetch to / failed')})
        // .then((data) => {
        //   console.log(data)
        // })
      }).catch(() => {
        console.log('Unable to log in to wifi')
      })
  }
  useEffect(() => {
    downloadAles()
  }, [])
  useInterval(downloadAles, 300000 / 5)
  useInterval(transition, 10000)

  return (
    <IonContent ref={contentRef}>
      <IonGrid className='ion-no-padding full-height'>
        <IonList lines="inset" class="list-md-lines-full list-lines-full">
          <IonRow>
            <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
              <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>Real ales on sale now</IonText>
            </IonItemDivider>
            <IonCol size='6'>
              {onPermAles.concat(activeAles).map((i, j) => {
                return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
            <IonCol size='6'>
              {onPermAles.concat(activeAles).map((i, j) => {
                return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
          </IonRow>
          {cellaredAles ? <><IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
          </IonItemDivider>
            <IonRow>
              <IonCol size='6'>
                {cellaredAles.map((i, j) => {
                  return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
              </IonCol>
              <IonCol size='6'>
                {cellaredAles.map((i, j) => {
                  return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
                })}
              </IonCol>
            </IonRow></>
            : <></>
          }

          {/* <IonItemDivider color="light-grey" sticky={true} className='ion-color ion-color-light-grey item md item-lines-full'>
            <IonText color="grey" className='text-lg text-bold ion-color ion-color-grey md'>In the cellar</IonText>
          </IonItemDivider>
          <IonRow>
            <IonCol size='6'>
              {cellaredAles.map((i, j) => {
                return !(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
            <IonCol size='6'>
              {cellaredAles.map((i, j) => {
                return !!(j % 2) ? <AleItem ale={i} key={j} /> : <></>
              })}
            </IonCol>
          </IonRow> */}
        </IonList>
      </IonGrid>
    </IonContent>

  );
};

export default HomePub;
