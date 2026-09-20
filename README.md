# SOAP to gRPC Translating Gateway

**Institution:** General Sir John Kotelawala Defence University

**Department:** Department of Computer Science

**Intake:** 41

**Authors:** CMS Malshan (D-BCS-24-0022), NMSGHN Nawarathna (D-BCS-24-0032)

## Overview
This project implements a translating middleware gateway that enables a legacy SOAP client to seamlessly communicate with a high-performance Python gRPC backend service.

## Prerequisites
* Docker and Docker Compose
* Node.js (v18+)
* Python 3.9+

## Setup & Execution

### 1. Using Docker (Recommended)
Run the entire system using a single command:
```bash
docker-compose up --build
The gRPC Server will start on port 50051.

The Translating Gateway will expose the WSDL endpoint at http://localhost:8000/wsdl?wsdl.


2. Manual Local Execution
If you prefer to run the services independently without Docker:

Terminal 1 (gRPC Server):
Bash
cd grpc_server
pip install grpcio grpcio-tools
python server.py

Terminal 2 (SOAP Gateway):
Bash
cd soap_gateway
npm install
node gateway.j

Terminal 3 (SOAP Client):
Bash
cd soap_gateway
node client.js

Sample Test Requests
You can test the endpoints using Postman or SoapUI without the client script. Send a POST request to http://localhost:8000/wsdl with the following XML payload:
XML
<soapenv:Envelope xmlns:soapenv="[http://schemas.xmlsoap.org/soap/envelope/](http://schemas.xmlsoap.org/soap/envelope/)" xmlns:hos="http://localhost:8000/wsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <hos:GetPatientRecord>
         <patient_id>P001</patient_id>
      </hos:GetPatientRecord>
   </soapenv:Body>
</soapenv:Envelope>
