import Agent from 'agentkeepalive';
import axios from 'axios';
import {
  agentHttpConfig,
  agentHttpsConfig,
  logRequestInterceptor,
  logResponseInterceptor,
} from './http-config.communication';

const httpKeepAliveAgent = new Agent(agentHttpConfig);
const httpsKeepAliveAgent = new Agent.HttpsAgent(agentHttpsConfig);

export const httpClient = axios.create({
  httpAgent: httpKeepAliveAgent,
  httpsAgent: httpsKeepAliveAgent,
});

httpClient.interceptors.request.use(logRequestInterceptor);
httpClient.interceptors.response.use(logResponseInterceptor);
