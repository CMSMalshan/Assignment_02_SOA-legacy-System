const soap = require('soap');
const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

// 1. gRPC Proto 
const PROTO_PATH = path.join(__dirname, '../proto/hospital.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const hospitalProto = grpc.loadPackageDefinition(packageDefinition).hospital;

// 2. gRPC Client creating
const grpcClient = new hospitalProto.HospitalService('localhost:50051', grpc.credentials.createInsecure());

// 3. SOAP Service (Translation Logic)
const service = {
    HospitalService: {
        HospitalPort: {
            GetPatientRecord: function(args, callback) {
                console.log("[Gateway] Received SOAP request for GetPatientRecord:", args);
                
                // SOAP request -> gRPC request 
                const grpcRequest = { patient_id: args.patient_id };
                
                grpcClient.GetPatientRecord(grpcRequest, (error, response) => {
                    if (error) {
                        console.error("[Gateway] gRPC Error:", error.message);
                        // gRPC errors -> SOAP faults maping
                        callback({
                            Fault: { Code: { Value: "soap:Server" }, Reason: { Text: error.message } }
                        });
                    } else {
                        // gRPC response -> SOAP client 
                        callback(null, response);
                    }
                });
            },
            
            AddMedicalReport: function(args, callback) {
                console.log("[Gateway] Received SOAP request for AddMedicalReport:", args);
                const grpcRequest = { 
                    patient_id: args.patient_id,
                    report_details: args.report_details
                };
                
                grpcClient.AddMedicalReport(grpcRequest, (error, response) => {
                    if (error) {
                        callback({
                            Fault: { Code: { Value: "soap:Server" }, Reason: { Text: error.message } }
                        });
                    } else {
                        callback(null, response);
                    }
                });
            },
            
            CheckDoctorAvailability: function(args, callback) {
                console.log("[Gateway] Received SOAP request for CheckDoctorAvailability:", args);
                const grpcRequest = { doctor_id: args.doctor_id };
                
                grpcClient.CheckDoctorAvailability(grpcRequest, (error, response) => {
                    if (error) {
                        callback({
                            Fault: { Code: { Value: "soap:Server" }, Reason: { Text: error.message } }
                        });
                    } else {
                        callback(null, response);
                    }
                });
            }
        }
    }
};

// 4. starting the Express and SOAP Server from port 8000
const WSDL_PATH = path.join(__dirname, '../wsdl/hospital.wsdl');
const wsdl = fs.readFileSync(WSDL_PATH, 'utf8');
const app = express();

app.listen(8000, function() {
    console.log("Translating Gateway is running on port 8000...");
    soap.listen(app, '/wsdl', service, wsdl, function() {
        console.log("SOAP endpoint initialized at http://localhost:8000/wsdl?wsdl");
    });
});