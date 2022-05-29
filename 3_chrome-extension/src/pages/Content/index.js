import { DOMtoString } from './modules/DOMtoString';
import './content.styles.css'

chrome.runtime.sendMessage({ data: 'predict', protocol: window.location.protocol, hostname: window.location.hostname });
const html = DOMtoString(document);
chrome.runtime.sendMessage({ data: 'html', html: html });