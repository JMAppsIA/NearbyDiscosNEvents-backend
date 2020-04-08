// const AWSXRay = require('aws-xray-sdk');
let AWS = require('aws-sdk');

const Logger = require('./LoggerUtils');

const DomainConstants = require('../constants/DomainConstants');
const HttpConstants = require('../constants/HttpConstants');
const BusinessError = require('../../models/BusinessError');
const ErrorConstants = require('../constants/ErrorConstants');

class AwsUtils {
  static async invokeFunctionLambda(
    functionName,
    request
  ) {
    const trace = this.getTraceRequest(request);
    const payload = this.getPayloadRequest(request);

    const lambda = new AWS.Lambda();
    const traceAux = Object.assign({}, trace);
    traceAux.channelCode = DomainConstants.REQUEST_LMB_CONSUMER;
    traceAux.consumerId = functionName;
    let result;
    try {
      result = await lambda.invoke({
        InvocationType: 'RequestResponse',
        FunctionName: functionName,
        Payload: JSON.stringify({
          request: {
            trace: traceAux,
            payload: payload,
          },
        }),
      }).promise();
    } catch (error) {
      Logger.error(error);
      throw new BusinessError({
        code: error.code,
        httpCode: error.statusCode,
        messages: [error.message],
      });
    }

    const responsePayload = JSON.parse(result.Payload);

    if (!responsePayload.response.status.success) {
      const { response: { status: { error } } } = responsePayload;
      throw new BusinessError({
        code: error.code,
        httpCode: error.httpCode,
        messages: error.messages,
      });
    }
    return responsePayload.response.payload;
  }

  static invokeFunctionLambdaPromise(
    functionName,
    request
  ) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.invokeFunctionLambda(functionName, request);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static buildRequest(trace, payload) {
    const request = {
      request: {
        trace: trace,
        payload: payload,
      },
    };

    return request;
  }

  static getRequest(event) {
    let request;
    if (event.body) {
      ({ request } = /*JSON.parse(event.body)*/ event.body);
    } else {
      ({ request } = event);
    }
    return request;
  }

  static getPayloadRequest(event) {
    const request = this.getRequest(event);
    return request.payload;
  }

  static getTraceRequest(event) {
    const request = this.getRequest(event);
    return request.trace;
  }

  static buildResponse(event, payload) {
    const trace = AwsUtils.getTraceRequest(event);
    if (process.env.TRACING === 'true') {
      Logger.info(`${DomainConstants.TRACE_END_MESSAGE} ${trace.traceId}`);
    }

    if (DomainConstants.REQUEST_LMB_CONSUMER !== trace.channelCode.toUpperCase()) {
      delete trace.service;
      delete trace.timestamp;
      delete trace.identity;
      delete trace.logStreamName;
      delete trace.logGroupName;
    }

    const obj = {
      response: {
        //trace: trace,
        payload: payload,
        status: {
          success: true,
        },
      },
    };

    if (DomainConstants.REQUEST_LMB_CONSUMER !== trace.channelCode.toUpperCase()) {
      const response = {
        statusCode: HttpConstants.OK_STATUS.code,
        body: obj/*,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'no-referrer-when-downgrade',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        },*/
      };
      return response;
    }
    return obj;
  }

  static async buildErrorResponse(event, error) {
    const obj = {
      response: {
        trace: null,
        payload: null,
        status: {
          success: false,
          error: error,
        },
      },
    };

    const bodyValid = !(ErrorConstants.REQUEST_BODY_ERROR.code === error.code);
    let isHTTP = false;
    if (bodyValid) {
      const trace = AwsUtils.getTraceRequest(event);
      if (process.env.TRACING === 'true') {
        Logger.info(`${DomainConstants.TRACE_END_MESSAGE} ${trace.traceId}`);
      }

      if (DomainConstants.REQUEST_LMB_CONSUMER !== trace.channelCode.toUpperCase()) {
        delete trace.service;
        delete trace.timestamp;
        delete trace.identity;
        delete trace.logStreamName;
        delete trace.logGroupName;
      }

      obj.response.trace = trace;
      isHTTP = DomainConstants.REQUEST_LMB_CONSUMER !== trace.channelCode.toUpperCase();
    }

    if (isHTTP || !bodyValid) {
      const response = {
        statusCode: error.httpCode,
        body: /* JSON.stringify(obj) */obj /*,
        headers: {
          'Access-Control-Allow-Origin': process.env.ORIGIN || '*',
          'Access-Control-Allow-Credentials': true,
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'no-referrer-when-downgrade',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        },*/
      };
      return response;
    }
    return obj;
  }

  static getResponse(event) {
    let response;
    if (event.body) {
      ({ response } = JSON.parse(event.body));
    } else {
      ({ response } = event);
    }

    if (!response) {
      throw new BusinessError({
        code: ErrorConstants.REQUEST_BODY_ERROR.code,
        httpCode: HttpConstants.BAD_REQUEST_STATUS.code,
        messages: [ErrorConstants.REQUEST_BODY_ERROR.message],
      });
    }
    return response;
  }

  static getPayloadResponse(event) {
    const response = this.getResponse(event);
    return response.payload;
  }

  static getTraceResponse(event) {
    if (event.body) {
      return JSON.parse(event.body).response.trace;
    }
    return event.response.trace;
  }

  static addTrace(event) {
    const trace = AwsUtils.getTraceRequest(event);
    const payload = AwsUtils.getPayloadRequest(event);

    if (DomainConstants.REQUEST_LMB_CONSUMER !== trace.channelCode.toUpperCase()) {
      let user = 'us-east-1_WNBotg1pI:CognitoSignIn:cf1e27ab-6372-4af4-a38b-0fdfdd44ba64';
      if (event && event.requestContext && event.requestContext.identity && event.requestContext.identity.cognitoAuthenticationProvider) {
        const IDP_REGEX = /.*\/.*,.*\/(.*:CognitoSignIn:.*)/;
        const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
        const userIdentifier = authProvider.match(IDP_REGEX);
        user = userIdentifier ? userIdentifier[1] : user;
      }

      trace.traceId = event.headers['X-Amzn-Trace-Id'];
      trace.identity = {
        user: user,
        device: event.headers['User-Agent'],
        host: event.headers['X-Forwarded-For'],
      };
      trace.timestamp = new Date(event.requestContext.requestTimeEpoch);
    }

    trace.service = process.env.AWS_LAMBDA_FUNCTION_NAME;
    trace.logGroupName = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
    trace.logStreamName = process.env.AWS_LAMBDA_LOG_STREAM_NAME;

    const request = AwsUtils.buildRequest(trace, payload);
    if (event.body) {
      event.body = JSON.stringify(request);
    } else {
      // eslint-disable-next-line no-param-reassign
      event = request;
    }
    Logger.info(`${DomainConstants.TRACE_START_MESSAGE} ${trace.traceId}`);
    Logger.info(request);
  }
}

module.exports = AwsUtils;
